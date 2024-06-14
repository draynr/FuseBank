"use server";

import { redirect } from "next/navigation";
import {
  createAdminClient,
  createSessionClient,
} from "../server/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { json } from "stream/consumers";
import { Database } from "lucide-react";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../server/plaid";
import { revalidatePath } from "next/cache";

export const login = async ({
  email,
  password,
}: LoginParameters) => {
  try {
    //
    const { account } =
      await createAdminClient();
    const response =
      await account.createEmailPasswordSession(
        email,
        password
      );
    // console.log("123");
    return JSON.parse(JSON.stringify(response));
  } catch (e) {
    console.log(e);
  }
};
export const register = async (
  data: RegisterParameters
) => {
  try {
    const { account } =
      await createAdminClient();
    const newUser = await account.create(
      ID.unique(),
      data.email,
      data.password,
      `${data.firstName} ${data.lastName}`
    );
    const sesh =
      await account.createEmailPasswordSession(
        data.email,
        data.password
      );
    cookies().set(
      "appwrite-session",
      sesh.secret,
      {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      }
    );
    return JSON.parse(JSON.stringify(newUser));
  } catch (e) {
    console.log(e);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } =
      await createSessionClient();
    const response = await account.get();
    const user = await getUserInfo({
      userId: response.$id,
    });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
}

export const logout = async () => {
  try {
    const { account } =
      await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const getUserInfo = async ({
  userId,
}: getUserInfoProps) => {
  try {
    // const {db} = await createAdminClient();
    // const user = await Database.
  } catch (e) {
    return null;
  }
};

export const createLinkToken = async (
  user: User
) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      language: "en",
      country_codes: ["US"] as CountryCode[],
      client_name: user.name,
      products: ["auth"] as Products[],
    };
    const response =
      await plaidClient.linkTokenCreate(
        tokenParams
      );
    return JSON.parse(
      JSON.stringify(response.data.link_token)
    );
  } catch (e) {
    console.log(e);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: ExchangeProps) => {
  //handshake to get permanent token
  try {
    const response =
      await plaidClient.itemPublicTokenExchange(
        { public_token: publicToken }
      );
    const access_token =
      response.data.access_token;
    const item_id = response.data.item_id;
    const acc_response =
      await plaidClient.accountsGet({
        access_token: access_token,
      });

    const data = acc_response.data.accounts[0];
    const req: ProcessorTokenCreateRequest = {
      access_token: access_token,
      account_id: data.account_id,
      processor:
        "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };
    const token_response =
      await plaidClient.processorTokenCreate(
        req
      );
    const processor_token =
      token_response.data.processor_token;
    const funding_source =
      await addFundingSource({
        dwollaCustomerId:
          user.dwolla_customer_id,
        processor_token,
        bank_name: data.name,
      });
    if (!funding_source) throw Error;
    await createBankAccount({
      user_id: user.$id,
      bank_id: item_id,
      account_id: data.account_id,
      access_token: access_token,
      funding_source: funding_source,
      invite_id: encrypt(data.account_id),
    });
    revalidatePath("/");
    return "success";
  } catch (e) {
    console.log(e);
  }
};

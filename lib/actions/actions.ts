"use server";

import { redirect } from "next/navigation";
import {
  createAdminClient,
  createSessionClient,
} from "../server/appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { json } from "stream/consumers";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../server/plaid";
import { revalidatePath } from "next/cache";
import {
  addFundingSource,
  createDwollaCustomer,
} from "./dwolla_actions";
import {
  encrypt,
  extractCustomerIdFromUrl,
} from "../utils";
import { Database } from "lucide-react";
import { consoleIntegration } from "@sentry/nextjs";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID:
    USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID:
    BANK_COLLECTION_ID,
} = process.env;

export const createBankAccount = async ({
  user_id,
  bank_id,
  account_id,
  access_token,
  funding_source,
  invite_id,
}: createBankAccountProps) => {
  try {
    const { database } =
      await createAdminClient();
    const bankAccount =
      await database.createDocument(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        ID.unique(),
        {
          user_id,
          bank_id,
          account_id,
          access_token,
          funding_source,
          invite_id,
        }
      );
    return JSON.parse(
      JSON.stringify(bankAccount)
    );
  } catch (e) {}
};

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
export const register = async ({
  password,
  ...data
}: RegisterParameters) => {
  let newUser;
  try {
    const { account, database } =
      await createAdminClient();
    newUser = await account.create(
      ID.unique(),
      data.email,
      password,
      `${data.firstName} ${data.lastName}`
    );
    if (!newUser)
      throw new Error("Error creating user.");
    const args: NewDwollaCustomerParams = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      type: "personal",
      address1: data.primaryAddress,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      dateOfBirth: data.dateOfBirth,
      ssn: data.ssn,
    };
    // console.log(args);
    const dwollaCustomerUrl =
      await createDwollaCustomer(args);
    if (!dwollaCustomerUrl) {
      throw new Error(
        "Error creating dwolla customer."
      );
    }
    const dwollaCustomerId =
      extractCustomerIdFromUrl(
        dwollaCustomerUrl
      );
    const userStruct =
      await database.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        {
          ...data,
          userId: newUser.$id,
          dwollaCustomerUrl: dwollaCustomerUrl,
          dwollaCustomerId: dwollaCustomerId,
        }
      );
    const sesh =
      await account.createEmailPasswordSession(
        data.email,
        password
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
    return JSON.parse(
      JSON.stringify(userStruct)
    );
  } catch (e) {
    console.log(e);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } =
      await createSessionClient();
    console.log("hello");
    debugger;
    console.log("hello");
    const response = await account.get();
    const user = await getUserInfo({
      userId: response.$id,
    });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("wtf");
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
    const { database } =
      await createAdminClient();
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
    return JSON.parse(
      JSON.stringify(user.documents[0])
    );
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
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response =
      await plaidClient.linkTokenCreate(
        tokenParams
      );

    return JSON.parse(
      JSON.stringify({
        linkToken: response.data.link_token,
      })
    );
  } catch (error) {
    console.log(error);
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
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken: processor_token,
        bankName: data.name,
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

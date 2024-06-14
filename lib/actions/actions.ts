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

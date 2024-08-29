"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession, type SessionData, sessionOptions } from "./lib";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

let username = "john";
let isPro = true;
let isBlocked = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // check the user in db
  session.isBlocked = isBlocked;
  session.isPro = isPro;

  return session;
};
export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // check user in db
  if (formUsername !== username) {
    return {
      // 更新prevState
      error: "Wrong Credentials",
    };
  }

  session.userId = "1";
  session.username = username;
  session.isPro = isPro;
  session.isLoggedIn = true;

  await session.save();

  redirect("/");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export const changePremium = async () => {
  const session = await getSession();
  session.isPro = !session.isPro;
  isPro = session.isPro;
  await session.save();

  revalidatePath("/profile");
};

export const changeUsername = async (formData: FormData) => {
  const newUsername = formData.get("username") as string;

  const session = await getSession();
  username = newUsername;
  session.username = newUsername;
  await session.save();

  revalidatePath("/profile");
};

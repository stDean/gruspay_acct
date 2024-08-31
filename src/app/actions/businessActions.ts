"use server";

import { cookies } from "next/headers";

export const storeBusiness = async ({ email }: { email: string }) => {
  const cookieStore = cookies();
  cookieStore.set("email", JSON.stringify({ email }));
};

export const getBusiness = () => {
  const cookieStore = cookies();
  if (cookieStore.has("email")) {
    return JSON.parse(cookieStore.get("email")?.value!);
  }

  return false;
};

export const deleteBusiness = () => {
  const cookieStore = cookies();
  cookieStore.delete("email");
};

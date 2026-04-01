import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthenticatedAccountUser } from "@/server/account/auth";

export const metadata: Metadata = {
  title: "Бонусы | UNOUN",
  description:
    "Бонусы UNOUN доступны в личном кабинете после входа в аккаунт.",
};

export default async function LoyaltyPage() {
  const user = await getAuthenticatedAccountUser();

  redirect(user ? "/account/loyalty" : "/account/auth");
}

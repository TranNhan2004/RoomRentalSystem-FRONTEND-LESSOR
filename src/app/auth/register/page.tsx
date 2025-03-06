import { Register } from "@/components/main/auth/Register";
import { checkLoginStatusForNotAuthPage } from "@/lib/server/checkLoginStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register a new account in the application.",
};

export default async function RegisterPage() {
  await checkLoginStatusForNotAuthPage();

  return (
    <>
      <Register />
    </>
  );
}
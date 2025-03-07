import { ActivateAccount } from "@/components/main/auth/ActivateAccount";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Activate your account",
  description: "Activate your account page",
};
                                  
export default async function ActivateAccountPage({
  params,
}: {
  params: Promise<{
    uidb64: string,
    token: string,
  }>
}) {

  const { uidb64, token } = await params;

  return (
    <>
      <ActivateAccount uidb64={uidb64} token={token} />
    </>
  );
};
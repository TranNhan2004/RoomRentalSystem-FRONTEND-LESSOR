import { checkLoginStatusForAuthPage } from "@/lib/server/checkLoginStatus";


export default async function HasAuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkLoginStatusForAuthPage();
  return (
    <>
      {children}
    </>
  );
}
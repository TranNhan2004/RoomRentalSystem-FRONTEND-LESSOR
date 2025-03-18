import { ChargesAdd } from "@/components/main/rental-room/charges/ChargesAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new charges",
  description: "Add a new charges page.",
};

                                  
export default async function ChargesAddPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>
}) {
  const { roomId } = await params;

  return (
    <>
      <ChargesAdd roomId={roomId} />
    </>
  );
};
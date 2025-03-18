import { ChargesDetails } from "@/components/main/rental-room/charges/ChargesDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the charges",
  description: "Details of the charges page.",
};
                                  
export default async function ChargesDetailsPage({
  params,
}: {
  params: Promise<{
    roomId: string;
    chargesId: string;
  }>
}) {

  const { roomId, chargesId } = await params;

  return (
    <>
      <ChargesDetails roomId={roomId} id={chargesId} />
    </>
  );
};
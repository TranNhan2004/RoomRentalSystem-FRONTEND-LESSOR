import { ChargesListDetails } from "@/components/main/rental-room/charges-list/ChargesListDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the charges list",
  description: "Details of the charges list page.",
};
                                  
export default async function ChargesListDetailsPage({
  params,
}: {
  params: Promise<{
    roomId: string;
    chargesListId: string;
  }>
}) {

  const { roomId, chargesListId } = await params;

  return (
    <>
      <ChargesListDetails roomId={roomId} id={chargesListId} />
    </>
  );
};
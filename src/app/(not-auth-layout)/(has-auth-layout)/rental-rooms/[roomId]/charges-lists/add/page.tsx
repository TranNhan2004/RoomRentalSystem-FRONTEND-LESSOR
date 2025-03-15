import { ChargesListAdd } from "@/components/main/rental-room/charges-list/ChargesListAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new charges list",
  description: "Add a new charges list page.",
};

                                  
export default async function ChargesListAddPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>
}) {
  const { roomId } = await params;

  return (
    <>
      <ChargesListAdd roomId={roomId} />
    </>
  );
};
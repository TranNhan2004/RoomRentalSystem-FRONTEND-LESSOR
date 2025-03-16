import { RoomCodeAdd } from "@/components/main/rental-room/room-code/RoomCodeAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new room code",
  description: "Add a new room code page.",
};
      
export default async function RoomCodeAddPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>
}) {

  const { roomId } = await params;

  return (
    <>
      <RoomCodeAdd roomId={roomId} />
    </>
  );
};
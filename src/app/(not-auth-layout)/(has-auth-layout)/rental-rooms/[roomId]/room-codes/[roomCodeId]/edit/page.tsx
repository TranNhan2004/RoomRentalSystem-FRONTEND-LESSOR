import { RoomCodeEdit } from "@/components/main/rental-room/room-code/RoomCodeEdit";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Edit the room code",
  description: "Edit the room code page.",
};
                                  
export default async function RoomCodeEditPage({
  params,
}: {
  params: Promise<{
    roomId: string;
    roomCodeId: string;
  }>
}) {
  const { roomId, roomCodeId } = await params;

  return (
    <>
      <RoomCodeEdit roomId={roomId} id={roomCodeId} />
    </>
  );
};
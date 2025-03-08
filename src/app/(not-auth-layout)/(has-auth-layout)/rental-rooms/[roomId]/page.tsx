import { RentalRoomDetails } from "@/components/main/rental-room/RentalRoomDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the room",
  description: "Details of the room page.",
};
                                  
export default async function RentalRoomDetailsPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>
}) {
  const { roomId } = await params;

  return (
    <>
      <RentalRoomDetails id={roomId} />
    </>
  );
};
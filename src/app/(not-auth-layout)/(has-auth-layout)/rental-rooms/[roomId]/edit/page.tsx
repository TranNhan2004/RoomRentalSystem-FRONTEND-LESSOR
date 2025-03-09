import { RentalRoomEdit } from "@/components/main/rental-room/RentalRoomEdit";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Edit the rental room",
  description: "Edit the rental room page.",
};
                                  
export default async function RentalRoomEditPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>
}) {

  const { roomId } = await params;

  return (
    <>
      <RentalRoomEdit id={roomId} />
    </>
  );
};
import { MonthlyRoomInvoiceAdd } from "@/components/main/rental-room/monthly-room-invoice/MonthlyRoomInvoiceAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a monthly room invoice",
  description: "Add a monthly room invoice page.",
};
                                  
export default async function MonthlyRoomInvoiceAddPage({
  params
}: {
  params: Promise<{
    roomId: string;
    roomCodeId: string;
  }>;
}) {
  const { roomId, roomCodeId } = await params;

  return (
    <>
      <MonthlyRoomInvoiceAdd roomId={roomId} roomCodeId={roomCodeId} />
    </>
  );
};
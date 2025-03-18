import { MonthlyRoomInvoiceEdit } from "@/components/main/rental-room/monthly-room-invoice/MonthlyRoomInvoiceEdit";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Edit the monthly room invoice",
  description: "Edit of the monthly room invoice page.",
};
                                  
export default async function MonthlyRoomInvoiceEditPage({
  params
}: {
  params: Promise<{
    roomId: string;
    roomCodeId: string;
    monthlyRoomInvoiceId: string;
  }>;
}) {
  const { roomId, roomCodeId, monthlyRoomInvoiceId} = await params;

  return (
    <>
      <MonthlyRoomInvoiceEdit roomId={roomId} roomCodeId={roomCodeId} id={monthlyRoomInvoiceId} />
    </>
  );
};
import { MonthlyRoomInvoiceDetails } from "@/components/main/rental-room/monthly-room-invoice/MonthlyRoomInvoiceDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the monthly room invoice",
  description: "Details of the monthly room invoice page.",
};
                                  
export default async function MonthlyRoomInvoiceDetailsPage({
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
      <MonthlyRoomInvoiceDetails roomId={roomId} roomCodeId={roomCodeId} id={monthlyRoomInvoiceId} />
    </>
  );
};
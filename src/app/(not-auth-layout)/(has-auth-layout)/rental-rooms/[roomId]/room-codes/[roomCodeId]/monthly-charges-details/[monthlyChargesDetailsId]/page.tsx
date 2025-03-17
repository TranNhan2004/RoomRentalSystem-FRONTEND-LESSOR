import { MonthlyChargesDetailsDetails } from "@/components/main/rental-room/monthly-charges-details/MonthlyChargesDetailsDetails";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the monthly charges",
  description: "Details of the monthly charges page.",
};
                                  
export default async function MonthlyChargesDetailsDetailsPage({
  params
}: {
  params: Promise<{
    roomId: string;
    roomCodeId: string;
    monthlyChargesDetailsId: string;
  }>;
}) {
  const { roomId, roomCodeId, monthlyChargesDetailsId} = await params;

  return (
    <>
      <MonthlyChargesDetailsDetails roomId={roomId} roomCodeId={roomCodeId} id={monthlyChargesDetailsId} />
    </>
  );
};
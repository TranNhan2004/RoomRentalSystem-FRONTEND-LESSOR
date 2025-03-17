import { MonthlyChargesDetailsEdit } from "@/components/main/rental-room/monthly-charges-details/MonthlyChargesDetailsEdit";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Edit the monthly charges",
  description: "Edit of the monthly charges page.",
};
                                  
export default async function MonthlyChargesDetailsEditPage({
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
      <MonthlyChargesDetailsEdit roomId={roomId} roomCodeId={roomCodeId} id={monthlyChargesDetailsId} />
    </>
  );
};
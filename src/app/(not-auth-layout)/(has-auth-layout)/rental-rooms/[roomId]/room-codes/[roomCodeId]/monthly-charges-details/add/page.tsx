import { MonthlyChargesDetailsAdd } from "@/components/main/rental-room/monthly-charges-details/MonthlyChargesDetailsAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a monthly charges",
  description: "Add a monthly charges page.",
};
                                  
export default async function MonthlyChargesDetailsAddPage({
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
      <MonthlyChargesDetailsAdd roomId={roomId} roomCodeId={roomCodeId} />
    </>
  );
};
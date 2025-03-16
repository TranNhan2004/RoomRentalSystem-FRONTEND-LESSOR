import { MonitoringRentalAdd } from "@/components/main/rental-room/monitoring-rental/MonitoringRentalAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new monitoring rental",
  description: "Add a new monitoring rental page.",
};
                                  
export default async function MonitoringRentalAddPage({
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
      <MonitoringRentalAdd roomId={roomId} roomCodeId={roomCodeId} />
    </>
  );
};
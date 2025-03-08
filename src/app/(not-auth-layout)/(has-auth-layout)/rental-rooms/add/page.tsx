import { RentalRoomAdd } from "@/components/main/rental-room/RentalRoomAdd";
import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Add a new rental room",
  description: "Add a new rental room page.",
};
                                  
export default function RentalRoomAddPage() {
  return (
    <>
      <RentalRoomAdd />
    </>
  );
};
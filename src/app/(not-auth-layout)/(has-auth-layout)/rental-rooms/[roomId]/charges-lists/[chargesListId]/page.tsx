import { Metadata } from "next";
                                  
export const metadata: Metadata = {
  title: "Details of the charges list",
  description: "Details of the charges list page.",
};
                                  
export default function ChargesListDetailsPage({
  params,
}: {
  params: Promise<{
    roomId: string;
    chargesListId: string;
  }>
}) {


  return (
    <>
      
    </>
  );
};
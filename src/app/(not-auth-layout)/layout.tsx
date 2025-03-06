import { Navbar } from "@/components/main/Navbar";
import { Footer } from "@/components/main/Footer";


export default async function NotAuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="ml-[2%] mt-[5%] mr-[2%] p-8 text-[14px]">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
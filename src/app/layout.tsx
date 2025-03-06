import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Aleo } from "next/font/google"; 
import "./globals.css";
import "sweetalert2/src/sweetalert2.scss";

const aleo = Aleo({
  variable: "--font-aleo", 
  subsets: ["vietnamese"], 
});

export const metadata: Metadata = {
  title: {
    default: "Lessor",
    template: "Lessor | %s",
  },
  description: "Rental room finding system in Can Tho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${aleo.variable} antialiased`}>
        {children}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </body>
    </html>
  );
}
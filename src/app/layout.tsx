import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Modern Lifestyle Online Store | GANHOM Official Luxury",
  description:
    "ร้านค้าออนไลน์สินค้าพรีเมียม สไตล์ Modern Lifestyle พร้อมคอลเลกชันกระเป๋า นาฬิกา น้ำหอม และสมาร์ทโฮมระดับลักชัวรี",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-white text-slate-850 antialiased font-sans">
        <Navbar />
        <main className="w-full min-h-[calc(100vh-210px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

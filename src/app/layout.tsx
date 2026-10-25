import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-thai",
});

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
    <html lang="th" className={`${inter.variable} ${notoSansThai.variable}`}>
      <body className="min-h-screen bg-white text-slate-850 antialiased">
        <Navbar />
        <main className="w-full min-h-[calc(100vh-210px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


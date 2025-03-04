import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한국어교육센터 - 영진전문대",
  description: "한국어교육센터는 외국인 대상 한국어 교육 전문 기관으로, 대한민국 교육부로부터 국제화역량 인증대학으로 선정되었습니다. 한국어교육센터터 정규과정을 운영 중입니다.",
  icons:{
    icon:"/images/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
    {children} 
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP, Golos_Text } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cookies } from "next/headers";
import { Language } from "./common/types";

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
  description:
    "한국어교육센터는 외국인 대상 한국어 교육 전문 기관으로, 대한민국 교육부로부터 국제화역량 인증대학으로 선정되었습니다. 한국어교육센터터 정규과정을 운영 중입니다.",
  icons: {
    icon: "/images/logo.svg",
  },
  openGraph: {
    url: "https://kcenter.yju.ac.kr",
    type: "website",
    title: "한국어교육센터 - 영진전문대",
    description:
      "한국어교육센터는 외국인 대상 한국어 교육 전문 기관으로, 대한민국 교육부로부터 국제화역량 인증대학으로 선정되었습니다. 한국어교육센터터 정규과정을 운영 중입니다.",
    images: [
      {
        url: "https://kcenter.yju.ac.kr/images/yeungjinLogoOpenGraph.png",
        width: "1200",
        height: "630",
      },
    ],
  },
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const golosText = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const language =
      ((await cookies()).get("language")?.value as Language) || Language.korean;

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="UBZqAVSxRMQx-RNTswQfq-ltiQ-8EjrzkNLyld0_SP8"
        />
      </head>
      <body className={`${language==="japanese"? notoSansJP.className : golosText.className}`}>{children}</body>
      <GoogleAnalytics gaId="G-QQMJV8S2V0" />
    </html>
  );
}

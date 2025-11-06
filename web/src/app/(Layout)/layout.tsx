import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  guidanceMenu,
  menu,
  smallMenu,
  boardMenu,
  selectMenu,
  homePage,
  HomePageTitle,
  TermsOfService,
} from "../menu";
import { cookies } from "next/headers";
import { Language } from "../common/types";
import HamburgerMenuCompo from "./components/HamburgerMenuCompo";
import ManagementCookieCompo from "./components/ManagementCookieCompo";
import Image from "next/image";

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
    "한국어교육센터는 외국인 대상 한국어 교육 전문 기관으로, 대한민국 교육부로부터 국제화역량 인증대학으로 선정되었습니다. 한국어교육센터 정규과정을 운영 중입니다.",
  icons: {
    icon: "/images/logo.svg",
  },
  openGraph: {
    url: "https://kcenter.yju.ac.kr",
    type: "website",
    images: [
      {
        url: "https://kcenter.yju.ac.kr/images/yeungjinLogoOpenGraph.png",
        width: "1200",
        height: "630"
      }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language =
    ((await cookies()).get("language")?.value as Language) || Language.korean;
  return (
    <div className=" w-full flex flex-col">
      <header className="w-full min-h-15 bg-[#095a93] flex justify-center xl:justify-between gap-3 font-bold items-center p-4">
        <Link
          href={"/"}
          className="flex justify-center items-center pl-4 sm:pl-0"
        >
          <Image
            alt="영진전문대 로고"
            src="/images/yeungjinLogoOpenGraph.png"
            width={40}
            height={40}
          />
          <div className="flex items-end">
            <h2 className="font-bold text-white w-full whitespace-nowrap text-2xl ml-2">
              {HomePageTitle[language].yeungjin}
            </h2>
            <h6 className="font-bold text-white w-full whitespace-nowrap text-sm ml-2">
              {HomePageTitle[language].koreanEducationCenter}
            </h6>
          </div>
        </Link>
        <div className="hidden xl:flex xl:justify-evenly xl:items-center">
          <ManagementCookieCompo />
        </div>
      </header>

      <section className="relative z-52 w-full min-h-12 bg-[#143c64] bg-opacity-[88%] 
      flex xl:items-center peer xl:justify-between justify-between items-center">

        <div className="hidden xl:w-full xl:h-full xl:flex xl:justify-center xl:text-white xl:font-bold xl:items-center xl:relative">
          <div className="w-32 flex justify-center cursor-pointer">
            {menu[language]?.introduce}
          </div>
          <div className="w-32 flex justify-center cursor-pointer">
            {menu[language]?.curriculum}
          </div>
          <div className="w-32 flex justify-center cursor-pointer">
            {menu[language]?.application}
          </div>
          <div className="w-32 flex justify-center cursor-pointer">
            {menu[language]?.schoolLife}
          </div>
          <div className="w-32 flex justify-center cursor-pointer">
            {menu[language]?.notification}
          </div>
        </div>
        <HamburgerMenuCompo />
      </section>
      <section
        className="hidden xl:hidden xl:peer-hover:block xl:hover:block xl:w-full xl:min-h-52 xl:bg-[#143c64] xl:bg-opacity-[88%] xl:absolute xl:z-40"
        style={{ top: "120px" }}
      >
        <div className="min-h-52 flex flex-row w-full border-t-2 border-[#728aa2] border-opacity-[50%]">
          <div className="w-full h-[100%] flex justify-center">
            <div className="w-32 h-52 flex flex-col items-center">
              <Link
                href={`/guidance/introduction`}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.centerIntro}
              </Link>
              <Link
                href={"/guidance/directions"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.howToGetHere}
              </Link>
              <Link
                href={"/staff/staff-intro"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.["staff-intro"]}
              </Link>
            </div>
            <div className="w-32 h-52 flex flex-col items-center">
              <Link
                href={"/select/korean-curriculum"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.["korean-curriculum"]}
              </Link>
              <Link
                href={"/select/open-campus"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.["open-campus"]}
              </Link>
              <Link href={"/board/review"} className="p-2 text-xs font-bold text-center text-white">
                {boardMenu[language]?.review}
              </Link>
            </div>
            <div className="w-32 h-52 flex flex-col items-center">
              <Link
                href={"/select/applied-to"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.["applied-to"]}
              </Link>
              <Link
                href={"/board/application-form"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {boardMenu[language]?.["application-form"]}
              </Link>
              <Link href={"/guidance/visa"} className="p-2 text-xs font-bold text-center text-white">
                {guidanceMenu[language]?.visa}
              </Link>
            </div>
            <div className="w-32 h-52 flex flex-col items-center">
              <Link
                href={"/guidance/dormitory"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.dormitory}
              </Link>
              <Link
                href={"/guidance/facility"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {smallMenu[language]?.facility}
              </Link>
              <Link
                href={"/board/learning-materials"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {boardMenu[language]?.["learning-materials"]}
              </Link>
              <Link
                href={"/guidance/insurance"}
                className="p-2 text-xs font-bold text-center text-white"
              >
                {guidanceMenu[language]?.insurance}
              </Link>
            </div>
            <div className="w-32 h-52 flex flex-col items-center">
              <Link href={"/board/notice"} className="p-2 text-xs font-bold text-center text-white">
                {boardMenu[language]?.notice}
              </Link>
              <Link href={"/board/news"} className="p-2 text-xs font-bold text-center text-white">
                {boardMenu[language]?.news}
              </Link>
              <Link href={"/board/faq"} className="p-2 text-xs font-bold text-center text-white">
                {boardMenu[language]?.faq}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <main className="grow w-full">{children}</main>
      <footer className="w-full h-36 bg-[#0072ba] mt-24 relative">
        <div className="absolute bottom-2 right-4 text-white font-bold">
          {language === Language.english ? (
            <div className="text-center">
              <Link href="/terms-en" className="mr-4 hover:underline">
                {TermsOfService[language].terms}
              </Link>
              <Link href="http://www.yju.ac.kr/kr/4410/subview..do" className="hover:underline">
                {TermsOfService[language].privacyPolicy}
              </Link>
            </div>
          ) : language === Language.japanese ? (
            <div className="text-center">
              <Link href="/terms-jp" className="mr-4 hover:underline">
                {TermsOfService[language].terms}
              </Link>
              <Link href="http://www.yju.ac.kr/kr/4410/subview..do" className="hover:underline">
                {TermsOfService[language].privacyPolicy}
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <Link href="/terms-ko" className="mr-4 hover:underline">
                {TermsOfService[language].terms}
              </Link>
              <Link href="http://www.yju.ac.kr/kr/4410/subview..do" className="hover:underline">
                {TermsOfService[language].privacyPolicy}
              </Link>
            </div>
          )
          }
        </div>
      </footer>

      <div className="w-full flex justify-center py-8">
        <Image
          alt="영진전문대 푸터 로고"
          src="/images/yeungjinLogo.svg"
          width={200}
          height={100}
        />
        <div className="sm:block flex flex-col justify-center whitespace-nowrap font-semibold text-sm sm:ml-5">
          <address className="not-italic">{homePage[language]?.footerAddress}</address>
          <div>{homePage[language]?.footerCallEmail}</div>
        </div>
      </div>
    </div>
  );
}

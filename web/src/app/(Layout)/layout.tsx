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
  counselingForm,
  homePage,
  HomePageTitle,
  TermsOfService,
} from "../menu";
import { cookies } from "next/headers";
import { Language } from "../common/types";
import LoginCompo from "./components/LoginCompo";
import HamburgerMenuCompo from "./components/HamburgerMenuCompo";
import SetChangeCookieCompo from "./components/ChangeCookieCompo";

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
  description: "한국어교육센터는 외국인 대상 한국어 교육 전문 기관으로, 대한민국 교육부로부터 국제화역량 인증대학으로 선정되었습니다. 한국어교육센터 정규과정을 운영 중입니다.",
  icons:{
    icon:"images/logo.svg"
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
      <header className="w-full min-h-15 bg-[#0093EE] flex justify-end gap-3 font-bold items-center pr-5">
        <LoginCompo/>
        <SetChangeCookieCompo/>
      </header>

      <section className="w-full min-h-25 bg-[#0072BA] flex items-center pl-5 peer sm:justify-center justify-between">
        <Link href={"/"} className="w-1/6 flex justify-center items-center pl-4 sm:pl-0">
        <img src="/images/영진로고.png" className="w-15 h-15"></img>
        <h2 className="font-bold text-white w-full whitespace-nowrap">
          {HomePageTitle[language].yeungjin}<br></br>
          {HomePageTitle[language].koreanEducationCenter}
        </h2>
        </Link>
        <div className="hidden sm:w-full sm:h-full sm:flex sm:justify-evenly sm:text-white sm:font-bold sm:items-center sm:relative">
        <div className="w-1/5 flex justify-center cursor-pointer">{menu[language]?.introduce}</div>
          <div className="w-1/5 flex justify-center cursor-pointer">{menu[language]?.curriculum}</div>
          <div className="w-1/5 flex justify-center cursor-pointer">{menu[language]?.application}</div>
          <div className="w-1/5 flex justify-center cursor-pointer">{menu[language]?.schoolLife}</div>
          <div className="w-1/5 flex justify-center cursor-pointer">{menu[language]?.notification}</div>
        </div>
        <HamburgerMenuCompo/>
      </section>
      <section
        className="hidden sm:hidden sm:peer-hover:block sm:hover:block sm:w-full sm:min-h-52 sm:z-50 sm:bg-white sm:absolute sm:z-40"
        style={{ top: "86px" }}
      >
        <div className="min-h-52 flex flex-row w-full">
          <div className="ml-5 h-full w-1/6"></div>
          <div className="w-full h-[100%] flex justify-evenly">
            <div className="w-1/5 h-52 flex flex-col items-center border-r">
              <Link href={`/guidance/introduction`} className="p-2 text-sm font-bold">
                {smallMenu[language]?.centerIntro}
              </Link>
              <Link href={"/guidance/directions"}  className="p-2 text-sm font-bold" >
                {smallMenu[language]?.howToGetHere}
              </Link>
              <Link href={"/staff/staff-intro"}  className="p-2 text-sm font-bold" >
                {smallMenu[language]?.["staff-intro"]}
              </Link>
            </div>
            <div className="w-1/5 h-52 flex flex-col items-center border-r">
              <Link href={"/select/korean-curriculum"}  className="p-2 text-sm font-bold">
                {smallMenu[language]?.["korean-curriculum"]}
              </Link>
              <Link href={"/select/open-campus"} className="p-2 text-sm font-bold" >
                {smallMenu[language]?.["open-campus"]}
              </Link>
              <Link href={"/board/review"} className="p-2 text-sm font-bold" >
              {boardMenu[language]?.review}
              </Link>
            </div>
            <div className="w-1/5 h-52 flex flex-col items-center border-r">
              <Link href={"/select/applied-to"} className="p-2 text-sm font-bold">
                {smallMenu[language]?.["applied-to"]}
              </Link>
              <Link href={"/form/counseling"} className="p-2 text-sm font-bold">
                {counselingForm[language]?.["counseling"]}
              </Link>
              <Link href={"/board/application-form"} className="p-2 text-sm font-bold">
                {boardMenu[language]?.["application-form"]}
              </Link>
              <Link href={"/guidance/visa"} className="p-2 text-sm font-bold">
                {guidanceMenu[language]?.visa}
              </Link>
            </div>
            <div className="w-1/5 h-52 flex flex-col items-center border-r">
              <Link href={"/guidance/dormitory"} className="p-2 text-sm font-bold">
                {smallMenu[language]?.dormitory}
              </Link>
              <Link href={"/guidance/facility"} className="p-2 text-sm font-bold">
                {smallMenu[language]?.facility}
              </Link>
              <Link href={"/board/learning-materials"} className="p-2 text-sm font-bold">
                {boardMenu[language]?.["learning-materials"]}
              </Link>
              <Link href={"/guidance/insurance"} className="p-2 text-sm font-bold">
                {guidanceMenu[language]?.insurance}
              </Link>
            </div>
            <div className="w-1/5 h-52 flex flex-col items-center">
              <Link href={"/board/notice"} className="p-2 text-sm font-bold" >
                {boardMenu[language]?.notice}
              </Link>
              <Link href={"/board/news"} className="p-2 text-sm font-bold" >
                {boardMenu[language]?.news}
              </Link>
              <Link href={"/board/faq"} className="p-2 text-sm font-bold" >
                {boardMenu[language]?.faq}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <main className="grow w-full">
      {children}
      </main>
      <footer className="w-full h-36 bg-[#0072ba] mt-24 relative">
        <div className="absolute bottom-2 right-4 text-white font-bold">
          <div className="text-center">
            <Link
              href="/guidance/terms"
              className="mr-4 hover:underline"
            >
              {TermsOfService[language].terms}
            </Link>
            <Link
              href="/guidance/privacy-policy"
              className="hover:underline"
            >
              {TermsOfService[language].privacyPolicy}
            </Link>
          </div>
        </div>
      </footer>


      <div className="w-full flex justify-center py-8">
        <img
          src="https://kcenter.yju.ac.kr/kr/wp-content/uploads/sites/2/2023/05/logo.png"
          className="w-48"
        />
        <div className="hidden sm:block flex flex-col justify-center whitespace-nowrap font-bold text-sm">
          <address>{homePage[language]?.footerAddress}</address>
          <div>{homePage[language]?.footerCallEmail}</div>
        </div>
      </div>
    </div>
  );
}
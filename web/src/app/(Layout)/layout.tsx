import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { boardMenu, guidanceMenu, menu, smallMenu } from "../menu";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { Language } from "../common/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language =
    ((await cookies()).get("language")?.value as Language) || Language.korean;

  return (
    <div className="h-screen w-full flex flex-col ">
      <div className="w-full min-h-15 bg-[#0093EE] flex justify-end gap-3 font-bold items-center pr-5">
        <Link href={"/"}>메인</Link>
        <Link href={"/login"}>로그인</Link>
        <Link href={"/japan"}>
          <img src="/images/japan.png" className="w-6 h-4"></img>
        </Link>
        <Link href={"/usa"}>
          <img src="/images/usa.png" className="w-6 h-4"></img>
        </Link>
      </div>
      <div className="w-full min-h-25 bg-[#0072BA] flex items-center pl-5 peer">
        <img src="/images/영진로고.png" className="w-15 h-15"></img>
        <h2 className="font-bold text-white w-40">
          영진전문대<br></br>
          한국어교육센터
        </h2>
        <div className="w-full h-full flex justify-evenly text-white font-bold items-center relative">
          <Link href={"/center-intro"}>{menu[language]?.introduce}</Link>
          <Link href={"/center-intro"}>{menu[language]?.curriculum}</Link>
          <Link href={"/center-intro"}>{menu[language]?.application}</Link>
          <Link href={"/center-intro"}>{menu[language]?.schoolLife}</Link>
          <Link href={"/center-intro"}>{menu[language]?.notification}</Link>
        </div>
      </div>
      <div
        className="hidden peer-hover:block hover:block w-full min-h-52 z-50 bg-white absolute z-40"
        style={{ top: "86px" }}
      >
        <div className="flex flex-row w-full">
          <div className="w-40"></div>
          <div className="w-full flex justify-evenly">
            <div className="flex flex-col items-center">
              <Link href={`/guidance/introduction`}>
                {smallMenu[language]?.centerIntro}
              </Link>
              <Link href={"/guidance/directions"}>
                {smallMenu[language]?.howToGetHere}
              </Link>
              <Link href={"/staff-intro"}>
                {smallMenu[language]?.staffIntro}
              </Link>
            </div>
            <div className="flex flex-col">
              <Link href={"/korea-curriculum"}>
                {smallMenu[language]?.koreaCurriculum}
              </Link>
              <Link href={"/open-campus"}>
                {smallMenu[language]?.openCampus}
              </Link>
              <Link href={"/board/review"}>{boardMenu[language]?.review}</Link>
            </div>
            <div className="flex flex-col">
              <Link href={"/center-intro"}>
                {smallMenu[language]?.centerIntro}
              </Link>
              <Link href={"/center-intro"}>
                {smallMenu[language]?.howToGetHere}
              </Link>
              <Link href={"/board/application-form"}>
                {boardMenu[language]?.["application-form"]}
              </Link>
              <Link href={"/guidance/visa"}>
                {guidanceMenu[language]?.visa}
              </Link>
            </div>
            <div className="flex flex-col">
              <Link href={"/guidance/dormitory"}>
                {smallMenu[language]?.centerIntro}
              </Link>
              <Link href={"/guidance/facility"}>
                {smallMenu[language]?.howToGetHere}
              </Link>
              <Link href={"/board/learning-materials"}>
                {boardMenu[language]?.["learning-materials"]}
              </Link>
              <Link href={"/guidance/insurance"}>
                {guidanceMenu[language]?.insurance}
              </Link>
            </div>
            <div className="flex flex-col">
              <Link href={"/board/notice"}>{boardMenu[language]?.notice}</Link>
              <Link href={"/board/news"}>{boardMenu[language]?.news}</Link>
              <Link href={"/board/faq"}>{boardMenu[language]?.faq}</Link>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/영진소개배너.jpg"
        className="w-full h-60 mt-4 flex justify-center items-center"
      ></img>
      {children}
    </div>
  );
}

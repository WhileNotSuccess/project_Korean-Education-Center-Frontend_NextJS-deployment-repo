// [(layout)/layout]
// 헤더 및 네비게이션, 푸터를 렌더링하는 레이아웃 컴포넌트

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  guidanceMenu,
  menu,
  smallMenu,
  boardMenu,
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
    <div className="w-full flex flex-col overflow-x-hidden">
      
      {/* 헤더 */}
      <header className="w-full min-h-[10px] max-h-[14px] lg:max-h-[60px] h-auto bg-white text-black flex justify-between gap-3 items-center py-6 lg:p-4">
        <Link
          href={"/"}
          className="flex justify-center items-center pl-4 sm:pl-0 w-auto"
        >
          <Image
            alt="영진전문대 로고"
            src={`/images/yeungjinLogo.svg`}
            width={120}
            height={120}
            className="w-[90px] h-auto lg:w-[160px] flex-shrink-0 mr-2"
          />

          <div className="mx-4 w-[1.5px] h-[20px] bg-black flex-shrink-0" />

          <h6 className="font-semibold text-sm lg:font-medium whitespace-nowrap lg:text-lg mx-2">
            {HomePageTitle[language].koreanEducationCenter}
          </h6>
        </Link>

        {/* 네비게이션 */}
        <div className="relative h-14 hidden xl:flex items-center w-full justify-center">
          
          {/* 상위 메뉴 */}
          <section className="z-50 flex justify-center items-center h-full">
            <div className={`flex ${
                language === 'english' 
                  ? 'gap-12 text-sm' 
                  : 'gap-20 text-base'
            }`}>
                {/* 센터소개 */}
                <div className="cursor-pointer hover:scale-105 transition group/intro relative h-14 flex items-center">
                  {menu[language]?.introduce}
                  
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white shadow-md opacity-0 invisible group-hover/intro:visible group-hover/intro:opacity-100 transition-opacity duration-200 py-4 px-6 rounded-md whitespace-nowrap text-center">
                    <Link href="/guidance/introduction" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {smallMenu[language]?.centerIntro}
                    </Link>
                    <Link href="/guidance/directions" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {smallMenu[language]?.howToGetHere}
                    </Link>
                    <Link href="/staff/staff-intro" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {smallMenu[language]?.["staff-intro"]}
                    </Link>
                  </div>
                </div>

                {/* 과정소개 */}
                <div className="cursor-pointer hover:scale-105 transition group/curriculum relative h-14 flex items-center">
                  {menu[language]?.curriculum}
                  
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white shadow-md opacity-0 invisible group-hover/curriculum:visible group-hover/curriculum:opacity-100 transition-opacity duration-200 py-4 px-6 rounded-md whitespace-nowrap text-center">
                    <Link href="/select/korean-curriculum" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {smallMenu[language]?.["korean-curriculum"]}
                    </Link>
                    <Link href="/select/open-campus" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {smallMenu[language]?.["open-campus"]}
                    </Link>
                    <Link href="/board/review" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {boardMenu[language]?.review}
                    </Link>
                  </div>
                </div>

                {/* 입학신청 */}
                <div className="cursor-pointer hover:scale-105 transition group/application relative h-14 flex items-center">
                  {menu[language]?.application}
                                    
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white shadow-md opacity-0 invisible group-hover/application:visible group-hover/application:opacity-100 transition-opacity duration-200 py-4 px-6 rounded-md whitespace-nowrap text-center">
                    <Link href="/guidance/procedure-guide" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {guidanceMenu[language]?.["procedure-guide"]}
                    </Link>
                    <Link href="/guidance/visa" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {guidanceMenu[language]?.visa}
                    </Link>
                  </div>
                </div>

                {/* 학교생활 */}
                <div className="cursor-pointer hover:scale-105 transition group/school relative h-14 flex items-center">
                  {menu[language]?.schoolLife}
                                    
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white shadow-md opacity-0 invisible group-hover/school:visible group-hover/school:opacity-100 transition-opacity duration-200 py-4 px-6 rounded-md whitespace-nowrap text-center">
                    <Link href="/guidance/dormitory" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {smallMenu[language]?.dormitory}
                    </Link>
                    <Link href="/guidance/facility" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {smallMenu[language]?.facility}
                    </Link>
                    <Link href="/board/learning-materials" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {boardMenu[language]?.["learning-materials"]}
                    </Link>
                    <Link href="/guidance/insurance" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {guidanceMenu[language]?.insurance}
                    </Link>
                  </div>
                </div>

                {/* 알림/공지 */}
                <div className="cursor-pointer hover:scale-105 transition group/notification relative h-14 flex items-center">
                  {menu[language]?.notification}
                  
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white shadow-md opacity-0 invisible group-hover/notification:visible group-hover/notification:opacity-100 transition-opacity duration-200 py-4 px-6 rounded-md whitespace-nowrap text-center">
                    <Link href="/board/notice" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {boardMenu[language]?.notice}
                    </Link>
                    <Link href="/board/news" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {boardMenu[language]?.news}
                    </Link>
                    <Link href="/board/faq" className="block py-2 hover:text-gray-600 hover:scale-105 transition text-sm">
                      {boardMenu[language]?.faq}
                    </Link>
                  </div>
                </div>
            </div>
          </section>
        </div>
      
        {/* 모바일 전용 햄버거 */}
        <div className="flex xl:hidden">
          <HamburgerMenuCompo />
        </div>

        {/* 언어 변경 컴포넌트 */}
        <div className="hidden xl:flex xl:justify-evenly xl:items-center xl:mr-6">
          <ManagementCookieCompo />
        </div>
      </header>
      
      {/* 메인 콘텐츠 위치 */}
      <main className="grow w-full">{children}</main>

      {/* 푸터 */}
      <footer className="w-full mt-36 px-4 lg:px-20 py-6 notranslate"> {/* notranslate = 구글 자동번역 막기, hydration 오류 방지 */}
        <div className="flex justify-end mb-3">
          <div className="text-sm">
            {language === Language.english ? (
              <>
                <Link href="/terms-en" className="mr-4 hover:underline">
                  {TermsOfService[language].terms}
                </Link>
                <Link
                  href="http://www.yju.ac.kr/kr/4410/subview..do"
                  className="hover:underline"
                >
                  {TermsOfService[language].privacyPolicy}
                </Link>
              </>
            ) : language === Language.japanese ? (
              <>
                <Link href="/terms-jp" className="mr-4 hover:underline">
                  {TermsOfService[language].terms}
                </Link>
                <Link
                  href="http://www.yju.ac.kr/kr/4410/subview..do"
                  className="hover:underline"
                >
                  {TermsOfService[language].privacyPolicy}
                </Link>
              </>
            ) : (
              <>
                <Link href="/terms-ko" className="mr-4 hover:underline">
                  {TermsOfService[language].terms}
                </Link>
                <Link
                  href="http://www.yju.ac.kr/kr/4410/subview..do"
                  className="hover:underline"
                >
                  {TermsOfService[language].privacyPolicy}
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div>
            <Image
              alt="영진전문대 푸터 로고"
              src="/images/yeungjinLogo.svg"
              width={170}
              height={85}
              className="hidden lg:flex"
            />
          </div>

          {/* 주소 */}
          <div className="text-right text-xs w-4/5 lg:w-full lg:text-sm break-words">
            <address className="not-italic">
              {homePage[language]?.footerAddress}
            </address>
            <div>{homePage[language]?.footerCallEmail}</div>
          </div>
        </div>
      </footer>
    </div>
  ); 
}
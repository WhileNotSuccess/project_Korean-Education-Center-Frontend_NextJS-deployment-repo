// [(layout)/components/HomePageCompo.tsx]
// 홈 화면 컴포넌트

"use client";

import { useState, useEffect, useRef } from "react";
import { homePage, boardMenu, getError } from "@/app/menu";
import { Attachments, Language } from "@/app/common/types";
import Cookies from "js-cookie";
import useCustomFetch from "@/app/lib/customFetch";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BoardDataMapCompo from "./BoardDataMapCompo";

interface BannerType {
  expiredData: string;
  id: number;
  image: string;
  language: string;
  url: string;
}

interface NewsType {
  id: number;
  image: string;
  title: string;
  createdDate: string;
  updatedDate: string;
}

interface Applicants {
  applicationFileName: string;
  applicationImageName: string;
  guidelinesForApplicantsFileName: string;
  guidelinesForApplicantsImageName: string;
}

interface NoticeType {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
  language: string;
}

export default function HomePageCompo() {
  const [banner, setBanner] = useState<BannerType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const customFetch = useCustomFetch();
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null); // 슬라이더 div 참조
  const [notice, setNotice] = useState<NoticeType[]>([]);
  const [newsData, setNewsData] = useState<NewsType[]>([]); // 알림
  const [loading, setLoading] = useState<boolean>(false);
  const [guidelinesForApplicants, setGuidelinesForApplicants] =
    useState<Attachments>({
      id: 0,
      fileSize: 0,
      filename: "",
      filetype: "",
      applicationId: 0,
    });
  const itemRef = useRef<HTMLDivElement>(null); // 슬라이더 내부 각 div의 길이 참조용
  const [itemWidth, setItemWidth] = useState(0); // 내부 각 div 길이 변수
  const [entranceApplication, setEntranceApplication] = useState<Applicants>({
    applicationFileName: "",
    applicationImageName: "",
    guidelinesForApplicantsFileName: "",
    guidelinesForApplicantsImageName: "",
  });
  const [language, setLanguage] = useState<Language>(Language.korean);
  const [overviewId, setOverviewId] = useState("")

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  useEffect(()=>{
    const overview = async () =>{
      try{
        const response = await customFetch("/posts?category=korean-sample",{
          method : "GET"
        })
        const data = await response.json()
        setOverviewId(data.data.id)
      }catch{
        alert(getError[language].htmlError)
      }
    }
    overview()
  },[])

  useEffect(() => {
    const newsData = async () => {
      setLoading(true)
      try {
        const response = await customFetch("/posts/card/slide", {
          method: "GET",
        });
        const data = await response.json()
        setNewsData(data.data);
        const res = await customFetch(
          "/posts?category=guidelinesForApplicants",
          {
            method: "GET",
          }
        );
        const guidelinesForApplicants = await res.json()
        setGuidelinesForApplicants(guidelinesForApplicants.files[0]);
      } 
      catch (error) {
        alert(getError[language]?.newsError);
      } finally {
        setLoading(false);
      }
    };
    newsData();
  }, []);

  useEffect(() => {
    const bannerData = async () => {
      try {
        const response = await customFetch("/banners", {
          method: "GET",
        });
        const data = await response.json()
        setBanner(data.data);
      } 
      catch (error) {
        alert(getError[language]?.bannerError);
      }
    };
    bannerData();
  }, []);

  useEffect(() => {
    // 모집요강 및 입학신청서를 불러오는 함수
    const entranceApplicationData = async () => {
      try {
        const response = await customFetch("/posts/main/applicants", {
          method: "GET",
        });
        const data = await response.json()
        setEntranceApplication(data);
      } 
      catch (error) {
        alert(getError[language].entranceApplicationError);
      }
    };
    entranceApplicationData();
  }, []);

  useEffect(() => {  // 공지사항을 불러오는 함수
    const noticeData = async () => {
      setLoading(true)
      try {
        const response = await customFetch("/posts/notice?limit=10&page=1", {
          method: "GET",
        });
        const data = await response.json()
        setNotice(data.data);
      } 
      catch (error) {
        alert(getError[language]?.newsError);
      } finally {
        setLoading(false)
      }
    };
    noticeData();
  }, []);

  const onGoBoard = async (category: string) => {
    router.push(`/board/${category}`);
  };

  const onGoUrl = async (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    // 자동+클릭으로 넘어가는 길이 설정
    const updateItemWidth = () => {
      if (itemRef.current) {
        setItemWidth(itemRef.current.clientWidth + 16); // 16은 이미지 간격
      }
    };

    updateItemWidth(); // 초기 설정
  }, [newsData]);

  useEffect(() => {
    // 한국어교육센터 알림 자동으로 넘어가는 기능
    const interval = setInterval(() => {
      onScrollRight();
    }, 10000); // 10초마다 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [itemWidth]);

  const onScrollLeft = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      if (slider.scrollLeft <= 0) {
        slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
      } else {
        slider.scrollLeft -= itemWidth;
      }
    }
  };

  const onScrollRight = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += itemWidth;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banner.length]);

  return (
    <div className="w-full flex flex-wrap">
      <div className="relative w-full h-[220px] lg:max-w-[2000px] lg:h-[calc(100vh-60px)] overflow-hidden lg:shadow-lg">
        <section className="h-full">

          {/* 배너 슬라이드 영역 */}
          <div
            className="hidden lg:flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banner.map((banner, index) => (
              <div
                key={index}
                className="relative min-w-full h-full"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.image}`}
                  alt="배너 이미지"
                  fill
                  sizes="100vw"
                  className="object-cover rounded-b-lg cursor-pointer"
                  unoptimized
                  // onClick={() => onGoUrl(banner.url)}
                />
              </div>
            ))}
          </div>

          {/* 배너 위 텍스트/로고 오버레이 */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 lg:bg-black/20 rounded-b-lg">
            <div className="flex flex-col items-start lg:items-center lg:text-white">
              {/* 로고 */}
              <Image
                src="/images/yeungjinLogoOpenGraph.png"
                alt="Yeungjin Logo"
                width={120}
                height={120}
                className="w-20 h-20 lg:w-32 lg:h-32 mt-10 lg:mt-0 mb-4 lg:mb-6"
                priority
              />
              {/* 텍스트들 */}
              <p className="text-2xl font-semibold lg:text-3xl mb-1 lg:mb-2">
                Yeungjin University
              </p>
              <h1 className="text-2xl lg:text-5xl font-semibold leading-tight mb-1 lg:mb-8">
                Korean Education Center
              </h1>
              {/* IEQSA 설명 */}
              <p className="text-xs lg:text-lg">
                {homePage[language]?.certified}
              </p>
            </div>
          </div>

          {/* 배너 아래 동그라미 */}
          <div className="hidden lg:flex absolute z-10 bottom-4 left-1/2 -translate-x-1/2 space-x-2">
            {banner.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? "bg-gray-500" : "border border-gray-500"
                }`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 공지사항 및 유학생 후기, F&Q 컨테이너 */}
      <div className="w-full mt-14 lg:mt-16 mb-16 lg:mb-28 max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:flex w-full flex-col p-2 lg:p-0">
          <h2 className="text-xl lg:text-3xl mb-4">About us</h2>
          <p className="mb-8 leading-relaxed text-sm">
            {homePage[language]?.["introduction"]}
          </p>
          <Link 
            href="/guidance/introduction"
            className="mb-10 lg:mb-0 text-center w-[180px] rounded-full border border-1 border-[#0D578D] text-[#0D578D] px-8 py-4 mx-auto hover:bg-[#0D578D] hover:text-white hover:scale-105 transition" 
          >
            More about us
          </Link>
        </div>

        <section className="w-full lg:mt-6 max-w-fit grid grid-cols-2 gap-4 items-end justify-self-center lg:justify-self-end">
          {/* 입학신청서 다운로드 */}
          <div
            className="relative w-full lg:w-48 aspect-square rounded-md shadow-lg overflow-hidden cursor-pointer group justify-end items-end"
            onClick={() => {
              router.push(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.applicationFileName}`
              );
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.applicationImageName}`}
              alt="입학신청서 다운로드 버튼"
              width={2000}
              height={300}
              unoptimized 
              className="w-full h-full object-cover transition group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm md:text-md p-2">
              {homePage[language]?.["Application-Form"]}
            </div>
          </div>

          {/* 모집요강 다운로드 */}
          <div
            className="relative w-full lg:w-48 aspect-square rounded-md shadow-lg overflow-hidden cursor-pointer group"
            onClick={() => {
              router.push(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.guidelinesForApplicantsFileName}`
              );
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication.guidelinesForApplicantsImageName}`}
              alt="모집요강 다운로드 버튼"
              width={2000}
              height={300}
              unoptimized
              className="w-full h-full object-cover transition group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm md:text-md p-2">
              {homePage[language]?.["recruitment-guidelines"]}
            </div>
          </div>

          {/* 공지사항 */}
          <div
            className="relative w-full lg:w-48 aspect-square rounded-md shadow-lg overflow-hidden cursor-pointer group"
            onClick={() => onGoBoard("notice")}
          >
            <Image
              src="/images/main_notice.png"
              alt="공지사항 바로가기 버튼"
              fill
              className="object-cover transition group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm md:text-md p-2">
              공지사항 &gt;
            </div>
          </div>

          {/* 알림 */}
          <div
            className="relative w-full lg:w-48 aspect-square rounded-md shadow-lg overflow-hidden cursor-pointer group"
            onClick={() => onGoBoard("notice")}
          >
            <Image
              src="/images/main_notice.png"
              alt="교육센터 알림 바로가기 버튼"
              fill
              className="object-cover transition group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm md:text-md p-2">
              교육센터 알림 &gt;
            </div>
          </div>
        </section>
      </div>

      {/* Our Programs 부분 */}
      <div className="hidden lg:block w-full relative xl:mb-56">
        {/* 파란 배경 */}
        <div className="w-full bg-[#227DC0]">
          <div className="max-w-6xl mx-auto flex flex-col xl:flex-row items-stretch py-10 px-10 gap-8">
            {/* 텍스트 */}
            <div className="flex-1 text-white">
              <h2 className="text-2xl mb-4">Our Programs</h2>
              <p className="leading-relaxed text-sm">
                {homePage[language]?.program}
              </p>
            </div>

            {/* 오른쪽 빈 공간(이미지 들어가야 함) */}
            <div className="flex-1"></div>
          </div>
        </div>

        {/* 이미지 위치 */}
        <div className="absolute top-10 right-0 xl:right-24 w-full max-w-md px-10 xl:px-0">
          <div className="relative group w-full cursor-pointer">
            <Image
              src="/images/main_campus.png"
              width={200}
              height={170}
              alt="글로벌 캠퍼스 전경"
              className="w-full h-auto object-cover shadow-2xl transition-all duration-300 rounded-sm"
            />
            
            {/* 호버 오버레이 */}
            <div className="absolute inset-0 rounded-sm bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
              <p className="text-lg mb-1">Welcome to</p>
              <p className="text-2xl mb-12">Yeungjin University</p>
              <Link 
                href='/select/korean-curriculum'
                className="px-6 py-3 text-md bg-[#227DC0] hover:bg-[#1a6399] rounded-full text-white font-medium transition-all duration-200 hover:scale-105">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 공지사항 */}
      <article className="w-full max-w-5xl mx-auto px-4 mb-10">
        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl lg:text-2xl font-semibold">{boardMenu[language]?.notice}</h2>
          <Link 
            href={'/board/notice'}
            className="text-3xl font-light hover:rotate-45 transition-transform duration-300">
            +
          </Link>
        </div>

        {/* 공지사항 목록 */}
        <div className="mb-6">
          {loading ? (
            // 스켈레톤 로딩
            <>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-5 border-b border-gray-200 animate-pulse"
                >
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="ml-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // 공지사항 데이터 표시 
            <BoardDataMapCompo category={"notice"} limit={7} />
          )}
        </div>
      </article>

      {/* 한국어 교육센터 알림 */}
      <article className="w-full flex justify-center items-center">
        <div className="min-w-[75%] flex flex-col items-center justify-center mt-12 px-4">
          <div className="w-full lg:w-[80%] font-semibold text-xl lg:text-2xl mb-4">
            {boardMenu[language]?.news}
          </div>
          {loading ? (
            // 스켈레톤 로딩
            <div className="relative w-[71%] overflow-hidden mt-4">
              <div className="flex gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="w-64 flex flex-col animate-pulse">
                    {/* 이미지 스켈레톤 */}
                    <div className="w-full h-40 bg-gray-200 rounded-md"></div>
                    {/* 제목 스켈레톤 */}
                    <div className="mt-2 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              ref={sliderRef}
              className="relative w-full lg:w-[71%] overflow-hidden cursor-pointer active:cursor-grabbing scroll-smooth"
            >
              <div className="flex gap-4 w-max">
                {newsData.map((item, index) => (
                  <Link href={`/board/news/${item.id}`} key={index}>
                    <article
                      ref={index === 0 ? itemRef : null}
                      className="w-64 flex flex-col items-center">
                    
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.image}`}
                        alt="알림 이미지"
                        width={2000}
                        height={300}
                        className="w-full h-40 object-cover rounded-md pointer-events-none"
                        unoptimized
                      />
                    <p className="text-left text-sm mt-2 line-clamp-2">{item.title}</p>
                    {/* 영어 제목이 표시 될 경우 너무 긴 경우가 있어서 2줄까지만 보여주기 */}
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* 화살표 버튼 */}
          <div className="w-48 flex justify-between items-center mt-4">
            <div 
              onClick={loading ? undefined : onScrollLeft}
              className={loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            >
              <Image
                src="/images/left.png"
                alt="왼쪽 화살표"
                className="size-8"
                width={96}
                height={96}
              />
            </div>
            <div 
              onClick={loading ? undefined : onScrollRight}
              className={loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            >
              <Image
                src="/images/right.png"
                alt="오른쪽 화살표"
                className="size-8"
                width={96}
                height={96}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
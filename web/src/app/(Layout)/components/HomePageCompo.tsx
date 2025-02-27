"use client";

import { useState, useEffect, useRef } from "react";
import { homePage, guidanceMenu, boardMenu, getError } from "@/app/menu";
import { Attachments, BoardData, Language } from "@/app/common/types";
import Cookies from "js-cookie";
import useCustomFetch from "@/app/lib/customFetch";
import { formatDate } from "@/app/common/formatDate";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
}

interface Applicants {
  applicationFileName: string;
  applicationImageName: string;
  guidelinesForApplicantsFileName: string;
  guidelinesForApplicantsImageName: string;
}

export default function HomePageCompo() {
  const [banner, setBanner] = useState<BannerType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const customFetch = useCustomFetch();
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null); // 슬라이더 div 참조
  const [newsData, setNewsData] = useState<NewsType[]>([]);
  const [guidelinesForApplicants, setGuidelinesForApplicants] =
    useState<Attachments>();
  const itemRef = useRef<HTMLDivElement>(null); // 슬라이더 내부 각 div의 길이 참조용
  const [itemWidth, setItemWidth] = useState(0); // 내부 각 div 길이 변수
  const [entranceApplication, setEntranceApplication] = useState<Applicants>();
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  useEffect(() => {
    const newsData = async () => {
      try {
        const data = await customFetch("/posts/card/slide", {
          method: "GET",
        });
        setNewsData(data.data);
        const guidelinesForApplicants = await customFetch(
          "/posts?category=guidelinesForApplicants",
          {
            method: "GET",
          }
        );
        setGuidelinesForApplicants(guidelinesForApplicants.files[0]);
      } catch (error) {
        alert(getError[language]?.newsError);
      }
    };
    newsData();
  }, []);

  useEffect(() => {
    const bannerData = async () => {
      try {
        const data = await customFetch("/banners", {
          method: "GET",
        });

        setBanner(data.data);
      } catch (error) {
        alert(getError[language]?.bannerError);
      }
    };
    bannerData();
  }, []);

  useEffect(() => {
    // 모집요강 및 입학신청서를 불러오는 함수수
    const entranceApplicationData = async () => {
      try {
        const data = await customFetch("/posts/main/applicants", {
          method: "GET",
        });
        setEntranceApplication(data);
      } catch (error) {
        alert(getError[language].entranceApplicationError);
      }
    };
    entranceApplicationData();
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
    console.log(itemRef.current);
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

  return (
    <div className="w-full flex flex-wrap">
      <div className="relative w-full h-3 max-w-[2000px] h-auto overflow-hidden shadow-lg">
        <section>
          <div
            className="h-full w-full object-contain flex transition-transform duration-700 ease-in-out "
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banner.map((banner, index) => (
              <img
                key={index}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.image}`}
                className="h-auto max-w-full cursor-pointer"
                onClick={() => onGoUrl(banner.url)}
              />
            ))}
          </div>
          <div className="absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banner.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </section>
      </div>
      <div className="w-full mt-12 flex flex-col justify-center items-center sm:flex-row sm:items-stretch">
        <section>
          <div className="w-96 border sm:mr-4 sm:mb-0 mb-4 flex flex-col">
            <header className="flex justify-between items-center px-4">
              <h1 className="text-2xl font-bold p-2">
                {homePage[language]?.notice}
              </h1>
              <img
                src="images/add_button.png"
                className="w-8 cursor-pointer"
                onClick={() => onGoBoard("notice")}
              />
            </header>
            <div className="flex flex-col px-2">
              <BoardDataMapCompo category={"notice"} limit={8} />
            </div>
          </div>
        </section>
        <div className="w-96  flex flex-col justify-between">
          <section>
            <div className="w-full   border">
              <header className="flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold p-2">
                  {homePage[language]?.review}
                </h1>
                <img
                  src="images/add_button.png"
                  className="w-8 cursor-pointer"
                  onClick={() => onGoBoard("review")}
                />
              </header>
              <div className="flex flex-col px-2">
                <BoardDataMapCompo category={"review"} limit={3} />
              </div>
            </div>
          </section>
          <section>
            <div className="w-full mt-4 border">
              <header className="flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold p-2">
                  {homePage[language]?.faq}
                </h1>
                <img
                  src="images/add_button.png"
                  className="w-8 cursor-pointer"
                  onClick={() => onGoBoard("faq")}
                />
              </header>
              <div className="flex flex-col px-2">
                <BoardDataMapCompo category={"faq"} limit={3} />
              </div>
            </div>
          </section>
        </div>
        {/* 빠른서비스 및 서류 다운하는 탭*/}
        <aside className="hidden sm:fixed sm:w-24 sm:min-h-[80%] sm:right-0 sm:top-24 sm:border sm:bg-blue-500/80 sm:rounded-l-xl sm:flex sm:flex-col sm:justify-evenly sm:py-2">
          <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
            <Link
              href={"/guidance/introduction"}
              className="size-12 p-2 border rounded-full bg-[#ffffff]"
            >
              <img src="images/home.png" />
            </Link>
            <Link
              href={"/guidance/introduction"}
              className="text-xs text-wrap font-light text-center text-white"
            >
              {guidanceMenu[language]?.introduction}
            </Link>
          </div>
          <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
            <Link
              href={"/board/faq"}
              className="size-12 p-2 border rounded-full bg-[#ffffff]"
            >
              <img src="images/faq.png" />
            </Link>
            <Link
              href={"/board/faq"}
              className="text-xs text-wrap font-light text-center text-white"
            >
              {boardMenu[language]?.faq}
            </Link>
          </div>
          <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
            <Link
              href={"/board/review"}
              className="size-12 p-2 border rounded-full bg-[#ffffff]"
            >
              <img src="images/review.png" />
            </Link>
            <Link
              href={"/board/review"}
              className="text-xs text-wrap font-light text-center text-white"
            >
              {boardMenu[language]?.review}
            </Link>
          </div>
          <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
            <Link
              href={"/board/news"}
              className="size-12 p-2 border rounded-full bg-[#ffffff]"
            >
              <img src="images/light.png" />
            </Link>
            <Link
              href={"/board/news"}
              className="text-xs text-wrap font-light text-center text-white"
            >
              {boardMenu[language]?.news}
            </Link>
          </div>
          <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
            <Link
              href={"/select/applied-to"}
              className="size-12 p-2 border rounded-full bg-[#ffffff]"
            >
              <img src="images/문서1.png" />
            </Link>
            <Link
              href={"/select/applied-to"}
              className="text-xs text-wrap font-light text-center text-white"
            >
              {homePage[language]?.["applied-to"]}
            </Link>
          </div>
          <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${guidelinesForApplicants?.filename}`}
              className="size-12 p-2 border rounded-full bg-[#ffffff]"
            >
              <img src="images/학사모1.png" />
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${guidelinesForApplicants?.filename}`}
              className="text-xs text-wrap font-light text-center text-white"
            >
              {homePage[language]?.["recruitment-guidelines"]}
            </Link>
          </div>
        </aside>
      </div>
      {/* 클릭후 드래그로 움직이는 소식 탭 */}
      <article className="w-full flex justify-center items-center">
        <div className="min-w-[75%] flex flex-col items-center justify-center mt-12">
          <div className="w-[80%] font-bold text-2xl">
            {boardMenu[language]?.news}
          </div>
          <div
            ref={sliderRef}
            className="relative w-[71%] overflow-hidden cursor-pointer active:cursor-grabbing mt-4 scroll-smooth"
          >
            <div className="flex gap-4 w-max">
              {newsData.map((item, index) => (
                <Link href={`/board/news/${item.id}`} key={index}>
                  <article
                    ref={index === 0 ? itemRef : null}
                    className="w-64 flex flex-col items-center"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.image}`}
                      className="w-full h-40 object-cover rounded-lg pointer-events-none"
                    />
                    <p className="text-center mt-2">{item.title}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-48 flex justify-between items-center">
            <div onClick={onScrollLeft}>
              <img src="/images/left.png" className="size-8 cursor-pointer" />
            </div>
            <div onClick={onScrollRight}>
              <img src="/images/right.png" className="size-8 cursor-pointer" />
            </div>
          </div>
        </div>
      </article>

      <div className="w-full flex justify-center items-center gap-12 mt-12">
        <div className="flex flex-col w-64">
          <div
            className="text-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 text-lg rounded-lg"
            onClick={() => {
              router.push(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication?.applicationFileName}`
              );
            }}
          >
            {homePage[language]?.["Application-Form"]}
          </div>
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication?.applicationImageName}`}
            className="w-full h-64 object-cover mt-4"
          />
        </div>
        <div className="flex flex-col w-64">
          <div
            className="text-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 text-lg rounded-lg"
            onClick={() => {
              router.push(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication?.guidelinesForApplicantsFileName}`
              );
            }}
          >
            {homePage[language]?.["recruitment-guidelines"]}
          </div>
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${entranceApplication?.guidelinesForApplicantsImageName}`}
            className="w-full h-64 object-cover mt-4"
          />
        </div>
      </div>
    </div>
  );
}

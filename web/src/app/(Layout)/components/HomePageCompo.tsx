'use client'

import { useState, useEffect, useRef } from "react";
import { homePage, guidanceMenu, boardMenu, getError } from "@/app/menu";
import { BoardData, Language } from "@/app/common/types";
import Cookies from "js-cookie";
import useCustomFetch from "@/app/lib/customFetch";
import { formatDate } from "@/app/common/formatDate";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BannerType{
  expiredData : string
  id : number
  image : string
  language : string
  url : string
}

interface NewsType{
  id: number
  image : string
  title : string
}

export default function HomePageCompo() {
  const [banner, setBanner] = useState<BannerType[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const language: Language = (Cookies.get("language") as Language) || "korean";
  const customFetch = useCustomFetch()
  const [noticeData, setNoticeData] = useState<BoardData[]>([])
  const [reviewData, setReviewData] = useState<BoardData[]>([])
  const [faqData, setFaqData] = useState<BoardData[]>([])
  const router = useRouter()
  const sliderRef = useRef<HTMLDivElement>(null); // 슬라이더 div 참조
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [startX, setStartX] = useState(0); // 드래그 시작 X 위치
  const [scrollLeft, setScrollLeft] = useState(0); // 슬라이더의 현재 스크롤 위치
  const [newsData, setNewsData] = useState<NewsType[]>([])
  const itemRef = useRef<HTMLDivElement>(null); // 슬라이더 내부 각 div의 길이 참조용
  const [itemWidth, setItemWidth] = useState(0); // 내부 각 div 길이 변수

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true); // 드래그 시작
    setStartX(e.pageX - sliderRef.current.offsetLeft); // 드래그 시작 위치 저장
    setScrollLeft(sliderRef.current.scrollLeft); // 현재 스크롤 상태 저장
  };

  // 마우스 이동 시 이미지 이동
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft; // 현재 마우스의 위치, offsetLeft = 부모div의 왼쪽 끝에서 해당 div의 왼쪽까지의 거리가 어느정도 되는지
    const walk = (x - startX); // 드래그 시작하고 얼마나 움직였는지 확인, startX = 드래그 시작전 마우스의 위치, x = 드래그를 하면서 실시간으로 바뀌는 마우스의 위치
    sliderRef.current.scrollLeft = scrollLeft - walk; // 스크롤 이동
    if (sliderRef.current.scrollLeft <= 0 || sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth) {
      setIsDragging(false); 
    }
  };

  // 마우스 클릭 종료
  const onMouseUp = () => {
    setIsDragging(false); // 드래그 종료
  };

  useEffect(()=>{
    const newsData = async()=>{
      try{
        const data = await customFetch("/posts/card/slide",{
          method : "GET"
        })
        console.log(data.data)
        setNewsData(data.data)
      }catch(error){
        alert(getError[language]?.newsError)
      }
    }
    newsData()
  },[])


  useEffect(()=>{
    const bannerData = async()=>{
      try{
        const data = await customFetch("/banners",{
          method : "GET"
        })
        console.log(data.data)
        setBanner(data.data)
      }catch(error){
        alert(getError[language]?.bannerError)
      }
    }
    bannerData()
  },[])

  useEffect(() => {  // 자동 슬라이드 배너
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % banner.length); // %으로 나머지를 구해 1, 2, 3, 0으로 변경
    }, 6000);
    return () => clearInterval(interval);
  }, [banner.length]);

  useEffect(()=>{  // Home페이지에 띄울 리스트
    const boardData = async() =>{
      try{
        const noticeData = await customFetch(`/posts/notice?limit=8`,{
          method : "GET"
        })
        const reviewData = await customFetch("/posts/review?limit=3",{
          method : "GET"
        })
        const faqData = await customFetch("/posts/faq?limit=3",{
          method : "GET"
        })
      setNoticeData(noticeData.data)
      setReviewData(reviewData.data)
      setFaqData(faqData.data)
      }catch(error){
        console.error(error)
      }
    }
    boardData()
  },[])


  const onGoBoard = async (category : string)=>{
    router.push(`/board/${category}`)
  }

  const onGoUrl = async (url : string)=>{
    router.push(url)
  }

  useEffect(() => {
    const updateItemWidth = () => {
      if (itemRef.current) {
        setItemWidth(itemRef.current.clientWidth+16)
      }
    };

    updateItemWidth(); // 초기 설정
  }, [newsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      onScrollRight();
    }, 10000); // 10초마다 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [itemWidth]);


  const onScrollLeft = () => {
    console.log(itemRef.current)
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
    <div className="w-full h-screen flex flex-wrap">
<div className="relative w-full h-3 max-w-[2000px] h-auto overflow-hidden shadow-lg">
  <div className="h-full w-full object-contain flex transition-transform duration-700 ease-in-out " style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
    {banner.map((banner, index) => (
      <img key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.image}`} className="h-auto max-w-full cursor-pointer" onClick={()=>onGoUrl(banner.url)} />
    ))}
  </div>
  <div className="absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {banner.map((_, index) => (
      <button key={index} onClick={() => setCurrentIndex(index)}
        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-blue-500" : "bg-gray-300"}`}>
      </button>
    ))}
  </div>
</div>
    <div className="w-full mt-12 flex flex-col justify-center items-center sm:flex-row sm:items-stretch">
      <div className="w-96 border mr-4 flex flex-col">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold p-2">{homePage[language]?.notice}</h1>
          <img src="images/add_button.png" className="w-8 cursor-pointer" onClick={()=>onGoBoard("notice")}/>
        </div>
        <div className="flex flex-col px-2">
            {noticeData.map((item, index)=>{
              return(
                <div key={index} className="w-full flex flex-1 justify-between items-center border-b p-4">
                  <Link href={`/board/notice/${item.id}`} className="w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</Link> <div className="font-light text-sm">{formatDate(item.createdDate)}</div>
                </div>
              )
            })}
          </div>
      </div>
      <div  className="w-96  flex flex-col justify-between">
        <div className="w-full   border">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold p-2">{homePage[language]?.review}</h1>
          <img src="images/add_button.png" className="w-8 cursor-pointer" onClick={()=>onGoBoard("review")}/>
        </div>
        <div className="flex flex-col px-2">
            {reviewData.map((item, index)=>{
              return(
                <div key={index} className="w-full flex justify-between items-center border-b p-4">
                  <Link href={`/board/review/${item.id}`} className="w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</Link> <div className="font-light text-sm">{formatDate(item.createdDate)}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-full mt-4 border">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold p-2">{homePage[language]?.faq}</h1>
          <img src="images/add_button.png" className="w-8 cursor-pointer" onClick={()=>onGoBoard("faq")}/>
        </div>
        <div className="flex flex-col px-2">
            {faqData.map((item, index)=>{
              return(
                faqData ?
                <div key={index} className="w-full flex-1 flex items-center justify-between border-b p-4">
                  <Link href={`/board/faq/${item.id}`} className="w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</Link> <div className="font-light text-sm">{formatDate(item.createdDate)}</div>
                </div>
                : null
              )
            })}
          </div>
        </div>
      </div>
    </div>
    {/* 빠른서비스 및 서류 다운하는 탭*/}
    <div className="hidden sm:block fixed w-24 h-[80%] right-0 top-1/5 border bg-blue-500/80  rounded-l-xl flex flex-col justify-evenly py-2"> 
      <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
        <div className="size-12 p-2 border rounded-full bg-[#ffffff]">
            <img src="images/home.png"/>
        </div>
        <Link href={"/guidance/introduction"} className="text-xs text-wrap font-light text-center text-white">
        {guidanceMenu[language]?.introduction}
        </Link>
      </div>
      <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
        <div className="size-12 p-2 border rounded-full bg-[#ffffff]">
            <img src="images/faq.png"/>
        </div>
        <Link href={"/guidance/introduction"} className="text-xs text-wrap font-light text-center text-white">
        {boardMenu[language]?.faq}
        </Link>
      </div>
      <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
        <div className="size-12 p-2 border rounded-full bg-[#ffffff]">
            <img src="images/review.png"/>
        </div>
        <Link href={"/guidance/introduction"} className="text-xs text-wrap font-light text-center text-white">
        {boardMenu[language]?.review}
        </Link>
      </div>
      <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
        <div className="size-12 p-2 border rounded-full bg-[#ffffff]">
            <img src="images/light.png"/>
        </div>
        <Link href={"/guidance/introduction"} className="text-xs text-wrap font-light text-center text-white">
        {boardMenu[language]?.news}
        </Link>
      </div>
      <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
        <div className="size-12 p-2 border rounded-full bg-[#ffffff]">
            <img src="images/문서1.png"/>
        </div>
        <Link href={"/guidance/introduction"} className="text-xs text-wrap font-light text-center text-white">
        {homePage[language]?.["applied-to"]}
        </Link>
      </div>
      <div className="w-full flex  flex-col justify-center items-center cursor-pointer">
        <div className="size-12 p-2 border rounded-full bg-[#ffffff]">
            <img src="images/학사모1.png"/>
        </div>
        <Link href={"/guidance/introduction"} className="text-xs text-wrap font-light text-center text-white">
        {homePage[language]?.["recruitment-guidelines"]}
        </Link>
      </div>
    </div>
      {/* 클릭후 드래그로 움직이는 소식 탭 */}
      <div className="w-full flex justify-center items-center">
    <div className="min-w-[75%] flex flex-col items-center justify-center mt-12">
        <div className="w-[80%] font-bold text-2xl">
          {boardMenu[language]?.news}
        </div>
    <div
      ref={sliderRef}
      className="relative w-[71%] overflow-hidden cursor-pointer active:cursor-grabbing mt-4 scroll-smooth"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className="flex gap-4 w-max">
      {newsData.map((item, index) => (
        <Link href={`/board/news/${item.id}`} key={index}>
        <div ref={index === 0 ? itemRef : null} className="w-64 flex flex-col items-center">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.image}`}
            className="w-full h-40 object-cover rounded-lg pointer-events-none"
          />
          <p className="text-center mt-2">{item.title}</p>
        </div>
        </Link>
      ))}
      </div>
    </div>
    <div className="w-48 flex justify-between items-center">
    <div onClick={onScrollLeft}>
        <img src="/images/left.png" className="size-8 cursor-pointer"/>
      </div>
      <div onClick={onScrollRight}>
        <img src="/images/right.png" className="size-8 cursor-pointer"/>
      </div>
      </div>
    </div>
    </div>
      <div className="w-full h-36 bg-[#0072ba] mt-24">

      </div>
      <div className="w-full flex justify-center py-8">
        <img src="https://kcenter.yju.ac.kr/kr/wp-content/uploads/sites/2/2023/05/logo.png" className="w-48"/>
        <div className="flex flex-col justify-center whitespace-nowrap font-bold text-sm">
            <div>
              {homePage[language]?.footerAddress}
            </div>
            <div>
              {homePage[language]?.footerCallEmail}
            </div>
        </div>
      </div>
    </div>
  );
}
'use client'

import { useState, useEffect } from "react";
import { homePage, guidanceMenu, boardMenu } from "@/app/menu";
import { BoardData, Language } from "@/app/common/types";
import Cookies from "js-cookie";
import useCustomFetch from "@/app/lib/customFetch";
import { formatDate } from "@/app/common/formatDate";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePageCompo() {
  const images = [  // 배너 테스트용 ( 수정 예정 )
    "/images/한국어교육센터 기본배너.png",
    "/images/영진소개배너.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const language: Language = (Cookies.get("language") as Language) || "korean";
  const customFetch = useCustomFetch()
  const [boardData, setBoardData] = useState<BoardData[]>([])
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length); // %으로 나머지를 구해 1, 2, 3, 0으로 변경
      console.log(currentIndex)
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(()=>{
    const noticeData = async() =>{
      try{
        const data = await customFetch(`/posts/notice?limit=4`,{
          method : "GET"
        })
      setBoardData(data.data)
      }catch(error){
        console.error(error)
      }
    }
    noticeData()
  },[])


  const onGoNotice = async ()=>{
    router.push("/board/notice")
  }

  return (
    <div className="w-full h-screen mt-4 flex flex-wrap">
<div className="relative w-full h-3 max-w-[2000px] h-auto overflow-hidden shadow-lg">
  <div className="h-full w-full object-contain flex transition-transform duration-700 ease-in-out " style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
    {images.map((src, index) => (
      <img key={index} src={src} className="h-auto max-w-full" />
    ))}
  </div>
  <div className="absolute z-10 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {images.map((_, index) => (
      <button key={index} onClick={() => setCurrentIndex(index)}
        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-blue-500" : "bg-gray-300"}`}>
      </button>
    ))}
  </div>
</div>
    <div className="w-full h-64 flex justify-center mt-4">
      <div className="w-1/3 flex flex-col">
      <div className="w-24 h-8 bg-blue-500 text-white border flex items-center justify-center">
        {homePage[language]?.["quick-service"]}
        </div>
      <div className="w-full h-full border flex flex-wrap items-center justify-evenly bg-[#a3c5ed] border-blue-500">
        <Link href={"/guidance/introduction"} className="w-48 h-12 border rounded-3xl flex justify-center items-center bg-[#0072ba] text-white">
          {guidanceMenu[language]?.introduction}
        </Link>
        <Link href={"/board/faq"} className="w-48 h-12 border rounded-3xl flex justify-center items-center bg-[#0072ba] text-white">
          {boardMenu[language]?.faq}
        </Link>
        <Link href={"/board/review"} className="w-48 h-12 border rounded-3xl flex justify-center items-center bg-[#0072ba] text-white">
          {boardMenu[language]?.review}
        </Link>
        <Link href={"/board/news"} className="w-48 h-12 border rounded-3xl flex justify-center items-center bg-[#0072ba] text-white">
        {boardMenu[language]?.news}
        </Link >
      </div>
      </div>
    </div>
      <div className="w-full h-48 flex justify-around mt-12">
      <div className="w-1/3 flex flex-col  ">
          <div className="w-full flex justify-between">
            <div className="w-24 h-8 bg-blue-500 text-white border flex items-center justify-center">
              {homePage[language]?.notice}
            </div>
            <img src="images/add_button.png" className="w-8 cursor-pointer" onClick={()=>onGoNotice()}/>
          </div>
          <div className="mt-4">
            {boardData.map((item, index)=>{
              return(
                <div key={index} className="w-full h-8 flex justify-between">
                  <div>{item.title}</div> <div>{formatDate(item.createdDate)}</div>
                </div>
              )
            })}
          </div>
      </div>
      <div className="w-1/3 flex flex-col">
      <div className="w-full h-8 flex justify-between">
            <div className="w-24 h-8 bg-blue-500 text-white flex items-center justify-center">
              {homePage[language]?.download}
            </div>
          </div>
          <div className="w-full h-full border border-blue-500 bg-[#a3c5ed] flex justify-evenly items-center">
            <div className="w-24 h-28 border rounded-2xl bg-[#0072ba] flex flex-col justify-center items-center">
              <img src="images/문서.png" className="w-16"/>
              <h2 className="text-white">
                {homePage[language]?.["applied-to"]}
              </h2>
            </div>
            <div className="w-24 h-28 border rounded-2xl bg-[#0072ba] flex flex-col justify-center items-center">
            <img src="images/학사모.png" className="w-16"/>
            <h2 className="text-white">
                {homePage[language]?.["recruitment-guidelines"]}
              </h2>
            </div>
          </div>
      </div>
      </div>
      
      <div className="w-full h-36 bg-[#0072ba] mt-24">

      </div>
    </div>
  );
}

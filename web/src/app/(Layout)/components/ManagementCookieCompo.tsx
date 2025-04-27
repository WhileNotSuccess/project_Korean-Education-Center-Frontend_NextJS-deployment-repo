"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Language } from "../../common/types";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function ManagementCookieCompo(){
  const [language, setLanguage] = useState<Language>(Language.korean);
  const router = useRouter()

  useEffect(() => {
    const currentLanguage = Cookies.get("language");
    if (!currentLanguage) {
      Cookies.set("language", "korean", {
        expires: 30, // 30일 동안 유지
        path: "/", // 모든 경로
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN, // 백엔드로 쿠키를 보내기 위한 설정
        sameSite: "none", // 백엔드로 쿠키를 보내기 위한 설정
        secure: true, // 백엔드로 쿠키를 보내기 위한 설정
      });
    }
  }, []);

  useEffect(() => {
      const savedLanguage = Cookies.get("language") as Language;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
  }, [language]);


  const SetChangeCookie = (language : Language) => {
      Cookies.set("language", language, {
        expires: 30, // 30일 동안 유지
        path: "/", // 모든 경로
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN, // 백엔드로 쿠키를 보내기 위한 설정
        sameSite: "none", // 백엔드로 쿠키를 보내기 위한 설정
        secure: true, // 백엔드로 쿠키를 보내기 위한 설정
      });
      if (window.location.pathname.startsWith("/board") && /\d+$/.test(window.location.pathname.split("/").pop() || "")) { 
        // 주소가 '/board'로 시작하면서 뒤에 숫자가 1개 이상인 주소의 마지막요소 (숫자)를 가져오는 코드
        const pathName = window.location.pathname.split("/").filter(Boolean)[1]
        // 주소를 /로 나누고 ["", "board", "faq", "123"] 형태인 배열의 빈문자열을 제거하고 2번째 인덱스를 가져오는 코드
        // ["board", "faq", "123"] 인 배열에서 2번째 인덱스인 "faq"를 추출해 리다이렉트 시킴
        window.location.href = `/board/${pathName}`
        // router.push("/주소") 형태로 작성하면 서버에 새로운 페이지에 대한 요청을 보내는것이 아닌 부드럽게 이동만 해서
        // 쿠키값을반영하지 못한다. window.location.href는 서버로 새로 요청을 보내기 때문에 쿠키 값을 잘 반영한다.
      } else {
        window.location.reload();
      }
    setLanguage(language)
};

return(
  <div className="flex justify-between">
{language !== "japanese"? 
        <Image
          alt="일본 국기" 
          src="/images/japan.png" 
          className="mr-4 cursor-pointer"
          width={25}
          height={10} 
          onClick={()=>SetChangeCookie(Language.japanese)}>
        </Image>   : 
        <Image
          alt="한국 국기"
          src="/images/korean.png" 
          className="w-6 h-4 mr-4 cursor-pointer"
          width={10}
          height={10} 
          onClick={()=>SetChangeCookie(Language.korean)}>
        </Image>}
{language !== "english"? 
        <Image
          alt="미국 국기" 
          src="/images/usa.png" 
          className="w-6 h-4 cursor-pointer"
          width={10}
          height={10} 
          onClick={()=>SetChangeCookie(Language.english)}>
        </Image>   : 
        <Image
          alt="한국 국기" 
          src="/images/korean.png" 
          className="w-6 h-4 cursor-pointer"
          width={10}
          height={10} 
          onClick={()=>SetChangeCookie(Language.korean)}>
        </Image>}   
  </div>
)

}

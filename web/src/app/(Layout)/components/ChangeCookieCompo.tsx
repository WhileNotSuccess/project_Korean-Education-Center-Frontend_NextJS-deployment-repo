"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Language } from "../../common/types";
import { useRouter } from "next/navigation";


export default function SetChangeCookieCompo(){
  const [language, setLanguage] = useState<Language>(Language.korean);
  const router = useRouter()

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
        router.push("/");
      } else {
        window.location.reload();
      }
    setLanguage(language)

};

return(
  <div className="flex justify-between">
{language !== "japanese"? 
        <img src="https://kcenter.yju.ac.kr/kr/wp-content/uploads/sites/2/elementor/thumbs/icon_japan-q7f9galj4ssfjegoxfg6mnc9bkh8p7nrwk7v8n74qw.png" 
           className="w-6 h-4 mr-4 cursor-pointer" 
           onClick={()=>SetChangeCookie(Language.japanese)}>
        </img>   : 
        <img src="https://kcenter.yju.ac.kr/jp/wp-content/uploads/sites/4/elementor/thumbs/icon_korean-q7f9pdpd7587rp9jvcucqcso1noz3vqd5j8u8xq4lk.png" 
           className="w-6 h-4 mr-4 cursor-pointer" 
           onClick={()=>SetChangeCookie(Language.korean)}>
        </img>}
{language !== "english"? 
        <img src="https://kcenter.yju.ac.kr/jp/wp-content/uploads/sites/4/elementor/thumbs/icon_english-q7f9qkxxxivelriquvj6x1vvddruxyi0nh96bny0nc.png" 
           className="w-6 h-4 mr-4 cursor-pointer" 
           onClick={()=>SetChangeCookie(Language.english)}>
        </img>   : 
        <img src="https://kcenter.yju.ac.kr/jp/wp-content/uploads/sites/4/elementor/thumbs/icon_korean-q7f9pdpd7587rp9jvcucqcso1noz3vqd5j8u8xq4lk.png" 
           className="w-6 h-4 mr-4 cursor-pointer" 
           onClick={()=>SetChangeCookie(Language.korean)}>
        </img>}   
  </div>
)

}

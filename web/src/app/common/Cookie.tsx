"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

const SetCookie = () => {
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

  return null;
};

export default SetCookie;

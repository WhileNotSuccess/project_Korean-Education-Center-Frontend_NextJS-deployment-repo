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
      });
    }
  }, []);

  return null;
};

export default SetCookie;

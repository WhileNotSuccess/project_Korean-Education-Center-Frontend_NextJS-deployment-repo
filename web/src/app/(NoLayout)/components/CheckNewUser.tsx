"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // js-cookie import

const CheckNewUser = () => {
  const router = useRouter();

  useEffect(() => {
    // js-cookie를 통해 'new_user' 쿠키 값을 가져옴

    const newUserValue = Cookies.get("new_user") || false;

    // 만약 'new_user' 쿠키가 "true"라면 /register 페이지로 리다이렉트

    if (newUserValue === "true") {
      router.push(`/register`);
    }
  }, [router]);

  return null;
};

export default CheckNewUser;

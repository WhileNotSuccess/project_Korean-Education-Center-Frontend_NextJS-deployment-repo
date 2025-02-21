"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/app/lib/customFetch";

const CheckAdmin = () => {
  const router = useRouter();
  const fetch = useCustomFetch();
  useEffect(() => {
    async function check() {
      const response = await fetch("/users");
      if (response && !response.result) {
        console.log(response);
        alert("잘못된 접근입니다.");
        router.push("/");
      }
    }
    check();
  }, []);

  return null;
};

export default CheckAdmin;

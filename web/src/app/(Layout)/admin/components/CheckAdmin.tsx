"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/app/lib/customFetch";
import { CheckAdminAlert } from "@/app/menu";
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";

const CheckAdmin = () => {
  const router = useRouter();
  const fetch = useCustomFetch();

  
  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
   
    async function check() {
      const response = await fetch("/users");
      if (response && !response.result) {

        alert(CheckAdminAlert[savedLanguage].noPermission);
        router.push("/");
      }
    }
    check();
  }, []);

  return null;
};

export default CheckAdmin;

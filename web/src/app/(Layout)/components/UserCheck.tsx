'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";
import { CheckUserAlert } from "@/app/menu";
import useCustomFetch from "@/app/lib/customFetch";

export default function UserCheck() {

    const router = useRouter();
    const fetch = useCustomFetch();

    useEffect(() => {

        const savedLanguage = Cookies.get("language") as Language;
            
          async function check() {
                const response = await fetch("/users/info");
                if (response && !response.id) {
          
                  alert(CheckUserAlert[savedLanguage].noPermission);
                  router.push("/");
                }
              }
              check();
            }, []);

      return null
}

"use client";

import Link from "next/link";
import { useAuth } from "@/app/hook/auth";
import { LoginCompoMenu } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function LoginCompo() {
  const { user } = useAuth();
    const language: Language = (Cookies.get("language") as Language) || "korean";

  return (
    <section>
      {!user ? (
         <Link href={"/login"} className="text-white font-bold hover:underline">{LoginCompoMenu[language].Login}</Link>
      ) : (
        <Link href={"/dashboard"} className="text-white font-bold hover:underline">&nbsp;&nbsp; {user.name}님</Link>
      )}
    </section>
  );
}

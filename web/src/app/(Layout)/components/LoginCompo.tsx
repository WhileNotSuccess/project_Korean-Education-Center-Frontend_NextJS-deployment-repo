"use client";

import Link from "next/link";
import { useAuth } from "@/app/hook/auth";

export default function LoginCompo() {
  const { user } = useAuth();

  return (
    <div>
      {!user ? (
         <Link href={"/login"} className="text-white font-bold hover:underline">로그인</Link>
      ) : (
        <Link href={"/dashboard"}>&nbsp;&nbsp; 환영합니다! {user.name}님</Link>
      )}
    </div>
  );
}

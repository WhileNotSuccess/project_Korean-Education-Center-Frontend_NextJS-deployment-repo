"use client";

import Link from "next/link";
import { useAuth } from "@/app/hook/auth";

export default function LoginCompo() {
  const { user } = useAuth();

  return (
    <div>
      <Link href={"/"}>메인</Link>
      {!user ? (
        <Link href={"/login"}>로그인</Link>
      ) : (
        <Link href={"/dashboard"}>&nbsp;&nbsp; 환영합니다! {user.name}님</Link>
      )}
    </div>
  );
}

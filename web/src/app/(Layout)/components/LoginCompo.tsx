'use client';

import Link from "next/link";
import { useAuth } from "@/app/hook/auth";

export default function LoginCompo( {authToken}: {authToken: string}) {

    const {logout} = useAuth()

    return (
    <div>
         <Link href={"/"}>메인</Link>
        { !authToken ? 
        <Link href={"/login"}>로그인</Link>
        : <button onClick={logout}>로그아웃</button> 
        }
    </div>
       
    )
}
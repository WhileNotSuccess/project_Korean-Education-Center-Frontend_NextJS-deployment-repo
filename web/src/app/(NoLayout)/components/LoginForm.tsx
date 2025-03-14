"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCustomFetch from "../../lib/customFetch";
import { useAuth } from "@/app/hook/auth";
import { LoginCompoMenu } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import Image from "next/image";


export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();
  const { login } = useAuth();
  const [language, setLanguage] = useState<Language>(Language.korean);


  useEffect(() => {
    async function userCheck() {

      if (user) {
        
        router.push("/")
        return null
      }
    }
    userCheck();

    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  
    
  }, []);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };
    await login(payload, setError);
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
  };

  return (
    <main
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        height: "100vh",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <section className="relative bg-transparent  rounded-lg shadow-lg w-full max-w-md">
        <header className=" mb-6">
          <h1 className="text-3xl font-extrabold text-blue-600">LOGIN</h1>
          <p className="text-lg mb-6 text-white whitespace-nowrap">
            {LoginCompoMenu[language].welcome}
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="w-full flex justify-between space-x-4">
            <div className="w-96 flex  flex-col justify-center space-y-2">
              <input
                type="email"
                placeholder={LoginCompoMenu[language].inputId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeydown}
                className="w-full p-2 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="password"
                placeholder={LoginCompoMenu[language].inputPassWord}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeydown}
                className="w-full p-2 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <div
              className="w-24 h-24 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer flex justify-center items-center"
              onClick={handleSubmit}
            >
              {LoginCompoMenu[language].Login}
            </div>
          </div>
        </form>
        <section className="mt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-[#F2F2F2] rounded-lg font-semibold mt-2 flex justify-center"
          >
            <Image 
            src="/images/loginTab.png" 
            alt=""
            width={200}
            height={40} 
            className="" />
          </button>
          <button
            type="button"
            onClick={() => router.push("/agree-terms")}
            className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold mt-2"
          >
            {LoginCompoMenu[language].register}
          </button>
        </section>
        <div className="font-bold text-red-500">{error}</div>
      </section>
    </main>
  );
}

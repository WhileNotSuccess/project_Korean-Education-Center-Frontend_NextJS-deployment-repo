"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "../../lib/customFetch";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { RegisterCompoMenu, serverError } from "@/app/menu";
import { Language } from "@/app/common/types";
import AlertModal from "./AlertModal";
import Image from "next/image";

export default function RegisterCompo() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [language, setLanguage] = useState<Language>(Language.korean);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const customFetch = useCustomFetch();

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const newUser = Cookies.get("new_user") === "true"; // 쿠키값이 "true"일 경우 newUser가 true가 됩니다.

  const handleGoogleRegister = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newUser) {
      try {
        const data = await customFetch("/users/name", {
          method: "PATCH",
          body: JSON.stringify({ name }),
        });

        if (data.error) {
          setError(RegisterCompoMenu[language].nameChangeError);
        } else {
          setMessage(RegisterCompoMenu[language].nameChangeComplete);
          router.push("/");
        }
      } catch (err) {
        setError(serverError[language].server);
      }
    } else {
      // 일반 회원가입 로직 (new_user 쿠키가 없을 경우)
      const payload = { email, password, name };

      try {
        const data = await customFetch("/auth/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (data.error) {
          setError(RegisterCompoMenu[language].registerError);
        } else {
          window.location.href = "/";
          // setMessage(RegisterCompoMenu[language].registerComplete);
          // setIsOpen(true);
        }
      } catch (err) {
        setError(serverError[language].server);
      }
    }
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
      <section className="relative bg-transparent rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-white text-center">
          {newUser
            ? RegisterCompoMenu[language].googleRegister
            : RegisterCompoMenu[language].register}
        </h1>

        {error && (
          <p style={{ color: "red" }} className="text-center text-xl font-bold">
            {error}
          </p>
        )}
        {message && (
          <AlertModal
            message={message}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}

        {newUser ? (
          <form onSubmit={handleSubmit} className="space-y-4 px-4 py-6">
            <div className="text-white">
              {RegisterCompoMenu[language].inputName}
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder={RegisterCompoMenu[language].namePlaceHolder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold mt-4"
            >
              {RegisterCompoMenu[language].nameChange}
            </button>
          </form>
        ) : (
          // 일반 회원가입 폼
          <form onSubmit={handleSubmit} className="space-y-4 px-4 py-6">
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder={RegisterCompoMenu[language].emailPlaceHolder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="password"
                placeholder={RegisterCompoMenu[language].passWordPlaceHolder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="text"
                placeholder={RegisterCompoMenu[language].namePlaceHolder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold mt-4"
            >
              {RegisterCompoMenu[language].register}
            </button>

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full bg-[#F2F2F2] rounded-lg font-semibold mt-2 flex justify-center"
            >
              <Image 
              src="/images/signup.png" 
              alt="구글로그인 회원가입 버튼"
              width={200}
              height={40} 
              className="border-none" />
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

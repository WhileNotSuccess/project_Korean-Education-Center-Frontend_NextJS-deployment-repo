"use client";

import { useState, useEffect } from "react";
import {
  counselingForm,
  counselingPageMenu,
  FormComponentMenu,
  serverError,
} from "@/app/menu";
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";

export default function FormComponent() {
  const [language, setLanguage] = useState<Language>(Language.korean);
  const customFetch = useCustomFetch();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    date: "",
    name: "",
  });
  const [isDate, setIsDate] = useState(false);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [language]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: formatPhoneNumber(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const localDate = new Date(formData.date);
    const utcDate = new Date(localDate.getTime());

    // 서버에 보낼 데이터를 객체로 묶음
    const requestData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      schedule: utcDate.toISOString(),
    };

    try {
      console.log(requestData);
      const response = await customFetch("/consult", {
        method: "POST",
        body: JSON.stringify(requestData),
      });

      if (!response.error) {
        alert(FormComponentMenu[language].applicationSuccess);
        window.location.href = "/";
      } else {
        alert(FormComponentMenu[language].applicationFail);
      }
    } catch (error) {
      console.error(error);
      alert(serverError[language].server);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  return (
    <main className="w-full flex flex-col items-center">
      {/* 상담 신청 제목 */}
      <header className="w-full flex justify-center items-center font-bold text-3xl mt-12">
        {counselingForm[language]?.counseling}
      </header>

      {/* 상담 안내글 */}
      <section className="w-full max-w-lg p-4 bg-blue-100 rounded-md shadow-md border border-blue-300 mt-8 mb-6 text-lg font-semibold text-blue-700 text-center">
        {counselingPageMenu[language]["counseling-guide"]}
      </section>

      {/* 상담 신청 폼 */}
      <section className="w-full p-8 bg-white rounded-lg shadow-lg border-2 border-blue-300 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className=" text-lg font-bold mb-2 text-blue-700"
            >
              {counselingPageMenu[language]["name"]}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className=" text-lg font-bold mb-2 text-blue-700"
            >
              {counselingPageMenu[language]["phone"]}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className=" text-lg font-bold mb-2 text-blue-700"
            >
              {counselingPageMenu[language]["email"]}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="date"
              className=" text-lg font-bold mb-2 text-blue-700"
            >
              {counselingPageMenu[language]["date"]}
            </label>
            <div className="relative"></div>
            <input 
              lang="en"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onFocus={() => setIsDate(true)}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              
            />
            
          </div>

          <button
            type="submit"
            className="mt-6 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {counselingPageMenu[language]["save"]}
          </button>
        </form>
      </section>
    </main>
  );
}

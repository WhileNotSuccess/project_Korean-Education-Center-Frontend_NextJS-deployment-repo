"use client";

import {Language, Teacher } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import { staffPage, getError, smallMenu } from "@/app/menu";
import Cookies from "js-cookie";
import Image from "next/image";

type StaffPageProps = {
  name: keyof (typeof smallMenu)[Language];
};

export default function StaffIntro({ name }: StaffPageProps) {
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Teacher[]>([]);
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const staffData = async () => {
      try {
        const response = await customFetch("/staff", {
          method: "GET",
        });
        const data = await response.json()
        setTeacher(data.teacher);
        setStaff(data.staff);
      } catch (error) {
        alert(getError[language]?.staffError);
      }
    };
    staffData();
  }, [language]);

  return (
    <div className="w-full">

      {/* 페이지 헤더 */}
      <header className="h-12 border-b"></header>

      {/* 타이틀 */}
      <section 
        className="w-full flex justify-center items-center font-bold lg:text-3xl h-[200px]">
        {smallMenu[language]?.[name]}
      </section>

      {/* 강사진 */}
      <section className="w-full">
        <div className="w-full flex justify-center mb-6">
          <div className="w-4/5 border-b border-gray-300 pb-2 text-xl lg:text-2xl">
            {staffPage[language]?.faculty}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <ul className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {teacher.map((item) => (
              <li
                key={item.id}
                className="text-[#0072BA] border-t-2 border-b-2 border-[#0072BA] px-4 py-3"
              >
                <div className="text-sm">강사</div>
                <div className="font-bold text-md mt-1">{item.name}</div>
                <div className="text-sm text-gray-700 mt-1">
                  한국어 교육센터
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 직원 */}
      <section className="w-full mt-16">
        <div className="w-full flex justify-center mb-6">
          <div className="w-4/5 border-b border-gray-300 pb-2 text-xl lg:text-2xl">
            {staffPage[language]?.staff}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <ul className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {staff.map((item) => (
              <li
                key={item.id}
                className="border border-[#A6CAEC] text-[#0072BA]"
              >
                <div className="border-b border-[#0072BA] px-3 py-2 font-bold">
                  {item.name}
                </div>

                <div className="px-3 py-3 text-sm space-y-2">
                  <div>{item.position}</div>

                  <div className="flex items-center font-bold">
                    <Image
                      alt="전화기 아이콘"
                      src="/images/telephone.png"
                      width={15}
                      height={15}
                      className="mr-2"
                    />
                    {item.phone}
                  </div>

                  <div className="flex items-center font-bold break-all">
                    <Image
                      alt="이메일 아이콘"
                      src="/images/mail.png"
                      width={15}
                      height={15}
                      className="mr-2"
                    />
                    {item.email}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
"use client";

import {Language, Teacher } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import { staffPage, getError, smallMenu } from "@/app/menu";
import Cookies from "js-cookie";
import Image from "next/image";
import SubtitleHeader from "./SubtitleHeader";

type StaffPageProps = {
  name: keyof (typeof smallMenu)[Language];
};

export default function StaffIntro({ name }: StaffPageProps) {
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Teacher[]>([]);
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);

  // 언어 별 강사 및 교직원 직책 번역
  const teacherLabel =
    language === Language.korean
      ? "강사"
      : language === Language.english
      ? "Teacher"
      : "講師";

  const positionLabelMap: Record<Language, Record<string, string>> = {
    korean: {
      원장: "원장",
      교수: "교수",
      직원: "직원",
      조교: "조교",
    },
    english: {
      원장: "Director",
      교수: "Professor",
      직원: "Staff",
      조교: "Teaching Assistant",
    },
    japanese: {
      원장: "センター長",
      교수: "教授",
      직원: "職員",
      조교: "助教",
    },
  };

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
  }, []);

  return (
    <div className="w-full">

      {/* 타이틀 */}
      <SubtitleHeader title={smallMenu[language]?.[name]} />

      {/* 강사진 */}
      <section className="w-full">
        <div className="w-full flex justify-center mb-6">
          <div className="w-4/5 border-b border-gray-300 pb-2 text-xl lg:text-2xl font-medium">
            {staffPage[language]?.faculty}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <ul className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {teacher.map((item) => (
              <li
                key={item.id}
                className="border-b border-[#0072BA]/50 pb-5"
              >
                {/* 직책 */}
                <div className="text-md text-gray-700">
                  {teacherLabel}
                </div>

                {/* 이름 */}
                <div className="font-bold text-lg text-[#005999] mt-2">
                  {item.name}
                </div>

                {/* 소속 */}
                <div className="text-md text-gray-700 mt-1">
                  {staffPage[language]?.dept}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 직원 */}
      <section className="w-full mt-20">
        <div className="w-full flex justify-center mb-6">
          <div className="w-4/5 border-b border-gray-300 pb-2 text-xl lg:text-2xl font-medium">
            {staffPage[language]?.staff}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <ul className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {staff.map((item) => (
              <li
                key={item.id}
                className="border-b border-[#0072BA]/50 pb-6"
              >
                {/* 직책 */}
                <div className="text-md text-gray-700">
                  {positionLabelMap[language]?.[item.position] ?? item.position}
                </div>

                {/* 이름 */}
                <div className="font-bold text-lg text-[#005999] mt-1">
                  {item.name}
                </div>

                {/* 연락처 */}
                <div className="mt-3 space-y-2 text-md text-gray-700">
                  {item.phone && (
                    <div className="flex items-center">
                      <Image
                        alt="전화기 아이콘"
                        src="/images/telephone.png"
                        width={14}
                        height={14}
                        className="mr-2 opacity-70"
                      />
                      {item.phone}
                    </div>
                  )}

                  {item.email && (
                    <div className="flex items-center break-all">
                      <Image
                        alt="이메일 아이콘"
                        src="/images/mail.png"
                        width={14}
                        height={14}
                        className="mr-2 opacity-70"
                      />
                      {item.email}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
"use client";

import {Language, Teacher } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import { staffPage, getError, smallMenu } from "@/app/menu";
import Cookies from "js-cookie";

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
        const data = await customFetch("/staff", {
          method: "GET",
        });
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
      <header className="h-12 border"></header>
      <section
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
        {smallMenu[language]?.[name]}
      </section>
      
      <section className="w-full">
      <div className="w-full h-24 flex items-center justify-center">
        <div className=" h-14 text-2xl font-bold w-4/5 border-b-2  border-[#0072BA] text-[#0093EE]">
          {staffPage[language]?.faculty}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <ul className="w-4/5 flex flex-wrap justify-evenly mt-4">
          {teacher.map((item) => {
            return (
              <li
                key={item.id}
                className="w-64 h-24 border-2 border-[#A6CAEC] mb-4 text-[#0093EE]"
              >
                <div className="font-bold border-b-2 border-[#0072BA] pl-2 h-8 flex flex-col justify-center">
                  {item.name}
                </div>
                <div className="ml-2">강사</div>
              </li>
            );
          })}
        </ul>
      </div>
      </section>
    <section className="w-full mt-6">
      <div className="w-full h-24 flex items-center justify-center">
        <div className=" h-14 text-2xl font-bold w-4/5 border-b-2  border-[#0072BA] text-[#0093EE]">
          {staffPage[language]?.staff}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <ul className="w-4/5 flex flex-wrap justify-evenly mt-4">
          {staff.map((item) => {
            return (
              <li
                key={item.id}
                className="w-52 h-40 border-2 border-[#A6CAEC] mb-4 text-[#0093EE]"
              >
                <div className="border-b-2 border-[#0072BA] font-bold h-8 flex flex-col justify-center pl-2">
                  {item.name}
                </div>
                <div className=" flex flex-col justify-center">
                  <div className="h-8 ml-2">{item.position}</div>
                  <div className="h-8 ml-2 font-bold flex flex-row items-center">
                    <img src="/images/telephone.png" className="h-4 w-4 mr-2" />{" "}
                    {item.phone}
                  </div>
                  <div className="h-8 ml-2 font-bold flex flex-row items-center overflow-hidden">
                    <img src="/images/mail.png" className="h-4 w-4 mr-2" />
                    {item.email}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      </section>
  </div>
  );
}

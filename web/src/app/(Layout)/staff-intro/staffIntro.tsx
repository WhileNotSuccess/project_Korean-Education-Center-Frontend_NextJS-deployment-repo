"use client";

import { HtmlDocsProps } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import { staffPage, getError } from "@/app/menu";

interface Teacher {
  id: number;
  name: string;
  position: string;
  phone: string | null;
  email: string | null;
}

export default function StaffIntro({ category }: HtmlDocsProps) {
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Teacher[]>([]);
  const customFetch = useCustomFetch();

  useEffect(() => {
    const staffData = async () => {
      try {
        const data = await customFetch("/staff", {
          method: "GET",
        });
        setTeacher(data.teacher);
        setStaff(data.staff);
      } catch (error) {
        alert(getError["korean"]?.staffError);
        console.error(getError["korean"]?.staffError);
      }
    };
    staffData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="h-12 border"></div>
      <div
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
        {category}
      </div>
      <div className="w-full h-24 flex items-center justify-center">
        <div className=" h-14 text-2xl font-bold w-4/5 border-b-2  border-[#0072BA] text-[#0093EE]">
          {staffPage["korean"]?.faculty}
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-evenly mt-4">
        {teacher.map((item) => {
          return (
            <div
              key={item.id}
              className="w-52 h-24 border-2 border-[#A6CAEC] mb-4 text-[#0093EE]"
            >
              <div className="font-bold border-b-2 border-[#0072BA] pl-2 h-8 flex flex-col justify-center">
                {item.name}
              </div>
              <div className="ml-2">{item.position}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full h-24 flex items-center justify-center mt-6">
        <div className=" h-14 text-2xl font-bold w-4/5 border-b-2  border-[#0072BA] text-[#0093EE]">
          {staffPage["korean"]?.staff}
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-evenly mt-4">
        {staff.map((item) => {
          return (
            <div
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
                <div className="h-8 ml-2 font-bold flex flex-row items-center">
                  <img src="/images/mail.png" className="h-4 w-4 mr-2" />
                  {item.email}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

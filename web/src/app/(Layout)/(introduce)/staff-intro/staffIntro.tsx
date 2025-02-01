'use client'

import useCustomFetch from "@/app/lib/customFetch"
import { useEffect, useState } from "react"



type HtmlDocsProps = {
  name : string
}

interface Teacher {
  id: number;
  name: string;
  position: string;
  phone: string | null;
  email: string | null;
}

export default function StaffIntro({ name }: HtmlDocsProps) {  
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Teacher[]>([]);
  const customFetch = useCustomFetch();

  useEffect(() => {
    const staffData = async () => {
      try {
        const data = await customFetch('/staff', { method: "GET" });
        setTeacher(data.teacher || []);
        setStaff(data.staff || []);
      } catch (error) {
        console.error('강사 및 교직원 정보를 불러오지 못했습니다.');
      }
    };
    staffData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="h-12 border"></div>
      <div className="w-full flex justify-center items-center font-bold text-3xl" style={{ height: "200px" }}>
        {name}  
      </div>
    </div>
  );
}

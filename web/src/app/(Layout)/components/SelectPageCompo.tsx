  'use client'

  import {useEffect, useState } from "react";
  import useCustomFetch from "@/app/lib/customFetch";
  import { selectMenu } from "@/app/menu";
  import parser from "html-react-parser";
  import { Language } from "@/app/common/types";
  import Cookies from "js-cookie";

  type SelectTabProps = {
    categoryTab: Record<Language, {key: string; value: string}[]> // 세부 카테고리
    name: keyof typeof selectMenu["korean"];
  };

  export default function SelectTabComponent({ name, categoryTab }: SelectTabProps) {
    const customFetch = useCustomFetch();
    const [content, setContent] = useState<string>(" ");
    const language: Language = (Cookies.get("language") as Language) || "korean";
    const [selectedTab, setSelectedTab] = useState<string>("");

    useEffect(() => {
      if (categoryTab && categoryTab[language]?.[0]?.key.length > 0) { // tabkeys에 값이 있을 경우에 가져옴
        setSelectedTab(categoryTab[language]?.[0]?.key); // 첫 번째 탭을 기본으로 설정
      }
    }, [categoryTab]);

    // 비동기 데이터 요청
    useEffect(() => {
      if (selectedTab) {
      const fetchData = async () => {
        try {
          const data = await customFetch(`/posts?category=${selectedTab}`, {
            method: "GET",
          });
          setContent(data.data.content);
        } catch (error) {
          alert(`${selectMenu[language]?.[name]}의 글을 불러올 수 없습니다`);
          console.error("해당 게시글을 불러올 수 없습니다.");
        }
      };

      fetchData();
    }
    }, [selectedTab, name, categoryTab]);

    return (
      <div className="w-full h-screen">
        {/* 카테고리 제목 표시 */}
        <div className="h-12 border-b flex items-center justify-center mb-4">
          <div className="text-3xl font-bold">
            {selectMenu["korean"]?.[name]}
          </div>
        </div>
        <div className=" w-3/5 mx-auto">
        {/* 탭 메뉴 */}
        <div className="flex justify-center gap-1 p-4">
    {categoryTab[language].map((item) => (
      <button
        key={item.key}
        className={`py-2 px-4 text-base font-medium text-center border transition w-40 ${
          selectedTab === item.key ? "bg-blue-500 text-white font-black" : "bg-sky-500/50 text-white font-black"
        }`}
        onClick={() => setSelectedTab(item.key)}
      >
        {item.value}
      </button>
    ))}
  </div>


        </div>

        {/* 내용 표시 */}
        <div className="w-full flex justify-center mt-8">
          {selectedTab!=="upload-documents" ? <div className="w-3/5  p-4">{typeof content === "string" ? parser(content) : "내용을 불러올 수 없습니다."}</div>
          : <div className="w-3/5  p-4 border">

            </div>}
          
        </div>
      </div>
    );
  }

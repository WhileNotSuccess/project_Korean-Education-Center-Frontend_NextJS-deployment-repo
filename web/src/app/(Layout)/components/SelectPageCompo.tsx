// [SelectPageCompo]
// Select 컴포넌트(ex: 한국어교육과정 - 개요 / 프로그램 샘플)가 포함된 페이지의 컨텐츠를 렌더링하는 컴포넌트입니다.

"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { selectMenu, SelectPageCompoMenu } from "@/app/menu";
import parser from "html-react-parser";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import SubtitleHeader from "./SubtitleHeader";

type SelectTabProps = {
  categoryTab: Record<Language, { key: string; value: string }[]>; // 세부 카테고리
  name: keyof (typeof selectMenu)[Language];
};

export default function SelectTabComponent({
  name,
  categoryTab,
}: SelectTabProps) {
  const customFetch = useCustomFetch();
  const [content, setContent] = useState<string>(" ");
  const [selectedTab, setSelectedTab] = useState<string>(""); // 선택된 탭
  const [language, setLanguage] = useState<Language>(Language.korean);
  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (categoryTab && categoryTab[language]?.[0]?.key.length > 0) {
      // tab keys에 값이 있을 경우에 가져옴
      setSelectedTab(categoryTab[language]?.[0]?.key); // 첫 번째 탭을 기본으로 설정
    }
  }, [categoryTab]);

  // 비동기 데이터 요청
  useEffect(() => {
    if (selectedTab && selectedTab !== "upload-documents") {
      const fetchData = async () => {
        try {
          const response = await customFetch(`/posts?category=${selectedTab}`, {
            method: "GET",
          });
          const data = await response.json()
          setContent(data.data.content);
        } catch (error) {
          alert(SelectPageCompoMenu[language].failLoadPosts);
          console.error(SelectPageCompoMenu[language].failLoadPosts);
        }
      };

      fetchData();
    }
  }, [selectedTab, name, categoryTab]); 

  return (
    <main className="w-full">
      {/* 카테고리 제목 표시 */}
      <SubtitleHeader title={selectMenu[language]?.[name]} />
      
      <div className="w-full px-4 xl:w-3/5 mx-auto">
        {/* 탭 메뉴 */}
        <nav className="flex justify-center gap-1 p-4">
          {categoryTab[language].map((item) => (
            <button
              key={item.key}
              className={`py-2 px-4 text-nowrap text-base font-medium text-center border transition w-40 flex-grow ${
                selectedTab === item.key
                  ? "bg-blue-500 text-white font-black"
                  : "bg-sky-500/50 text-white font-black"
              }`}
              onClick={() => setSelectedTab(item.key)}
            >
              {item.value}
            </button>
          ))}
        </nav>
      </div>

      {/* 내용 표시 */}
      <section className="w-full flex justify-center mt-8">
          <article className="w-5/6 2xl:w-3/5 px-4">
            {typeof content === "string"
              ? parser(content)
              : SelectPageCompoMenu[language].failLoadContent}
          </article>
      </section>
    </main>
  );
}
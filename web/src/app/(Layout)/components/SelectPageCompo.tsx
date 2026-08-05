// [SelectPageCompo]
// Select 컴포넌트(ex: 한국어교육과정 - 개요 / 학사일정)가 포함된 페이지의 컨텐츠를 렌더링하는 컴포넌트입니다.

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

  // 오픈캠퍼스 통합용 상태
  const [purposeContent, setPurposeContent] = useState<string>("");
  const [contentContent, setContentContent] = useState<string>("");
  const [scheduleContent, setScheduleContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  // 비동기 데이터 요청 (일반 탭용)
  useEffect(() => {
    if (selectedTab && selectedTab !== "upload-documents" && name !== "open-campus") {
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

  // 오픈캠퍼스 전체 콘텐츠 동시 요청
  useEffect(() => {
    if (name === "open-campus") {
      const fetchAllOpenCampus = async () => {
        setLoading(true);
        try {
          const [purposeRes, contentRes, scheduleRes] = await Promise.all([
            customFetch(`/posts?category=opencampus-purpose`, { method: "GET" }),
            customFetch(`/posts?category=opencampus-content`, { method: "GET" }),
            customFetch(`/posts?category=opencampus-schedule`, { method: "GET" }),
          ]);

          const [purposeData, contentData, scheduleData] = await Promise.all([
            purposeRes.json(),
            contentRes.json(),
            scheduleRes.json(),
          ]);

          setPurposeContent(purposeData?.data?.content || "");
          setContentContent(contentData?.data?.content || "");
          setScheduleContent(scheduleData?.data?.content || "");
        } catch (error) {
          console.error("Failed to load open-campus content", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAllOpenCampus();
    }
  }, [name, language]);

  return (
    <main className="w-full pb-20">
      {/* 카테고리 제목 표시 */}
      <SubtitleHeader title={selectMenu[language]?.[name]} />

      {name === "open-campus" ? (
        <div className="w-full flex flex-col items-center px-4 md:px-8 py-4 gap-8">
          {loading ? (
            <div className="flex flex-col items-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm font-medium">
                {language === Language.korean ? "콘텐츠를 불러오는 중입니다..." : language === Language.japanese ? "コンテンツを読み込んでいます..." : "Loading content..."}
              </p>
            </div>
          ) : (
            <div className="w-full max-w-4xl flex flex-col gap-10">
              {/* Card 1: 목적 (Purpose) */}
              {purposeContent && (
                <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                    <span className="w-1.5 h-6 bg-[#0D578D] rounded-sm"></span>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                      {language === Language.korean ? "과정 목적" : language === Language.japanese ? "課程の目的" : "Program Purpose"}
                    </h2>
                  </div>
                  <div className="text-slate-700 leading-relaxed parsed-html">
                    {parser(purposeContent)}
                  </div>
                </div>
              )}

              {/* Card 2: 일정 및 내용 (Schedule & Content) */}
              {contentContent && (
                <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                    <span className="w-1.5 h-6 bg-[#0D578D] rounded-sm"></span>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                      {language === Language.korean ? "일정 및 내용" : language === Language.japanese ? "日程と内容" : "Schedule & Content"}
                    </h2>
                  </div>
                  <div className="text-slate-700 leading-relaxed parsed-html">
                    {parser(contentContent)}
                  </div>
                </div>
              )}

              {/* Card 3: 스케쥴 (Timetable) */}
              {scheduleContent && (
                <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-100">
                    <span className="w-1.5 h-6 bg-[#0D578D] rounded-sm"></span>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                      {language === Language.korean ? "스케쥴" : language === Language.japanese ? "スケジュール" : "Timetable"}
                    </h2>
                  </div>
                  <div className="text-slate-700 leading-relaxed parsed-html">
                    {parser(scheduleContent)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
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
            <article className="w-5/6 2xl:w-3/5 px-4 parsed-html">
              {typeof content === "string"
                ? parser(content)
                : SelectPageCompoMenu[language].failLoadContent}
            </article>
          </section>
        </>
      )}
    </main>
  );
}
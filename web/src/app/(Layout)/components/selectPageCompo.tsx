'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { smallMenu } from "@/app/menu";
import parser from "html-react-parser";
import { koreanCurriculumMenu } from "@/app/menu";

type SelectTabProps = {
  tabKeys: { [key: string]: string };
  name: keyof typeof smallMenu["korean"];
};

export default function SelectTabComponent({ name, tabKeys }: SelectTabProps) {
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const [content, setContent] = useState<string>("");

  const customFetch = useCustomFetch();
  const language = "korean"; // 로컬스토리지에서 가져오는 코드로 변경해야 함

  useEffect(() => {
    if (tabKeys && Object.keys(tabKeys).length > 0) {
      setSelectedTab(Object.keys(tabKeys)[0]); // 첫 번째 탭을 기본으로 설정
    }
  }, [tabKeys]);

  // 비동기 데이터 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customFetch(`/posts?category=${selectedTab}`, {
          method: "GET",
        });
        setContent(data.data.content);
      } catch (error) {
        alert(`${smallMenu[language]?.[name]}의 글을 불러올 수 없습니다`);
        console.error("해당 게시글을 불러올 수 없습니다.");
      }
    };

    fetchData();
  }, [selectedTab, name, tabKeys]);

  return (
    <div className="w-full h-screen">
       {/* 카테고리 제목 표시 */}
      <div className="h-12 border-b flex items-center justify-center">
        <div className="text-3xl font-bold">
          {smallMenu["korean"]?.[name]}
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="w-3/5 mx-auto grid grid-cols-4 gap-x-1 gap-y-1 p-2">
        {Object.entries(tabKeys).map(([key, label]) => (
          <button
            key={key}
            className={`py-2 text-base font-medium text-center border rounded-md transition ${
              selectedTab === key ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedTab(key)} // 상태 업데이트
          >
            {label}
          </button>
        ))}
      </div>

      {/* 내용 표시 */}
      <div className="w-full flex justify-center mt-8">
        <div className="w-3/5 border p-4">{parser(content)}</div>
      </div>
    </div>
  );
}

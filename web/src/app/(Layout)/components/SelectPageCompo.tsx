"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import useCustomFormFetch from "@/app/lib/customFormFetch";
import { selectMenu, postSuccess } from "@/app/menu";
import parser from "html-react-parser";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { handleFileChange, addDeleteFileName } from "../../common/formFile";

type SelectTabProps = {
  categoryTab: Record<Language, { key: string; value: string }[]>; // 세부 카테고리
  name: keyof (typeof selectMenu)[Language];
};

export default function SelectTabComponent({
  name,
  categoryTab,
}: SelectTabProps) {
  const customFetch = useCustomFetch();
  const customFormFetch = useCustomFormFetch();
  const [content, setContent] = useState<string>(" ");
  const language: Language = (Cookies.get("language") as Language) || "korean";
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [file, setFile] = useState<Array<File>>([]);
  const [documentFileNames, setDocumentFileNames] = useState<Array<string>>([]); // 파일 이름 리스트
  const [aplicationName, setAplicationName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(""); // 기본값 설정
  const [deleteFileNames, setDeleteFileNames] = useState<Array<string>>([]); // 삭제할 파일 이름 리스트
  const [courseOptions, setCourseOptions] = useState<Array<{ course: string }>>(
    [
      // 하드코딩된 과정 옵션
      { course: "지원과정 1" },
      { course: "지원과정 2" },
      { course: "지원과정 3" },
    ]
  ); // 지원과정 목록 추가시 삭제 예정

  useEffect(() => {
    if (categoryTab && categoryTab[language]?.[0]?.key.length > 0) {
      // tabkeys에 값이 있을 경우에 가져옴
      setSelectedTab(categoryTab[language]?.[0]?.key); // 첫 번째 탭을 기본으로 설정
    }
  }, [categoryTab]);

  // 비동기 데이터 요청
  useEffect(() => {
    if (selectedTab && selectedTab !== "upload-documents") {
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

    /* const fetchCourseOptions = async () => { // 지원과정 불러오는 함수 (지원과정 추가 시 넣을 예정)
      try {
        const data = await customFetch("/course-options", { // 해당 API 경로를 사용할 수 있는 주소로 수정
          method: "GET",
        });
    
        setCourseOptions(data.options);
      } catch (error) {
        console.error("지원과정 목록을 불러올 수 없습니다.", error);
      }
    };

    fetchCourseOptions(); */
  }, [selectedTab, name, categoryTab]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(file.length);
    const formData = new FormData();
    file.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("course", selectedCourse); // 선택된 과정 값 전달
    try {
      const response = await customFormFetch("/application-form", {
        method: "POST",
        body: formData,
      });
      alert(postSuccess[language]?.appliedPost);
    } catch (error) {
      console.error("폼 제출 실패", error);
    }
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value); // 지원 과정 변경
  };

  return (
    <main className="w-full h-screen">
      {/* 카테고리 제목 표시 */}
      <header className="h-12 border-b flex items-center justify-center mb-4">
        <div className="text-3xl font-bold">{selectMenu[Language]?.[name]}</div>
      </header>
      <div className="w-3/5 mx-auto">
        {/* 탭 메뉴 */}
        <nav className="flex justify-center gap-1 p-4">
          {categoryTab[language].map((item) => (
            <button
              key={item.key}
              className={`py-2 px-4 text-base font-medium text-center border transition w-40 ${
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
        {selectedTab !== "upload-documents" ? (
          <article className="w-3/5 p-4">
            {typeof content === "string"
              ? parser(content)
              : "내용을 불러올 수 없습니다."}
          </article>
        ) : (
          <section className="w-3/5 p-4 border">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      setFile,
                      setDocumentFileNames,
                      setDeleteFileNames
                    )
                  }
                  className="mt-2"
                  multiple
                />
                <ul>
                  {documentFileNames &&
                    documentFileNames.map((fileName, index) => (
                      <div
                        key={index}
                        className={`w-1/3 flex justify-between items-center ${
                          deleteFileNames.includes(fileName) ? "hidden" : ""
                        }`}
                      >
                        <li className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap">
                          {fileName.match(/^\d{8}-\d{6}_/)
                            ? fileName.substring(16)
                            : fileName}
                        </li>
                        <img
                          src="/images/X버튼.png"
                          className="size-4 cursor-pointer"
                          onClick={() =>
                            addDeleteFileName(
                              fileName,
                              setFile,
                              setDocumentFileNames,
                              setDeleteFileNames
                            )
                          }
                        />
                      </div>
                    ))}
                </ul>
              </div>

              <div>
                <textarea
                  id="application-name"
                  name="application-name"
                  value={aplicationName}
                  onChange={(e) => setAplicationName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="pt-1 w-full h-9 border border-gray-300"
                />
              </div>

              <div>
                <select
                  id="course"
                  name="course"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className="mt-2 w-full h-10 text-base border border-gray-300 p-2"
                >
                  {courseOptions.length > 0 ? (
                    courseOptions.map((option, index) => (
                      <option key={index} value={option.course}>
                        {option.course}
                      </option>
                    ))
                  ) : (
                    <option value="">지원과정을 불러오는 중...</option>
                  )}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                제출
              </button>
            </form>
          </section>
        )}
      </section>
    </main>
  );
}

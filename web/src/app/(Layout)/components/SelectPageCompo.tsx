"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import useCustomFormFetch from "@/app/lib/customFormFetch";
import { selectMenu, postSuccess, SelectPageCompoMenu } from "@/app/menu";
import parser from "html-react-parser";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { handleFileChange, addDeleteFileName } from "../../common/formFile";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hook/auth";
import Image from "next/image";

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
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState<string>(" ");
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [file, setFile] = useState<Array<File>>([]);
  const [documentFileNames, setDocumentFileNames] = useState<Array<string>>([]); // 파일 이름 리스트
  const [applicationPhoneNumber, setApplicationPhoneNumber] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(""); // 기본값 설정
  const [deleteFileNames, setDeleteFileNames] = useState<Array<string>>([]); // 삭제할 파일 이름 리스트
  const [courseOptions, setCourseOptions] = useState<
    Array<{ id: number; korean: string; english: string; japanese: string}>
  >([]); // 지원과정 목록
  const [language, setLanguage] = useState<Language>(Language.korean);
  const [userCheck, setUserCheck] = useState<boolean>(false);
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
          const data = await customFetch(`/posts?category=${selectedTab}`, {
            method: "GET",
          });
          setContent(data.data.content);
        } catch (error) {
          alert(SelectPageCompoMenu[language].failLoadPosts);
          console.error(SelectPageCompoMenu[language].failLoadPosts);
        }
      };

      fetchData();
    }

    const fetchCourseOptions = async () => {
      try {
        const data = await customFetch("/course", {
          method: "GET",
        });

        if (data.data && data.data.length > 0) {
          setCourseOptions(data.data); // 강좌 목록 저장
          // 강좌 목록이 로드되면 첫 번째 강좌를 기본 선택으로 설정
          if (!selectedCourse && data.data.length > 0) {
            setSelectedCourse(data.data[0].id.toString()); // 첫 번째 강좌의 id 설정
          }
        } else {
          setCourseOptions([]); // 강좌가 없을 경우 빈 배열
        }
      } catch (error) {
        console.error(SelectPageCompoMenu[language].failLoadCourse);
        setCourseOptions([]); // API 호출 실패 시 빈 배열
      }
    };

    fetchCourseOptions();
  }, [selectedTab, name, categoryTab, selectedCourse]); // selectedCourse를 의존성 배열에 추가

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file.length === 0) {
      alert(SelectPageCompoMenu[language].needFile);
    } else if (applicationPhoneNumber === "") {
      alert(SelectPageCompoMenu[language].needPhoneNumber);
    } else if (selectedCourse === "") {
      alert(SelectPageCompoMenu[language].needCourse);
    } else {
      const formData = new FormData();
      file.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("courseId", selectedCourse); // 선택된 과정 값 전달
      formData.append("phoneNumber", applicationPhoneNumber);
      try {
        const response = await customFormFetch("/application-form", {
          method: "POST",
          body: formData,
        });
        alert(postSuccess[language]?.appliedPost);
        router.push("/");
      } catch (error) {
        console.error("폼 제출 실패", error);
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value); // 지원 과정 변경
  };

  useEffect(() => {
    async function userCheck() {
      if (user) {
        setUserCheck(true);
      }else if (selectedTab === "upload-documents") 
      {
        alert(SelectPageCompoMenu[language].needLogin)
        router.push("/login")
      }
    }
    userCheck();
     
  }, [selectedTab]);

  return (
    <main className="w-full">
      {/* 카테고리 제목 표시 */}
      <header className="h-12 border-b flex items-center justify-center mb-4">
        <div className="text-3xl font-bold">{selectMenu[language]?.[name]}</div>  
      </header>
      <div className="w-3/5 mx-auto">
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
        {selectedTab !== "upload-documents" ? (
          <article className="w-3/5 p-4">
            {typeof content === "string"
              ? parser(content)
              : SelectPageCompoMenu[language].failLoadContent}
          </article>
        ) :
          <section className="w-3/5 p-4 border">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="w-full text-xs  bg-blue-500 text-white p-2 rounded-md mb-10">
                  {SelectPageCompoMenu[language].fileSelect}

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
                  className="hidden"
                  multiple
                />
                </label>
                
                <ul className={documentFileNames.length > 0 ? "border mt-4" : ""}>
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
                        <Image
                          alt="첨부파일 지우는 버튼"
                          src="/images/xbutton.png"
                          width={15}
                          height={15}
                          className="cursor-pointer"
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
                  id="application-phone"
                  name="application-phone"
                  value={applicationPhoneNumber}
                  onChange={(e) =>
                    setApplicationPhoneNumber(formatPhoneNumber(e.target.value))
                  }
                  placeholder={SelectPageCompoMenu[language].inputPhoneNumber}
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
                    courseOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option[language]}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {SelectPageCompoMenu[language].noCourse}
                    </option>
                  )}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                {SelectPageCompoMenu[language].submit}
              </button>
            </form>
          </section>
     
        
        }
      </section>
    </main>
  );
}

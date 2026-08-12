// /guidance 페이지

"use client";
import { useEffect, useState, useRef } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import parser from "html-react-parser";
import Image from "next/image";
import {
  HtmlDocsProps,
  Language,
  ServerDocumentFile,
  UserInfo,
} from "@/app/common/types";
import {
  getError,
  deleteSuccess,
  deleteError,
  editorCompo,
  locationMap,
  guidanceMenu,
} from "../../menu";
import MapCompo from "./MapCompo";
import { useAuth } from "@/app/hook/auth";
import SubtitleHeader from "./SubtitleHeader";

export default function HtmlDocs(props: HtmlDocsProps) {
  const [allData, setAllData] = useState({
    content: "",
    title: "",
    documentFiles: [] as ServerDocumentFile[],
    guidanceId: "",
    author: "",
    createdDate: "",
    userId: 0,
    answer: null as string | null,
    category: "",
  });

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const customFetch = useCustomFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const password = searchParams.get("password") || "";
  const { user } = useAuth();
  const [language, setLanguage] = useState<Language>(Language.korean);
  const isNavigating = useRef(false);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = props.id
          ? `/posts?id=${props.id}`
          : `/posts?category=${props.category}`;
        if (password) {
          endpoint += `&password=${encodeURIComponent(password)}`;
        }
        const response = await customFetch(endpoint, { method: "GET" });
        if (!response.ok) {
          throw new Error("unauthorized");
        }
        const data = await response.json()
        setAllData({
          content: data.data.content,
          title: data.data.title,
          documentFiles: data.files,
          guidanceId: data.data.id || data.data.Id || props.id || "",
          author: data.data.author,
          createdDate: data.data.createdDate,
          userId: data.data.userId,
          answer: data.data.answer || null,
          category: data.data.category || "",
        });
        setAnswerInput(data.data.answer || "");
      } catch (error) {
        if (!isNavigating.current) {
          isNavigating.current = true;
          alert(
            language === Language.korean
              ? "비밀글이거나 해당 게시글을 볼 권한이 없습니다."
              : language === Language.japanese
              ? "非公開または閲覧権限がありません。"
              : "This is a secret post or you do not have permission."
          );
          router.back();
        }
      }
    };

    const fetchUserInfo = async () => {
      try {
        if (user) {
        setUserInfo(user);
        }
        const response = await customFetch("/users");
        const adminData = await response.json()
        setIsAdmin(adminData.result);
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    fetchData();
    fetchUserInfo();
  }, []);

  const handleSubmitAnswer = async () => {
    try {
      const response = await customFetch(`/posts/${props.id}/answer`, {
        method: "PATCH",
        body: JSON.stringify({ answer: answerInput }),
      });
      if (response.ok) {
        alert(language === Language.korean ? "답변이 등록되었습니다." : "Answer submitted successfully.");
        setAllData(prev => ({ ...prev, answer: answerInput }));
      } else {
        alert(language === Language.korean ? "답변 등록에 실패했습니다." : "Failed to submit answer.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting answer.");
    }
  };

  const handleConvertToFaq = async () => {
    try {
      const response = await customFetch(`/posts/${props.id}/convert-to-faq`, {
        method: "POST",
      });
      if (response.ok) {
        alert(language === Language.korean ? "공식 FAQ로 전환 완료되었습니다." : "Successfully converted to FAQ.");
      } else {
        alert(language === Language.korean ? "FAQ 전환에 실패했습니다." : "Failed to convert to FAQ.");
      }
    } catch (error) {
      console.error(error);
      alert("Error converting to FAQ.");
    }
  };

  const onUpdate = (guidanceId?: string) => {
    let pwd = password;
    if (!isAdmin && allData.category === "qna" && !pwd) {
      pwd = prompt(
        language === Language.korean
          ? "수정을 위해 비밀번호를 입력해주세요."
          : "Please enter the password to update."
      ) || "";
      if (!pwd) return;
    }
    let url = `/post-update/${guidanceId ?? props.id}`;
    if (pwd) {
      url += `?password=${encodeURIComponent(pwd)}`;
    }
    router.push(url);
  };

  const onDelete = async (guidanceId?: string) => {
    let pwd = password;
    if (!isAdmin && allData.category === "qna") {
      pwd = prompt(
        language === Language.korean
          ? "삭제를 위해 비밀번호를 입력해주세요."
          : "Please enter the password to delete."
      ) || "";
      if (!pwd) return;
    }
    try {
      let endpoint = `/posts/${guidanceId ?? props.id}`;
      if (pwd) {
        endpoint += `?password=${encodeURIComponent(pwd)}`;
      }
      await customFetch(endpoint, {
        method: "DELETE",
      });
      alert(deleteSuccess[language]?.contentDelete);
      router.back();
    } catch (error) {
      alert(deleteError[language]?.delete);
      console.error(error);
    }
  };

  const canEditOrDelete = isAdmin || (userInfo && userInfo.id === allData.userId) || allData.category === "qna";

  return (
    <main className="w-full">
      <section className="w-full flex justify-center">
        {props.category ? (
          <SubtitleHeader title={guidanceMenu[language]?.[props.category]} />
        ) : (
          <article className="w-11/12 flex flex-col mt-4">
            <div className="flex justify-between items-center border-t-2 border-blue-400 pt-2">
              <div className="text-lg font-bold">{allData.title}</div>
            </div>

            <section className="text-sm mt-2 border-b-2 pb-2 flex items-center">
              <Image
              alt="작성자 아이콘" 
              src="/images/author.png"
              width={15}
              height={15} 
                />
              <div>{allData.author}</div>
              <Image
                alt="작성일 아이콘"
                src="/images/createdDate.png"
                width={15}
                height={15}
                className="ml-4 mr-2"
              />
              <div>{allData.createdDate.substring(0, 10)}</div>
            </section>

            {allData.documentFiles.length > 0 && (
              <section className="border-b-2 pb-2 pt-2">
                {allData.documentFiles.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <Image
                      alt="첨부파일 아이콘"
                      src="/images/attachFile.png"
                      className="mr-2"
                      width={15}
                      height={15}
                    />
                    <button
                      onClick={() =>
                        router.push(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.filename}`
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {item.filename}
                    </button>
                  </div>
                ))}
              </section>
            )}

            {canEditOrDelete && (
              <div className="flex space-x-3 ml-auto mt-3">
                <button
                  className="border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-800 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                  onClick={() => onUpdate(allData.guidanceId)}
                >
                  {editorCompo[language]?.update}
                </button>
                <button
                  className="border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 hover:text-rose-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                  onClick={() => onDelete(allData.guidanceId)}
                >
                  {editorCompo[language]?.delete}
                </button>
              </div>
            )}
          </article>
        )}
      </section>

      {props.category === "directions" && (
        <>
          <section
            className="w-full mt-4 flex justify-center"
            style={{ height: "400px", overflow: "hidden" }}
          >
            <MapCompo />
          </section>
          <section className="w-full mt-0 flex justify-center">
            <div className="w-[70%] bg-[#5592e7] p-4 mb-10 text-left text-white">
              <div className="text-lg font-bold">
                {locationMap[language]["main-campus"]}
              </div>
              <div className="mt-2 text-base">
                {locationMap[language].address}
              </div>
              <div className="mt-1 text-base">
                {locationMap[language].zipCode}
              </div>
              <div className="mt-1 text-base">
                {locationMap[language].room}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="w-full flex justify-center">
        <div className="w-4/5 min-h-[150px]">
          <div className="prose w-full break-words">
            <br/>
            {parser(allData.content)}
          </div>
        </div>
      </section>

      {allData.category === "qna" && (
        <section className="w-full flex justify-center mt-8 mb-20">
          <div className="w-4/5 border border-blue-100 rounded-xl bg-blue-50/30 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-blue-50/80">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#0D578D] rounded-sm"></span>
                <h3 className="text-lg font-bold text-slate-800">
                  {language === Language.korean ? "관리자 답변" : language === Language.japanese ? "管理者回答" : "Admin Answer"}
                </h3>
              </div>
              {isAdmin && allData.answer && (
                <button
                  onClick={handleConvertToFaq}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                >
                  {language === Language.korean ? "공식 FAQ로 전환" : language === Language.japanese ? "公式FAQに登録" : "Convert to FAQ"}
                </button>
              )}
            </div>

            {isAdmin ? (
              <div className="space-y-4">
                <textarea
                  className="w-full min-h-[150px] p-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder={language === Language.korean ? "답변을 입력해 주세요." : "Enter your answer here..."}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                />
                <button
                  onClick={handleSubmitAnswer}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  {language === Language.korean ? "답변 저장" : language === Language.japanese ? "回答保存" : "Save Answer"}
                </button>
              </div>
            ) : (
              <>
                {allData.answer ? (
                  <div className="prose w-full break-words text-slate-700 leading-relaxed parsed-html font-medium">
                    {parser(allData.answer)}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm font-medium italic">
                    {language === Language.korean ? "답변을 준비 중입니다." : language === Language.japanese ? "回答を準備しています。" : "Preparing answer..."}
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

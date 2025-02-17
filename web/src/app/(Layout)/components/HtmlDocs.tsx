"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import {
  guidanceMenu,
  getError,
  editorCompo,
  deleteSuccess,
  deleteError,
} from "../../menu";
import parser from "html-react-parser";
import {
  HtmlDocsProps,
  Language,
  ServerDocumentFile,
} from "@/app/common/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import SchoolMap from "./SchoolMap";

type HtmlDocsPropsId = {
  id?: string;
  category?: string;
};

export default function HtmlDocs(props: HtmlDocsProps) {
  const [documentFiles, setDocumentFiles] = useState<ServerDocumentFile[]>([]);
  const [allData, setAllData] = useState<{
    content: string;
    title: string;
    documentFiles: ServerDocumentFile[];
    guidanceId: string;
    author: string;
    createdDate: string;
  }>({
    content: "",
    title: "",
    documentFiles: [],
    guidanceId: "",
    author: "",
    createdDate: "",
  });

  const customFetch = useCustomFetch();
  const router = useRouter();
  let endpoint = "";
  const language: Language = (Cookies.get("language") as Language) || "korean";

  useEffect(() => {
    const introData = async () => {
      try {
        {
          props.id
            ? (endpoint = `/posts?id=${props.id}`)
            : (endpoint = `/posts?category=${props.category}`);
        }
        const data = await customFetch(endpoint, {
          method: "GET",
        });
        setAllData({
          content: data.data.content,
          title: data.data.title,
          documentFiles: data.files,
          guidanceId: data.data.id,
          author: data.data.author,
          createdDate: data.data.createdDate,
        });
      } catch (error) {
        alert(getError[language]?.htmlError);
        console.error(getError[language]?.htmlError);
      }
    };
    introData();
  }, []);

  const onUpdate = async (guidanceId?: string) => {
    router.push(`/post-update/${guidanceId}`);
  };

  const onDelete = async (id: string | undefined) => {
    try {
      const data = await customFetch(`/posts/${id}`, { method: "DELETE" });
      alert(deleteSuccess[language]?.contentDelete);
    } catch (error) {
      alert(deleteError[language]?.delete);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="h-12"></div>

      <div className="w-full flex justify-center">
        {props.category ? (
          <div
            className="w-full flex justify-center items-center font-bold text-3xl"
            style={{ height: "200px" }}
          >
            {guidanceMenu[language]?.[props.category]}
          </div>
        ) : (
          <>
            {/* 제목과 작성자/작성일자 세로로 배치 */}
            <div className="w-11/12 flex flex-col mt-4">
              <div className="text-lg font-bold border-t-2 border-blue-400 pt-2">{allData.title}</div>

              {/* 제목 아래 작성자와 작성일자 세로로 배치 */}
              <div className="text-sm mt-2 border-b-2 pb-2 flex items-center">
                {/* 작성자 아이콘 */}
                <div className="mr-2">
                  <img src="/images/author.png" className="w-4 h-4"></img>
                </div>
                {/* 작성자 */}
                <div>{allData.author}</div>

                <div className="ml-4 mr-2">
                <img src="/images/createdDate.png" className="w-4 h-4"></img>
                </div>
                <div>{allData.createdDate.substring(0, 10)}</div>
              </div>
              <div className="border-b-2 pb-2 pt-2">
              {allData.documentFiles.length > 0 ? (
                allData.documentFiles.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center">
                      <img src="/images/attachfile.png" className="w-4 h-4 mr-2"></img>
                      {item.filename.substring(16)}
                    </div>
                  );
                })
              ) : (
                <div className="mt-2">첨부파일이 없습니다.</div>
              )}
              </div>
              
            </div>
          </>
        )}
      </div>

      {/* 오시는 길 페이지 지도 */}
      {props.category === "directions" ? (
        <>
          <div
            className="w-full mt-4 flex justify-center"
            style={{ height: "400px", overflow: "hidden" }}
          >
            <SchoolMap />
          </div>
          <div className="w-full mt-0 flex justify-center">
            <div className="w-[70%] bg-[#5592e7] p-4">
              <div className="text-left text-white text-lg font-bold">
                대한민국 대구광역시 북구 복현로 35
              </div>
            </div>
          </div>
        </>
      ) : null}

      {props.category ? (
        <button onClick={() => onUpdate(allData.guidanceId)}>
          {editorCompo[language]?.write}
        </button>
      ) : (
        <button onClick={() => onUpdate(allData.guidanceId)}>
          {editorCompo[language]?.update}
        </button>
      )}

      <button onClick={() => onDelete(allData.guidanceId)}>
        {editorCompo[language]?.delete}
      </button>

      <div className="w-full h-screen flex justify-center">
        <div className="w-3/5 ">{parser(allData.content)}</div>
      </div>
    </div>
  );
}

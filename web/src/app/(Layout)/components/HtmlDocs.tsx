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
  // [key in "id" | "category" ]: string;
  id?: string;
  category?: string;
};

export default function HtmlDocs(props: HtmlDocsProps) {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [guidanceId, setGuidanceId] = useState<string>(""); // props에서 category를 받았을때는 id가 없기 때문에 update를 할수 없음
  const [documentFiles, setDocumentFiles] = useState<ServerDocumentFile[]>([]);
  const [author, setAuthor] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>("");

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
        setContent(data.data.content);
        setTitle(data.data.title);
        setDocumentFiles(data.files);
        setGuidanceId(data.data.id);
        setAuthor(data.data.author);
        setCreatedDate(data.data.createdDate);
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
      {documentFiles
        ? documentFiles.map((item, index) => {
            // 화면에 파일 이름이 띄워지는지 확인용 테스트코드 ( 수정 or 삭제예정 )
            return <div key={index}>{item.filename.substring(16)}</div>;
          })
        : null}
      <div className="h-12 border "></div>
      <div className="w-full flex justify-center">
        {props.category ? (
          <div
            className="w-full flex justify-center items-center font-bold text-3xl"
            style={{ height: "200px" }}
          >
            {guidanceMenu[language]?.[props.category]}{" "}
            {/* guidancsMenu에 없다면 board 페이지이기 때문에 내부 div 스타일로 수정 */}
          </div>
        ) : (
          <>
            <div className="w-11/12 flex border-t-2 border-blue-300 ">
              <div className="text-lg font-bold mt-4">{title}</div>
            </div>
            <div>
              {author} | {createdDate}
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
              <div className="text-left text-white text-lg  font-bold">
                대한민국 대구광역시 북구 복현로 35
              </div>
            </div>
          </div>
        </>
      ) : null}

      <button onClick={() => onUpdate(guidanceId)}>
        {editorCompo[language]?.update}
      </button>
      <div className="w-full h-screen flex justify-center">
        <div className="w-3/5 ">{parser(content)}</div>
      </div>
    </div>
  );
}

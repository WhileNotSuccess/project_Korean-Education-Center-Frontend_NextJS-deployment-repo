"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { guidanceMenu, getError } from "@/app/menu";
import parser from "html-react-parser";
import { HtmlDocsProps, Language } from "@/app/common/types";
import Cookies from "js-cookie";
import SchoolMap from "./SchoolMap";

type HtmlDocsPropsId = {
  // [key in "id" | "category" ]: string;
  id?: string;
  category?: string;
};

export default function HtmlDocs(props: HtmlDocsProps) {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const customFetch = useCustomFetch();
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
          // korean을 하드코딩이 아닌 로컬스토리지에서 받아오는 식으로 수정
          method: "GET",
        });
        setContent(data.data.content); // 지금은 배열 형태라서 [0] 수정 해야함
        setTitle(data.data.title);
      } catch (error) {
        alert(getError[language]?.htmlError);
        console.error(getError[language]?.htmlError);
      }
    };
    introData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="h-12 border "></div>
      <div
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
        {props.category ? guidanceMenu[language]?.[props.category] : <></>}
      </div>
      {props.category === "directions" ? 
        <div className="w-full mt-4 flex justify-center" style={{ height: "400px", overflow: 'hidden' }}>
          <SchoolMap />
        </div>
      : null}

      {props.category === "directions" ? 
        <div className="w-full mt-0 flex justify-center">
           <div className="w-[70%] bg-[#5592e7] p-4"> 
           <div className="text-left text-white text-lg  font-bold">대한민국 대구광역시 북구 복현로 35</div>
          </div>
        </div>
      : null}

      <div className="w-full h-screen flex justify-center">
        <div className="w-3/5 ">
          {" "}
          {/* border쓴 이유는 어느정도 크기인지 확인하려고 */}
          {parser(content)}
        </div>
      </div>
    </div>
  );
}

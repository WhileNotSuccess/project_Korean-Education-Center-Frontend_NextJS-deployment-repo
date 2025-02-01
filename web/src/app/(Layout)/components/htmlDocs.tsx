'use client'
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { guidanceMenu } from "@/app/menu";
import parser from "html-react-parser";
import SchoolMap from "./schoolmap";

type HtmlDocsProps = {
  name: keyof typeof guidanceMenu["korean"]
}

export default function HtmlDocs({ name }: HtmlDocsProps) {
  const [content, setContent] = useState<string>("");
  const customFetch = useCustomFetch();
  const language = "korean"; // 로컬스토리지에서 가져오는 코드로 변경해야 함

  useEffect(() => {
    const introData = async () => {
      try {
        const data = await customFetch(`/posts?category=${name}`, {
          method: "GET"
        });
        console.log(data);
        setContent(data.data.content); 
      } catch (error) {
        alert(`${guidanceMenu[language]?.[name]}의 글을 불러올 수 없습니다`);
        console.error('해당 게시글을 불러올 수 없습니다.');
      }
    };
    introData();
  }, [name]);

  return (
    <div className="w-full h-screen">
      <div className="h-12 border-b flex items-center justify-center">
        <div className="text-3xl font-bold">{guidanceMenu[language]?.[name]}</div>
      </div>

      {name === "directions" ? 
        <div className="w-full mt-4 flex justify-center" style={{ height: "400px", overflow: 'hidden' }}>
          <SchoolMap />
        </div>
      : null}

      {name === "directions" ? 
        <div className="w-full mt-0 flex justify-center">
           <div className="w-[70%] bg-[#5592e7] p-4"> 
           <div className="text-left text-white text-lg  font-bold">대한민국 대구광역시 북구 복현로 35</div>
          </div>
        </div>
      : null}

      <div className="w-full flex justify-center mt-8">
        <div className="w-3/5 border">
          {parser(content)}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { guidanceMenu, getError, editorCompo} from "@/app/menu";
import parser from "html-react-parser";
import { HtmlDocsProps, Language } from "@/app/common/types";
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
  const [author, setAuthor] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>("");
  const [guidanceId, setGuidanceId] = useState<string>("")
  const customFetch = useCustomFetch();
  const router = useRouter()
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

  const onUpdate = async (guidanceId? : string)=>{
    router.push(`/post-update-test/${guidanceId}`)
  }

  return (
    <div className="w-full h-screen">
      <div className="h-12 border "></div>
      <div
        className="w-full flex justify-center"
      >
        {props.category ?
        <div className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}>
          {guidanceMenu[language]?.[props.category]}   {/* guidancsMenu에 없다면 board 페이지이기 때문에 내부 div 스타일로 수정 */}
        </div>
         
         : <>
         <div className="w-11/12 flex border-t-2 border-blue-300 ">
             <div className="text-lg font-bold mt-4">
          {title}
          </div>
          </div>
         <div>
         {author} | {createdDate}
       </div></>
        
         } 
      </div>

      {/* 오시는 길 페이지 지도 */}
      {props.category === "directions" ? 
        <>
        <div className="w-full mt-4 flex justify-center" style={{ height: "400px", overflow: 'hidden' }}>
          <SchoolMap />
        </div>
        <div className="w-full mt-0 flex justify-center">
        <div className="w-[70%] bg-[#5592e7] p-4"> 
        <div className="text-left text-white text-lg  font-bold">대한민국 대구광역시 북구 복현로 35</div>
       </div>
        </div>
        </>
      : null}


      {/* {props.category === "directions" ? 
        <div className="w-full mt-0 flex justify-center">
           <div className="w-[70%] bg-[#5592e7] p-4"> 
           <div className="text-left text-white text-lg  font-bold">대한민국 대구광역시 북구 복현로 35</div>
          </div>
        </div>
      : null} */}

      <button onClick={()=>onUpdate(guidanceId)}>{editorCompo[language]?.update}</button>
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

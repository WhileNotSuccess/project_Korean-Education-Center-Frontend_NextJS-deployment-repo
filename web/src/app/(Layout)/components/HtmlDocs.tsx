"use client";
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { guidanceMenu, getError, editorCompo} from "@/app/menu";
import parser from "html-react-parser";
import { HtmlDocsProps, Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type HtmlDocsPropsId = {
  // [key in "id" | "category" ]: string;
  id?: string;
  category?: string;
};

export default function HtmlDocs(props: HtmlDocsProps) {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
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
      } catch (error) {
        alert(getError[language]?.htmlError);
        console.error(getError[language]?.htmlError);
      }
    };
    introData();
  }, []);

  const onUpdate = async (id? : string)=>{
    router.push(`/post-update-test/${id}`)
  }

  return (
    <div className="w-full h-screen">
      <div className="h-12 border "></div>
      <div
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
        {props.category ? guidanceMenu[language]?.[props.category] : <></>}
      </div>
      <button onClick={()=>onUpdate(props.id)}>{editorCompo[language]?.update}</button>
      <div className="w-full h-screen flex justify-center">
        <div className="w-3/5 border">
          {" "}
          {/* border쓴 이유는 어느정도 크기인지 확인하려고 */}
          {parser(content)}
        </div>
      </div>
    </div>
  );
}

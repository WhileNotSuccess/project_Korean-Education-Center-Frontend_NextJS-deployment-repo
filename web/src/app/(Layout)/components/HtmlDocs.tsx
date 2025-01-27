'use client'
import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { guidanceMenu, getError } from "@/app/menu";
import parser from "html-react-parser"
import { HtmlDocsProps, Language } from "@/app/common/types";
import Cookies from 'js-cookie';


type HtmlDocsPropsId = {
  // [key in "id" | "category" ]: string;
  id? : string,
  category? : string

}

export default function HtmlDocs(props : HtmlDocsProps) {
  const [content, setContent] = useState<string>("");
  const customFetch = useCustomFetch()
  let endpoint = ""
  const language : Language = Cookies.get('language') as Language || "korean"
  console.log(props.category)
  console.log(props.id)

  useEffect(()=>{
    const introData = async ()=>{
      try{
        {props.id? endpoint=`/posts?id=${props.id}` : endpoint = `/posts?category=${props.category}`}
        console.log(endpoint)
        const data = await customFetch(endpoint,{ // korean을 하드코딩이 아닌 로컬스토리지에서 받아오는 식으로 수정
          method : "GET"
        })
        console.log(data)
        setContent(data.data.content) // 지금은 배열 형태라서 [0] 수정 해야함
      }catch(error){
        alert(getError[language]?.htmlError)
        console.error(getError[language]?.htmlError)
      }
    }
    introData()
  },[])

  return (
    <div className="w-full h-screen">
      <div className="h-12 border"></div>
      <div className="w-full flex justify-center items-center font-bold text-3xl" style={{height : "200px"}}>
        {props.category ? guidanceMenu[language]?.[props.category] : <></>}

      </div>
      <div className="w-full h-screen flex justify-center">
      <div className="w-3/5 border"> {/* border쓴 이유는 어느정도 크기인지 확인하려고 */}
      {parser(content)}
      </div>
      </div>
    </div>

  );
}

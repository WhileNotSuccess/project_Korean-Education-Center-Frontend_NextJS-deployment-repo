'use client'

import { formatDate } from "@/app/common/formatDate";
import { BoardData, Language } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { getError } from "@/app/menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";




type Props = {
  category : string,
  limit : number
}

export default function BoardDataMapCompo (props : Props) {
  const [data, setData] = useState<BoardData[]>([])
  const customFetch = useCustomFetch()
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(()=>{ 
  const BoardData = async() =>{
    try{
      const response = await customFetch(
        `/posts/${props.category}?limit=${props.limit}`,
        { method : "GET" }
      )
      const data = await response.json()
      setData(data.data)
    }catch(error){
      console.error("board fetch error:", error); // 이거 추가
      alert(getError[language]?.boardError ?? "게시글을 불러오는 중 오류가 발생했습니다.");
    }
  }
  BoardData()
}, [language])  // 여기 부분은 2번에서 다시 수정할 거야


  return(
    <div>
      {data.map((item, index) => {
      return (
        <article
          key={index}
          className="w-full flex flex-1 justify-between items-center border-b rounded-md p-4 hover:bg-gray-200 transition-all"
          >
          <Link
            href={`/board/notice/${item.id}`}
            className="w-[70%] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {item.title}
          </Link>
        <time className="font-light text-sm">
         {formatDate(item.createdDate)}
        </time>
      </article>);
    })}
    </div>
  )
}
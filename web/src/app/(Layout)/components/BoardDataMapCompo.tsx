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
  const language: Language = (Cookies.get("language") as Language) || "korean";

  useEffect(()=>{ 
    const BoardData = async() =>{
      try{
        const response = await customFetch(`/posts/${props.category}?limit=${props.limit}`,{
          method : "GET"
        })
        setData(response.data)
      }catch(error){
        alert(getError[language]?.boardError)
      }
    }
    BoardData()
  },[])

  return(
    <div>
      {data.map((item, index) => {
      return (
        <div
          key={index}
          className="w-full flex flex-1 justify-between items-center border-b p-4"
          >
          <Link
            href={`/board/notice/${item.id}`}
            className="w-[70%] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {item.title}
          </Link>{" "}
        <div className="font-light text-sm">
         {formatDate(item.createdDate)}
        </div>
      </div>);
    })}
    </div>
  )
}
'use client'

import useCustomFetch from "@/app/lib/customFetch"
import { boardMenu } from "@/app/menu"
import Link from "next/link"
import { useEffect, useState } from "react"
import Pagination from "./pagination"

type BoardPageProps = {
  name : keyof typeof boardMenu["korean"]
}

interface BoardData {
  id : string,
  title : string,
  content : string,
  author : string,
  createdAt : string,
  category : string
}

export default function BoardPageCompo({name} : BoardPageProps){
  const customFetch = useCustomFetch()
  const [sort, setSort] = useState<string>("제목")
  const [boardData, setBoardData] = useState<BoardData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [nextPage, setNextPage] = useState<string>(""); // 다음 페이지
  const [prevPage, setPrevPage] = useState<string>(""); // 이전 페이지
  const [totalPage, setTotalPage] = useState<number>(0);

  // 게시글 불러오기 함수
  const fetchBoard = async (currentPage : number) => {
    try {
      const data = await customFetch(`/posts/${name}?limit=10&page=${currentPage}`, {
        method : "GET"
      })
      console.log(data)
      setBoardData(data.data)
      setCurrentPage(data.currentPage)
      setNextPage(data.nextPage)
      setPrevPage(data.prevPage)
      setTotalPage(data.totalPage)
    } catch (error) {
      alert(`${name}의 글을 불러오지 못했습니다.`)
      console.error('게시글들을 불러올 수 없습니다.')
    }
  }

  useEffect(() => {
    fetchBoard(currentPage)
  }, [currentPage]) // currentPage가 변경될 때마다 데이터를 불러옴

  const onPageChange = (page: number) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page)
    }
  }
  
  const onUrlChange = async(url : string) =>{
    try{
      const data= await fetch(url, {
        method : 'GET'
      })
      console.log(data)
      // setBoardData(data.data)
      // setCurrentPage(data.currentPage)
      // setNextPage(data.nextPage)
      // setPrevPage(data.prevPage)
      // setTotalPage(data.totalPage)
    }catch(error){
      alert('불러올수없습니다.')
    }
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full flex justify-center items-center font-bold text-3xl" style={{height : "200px"}}>
        {boardMenu["korean"]?.[name]}
      </div>
      <div className="w-full flex pl-40">
        <div className="w-2/5 flex justify-evenly">
          <select
            className="w-28 h-8 border-2 border-black rounded" 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={"제목"}>제목</option>
            <option value={"내용"}>내용</option>
            <option value={"작성일"}>작성일</option>
          </select>
          <input className="w-60 h-8 border-2 border-black rounded pl-2 ml-2" placeholder="제목을 입력하세요"></input>
          <button className="min-w-12 bg-[#0093EE] text-white ml-2">검색</button>
        </div>
        <div className="w-3/5 flex justify-center">
          <button className="w-16 bg-[#0093EE] text-white">작성</button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-4/5 h-16 border-x-0 border-y-2 border-black mt-12 flex items-center">
          <div className="w-1/5 font-bold pl-10">순번</div>
          <div className="w-2/5 font-bold flex justify-center">제목</div>
          <div className="w-1/5 font-bold flex justify-center">작성자</div>
          <div className="w-1/5 font-bold flex justify-center">작성일</div>
        </div>
        {boardData && boardData.length > 0 ? (
          boardData.map((item, index) => (
            <div key={index} className="w-4/5 h-12 border-b-2 border-black flex items-center">
              <div className="w-1/5 pl-12">{item.id}</div>
              <Link href={`/board/${name}/${item.id}`} className="w-2/5 cursor-pointer">{item.title}</Link>
              <div className="w-1/5 flex justify-center">{item.author}</div>
              <div className="w-1/5 flex justify-center">{item.createdAt}</div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex justify-center">
        <Pagination 
          currentPage={currentPage}
          nextPage={nextPage}
          totalPage={totalPage}
          prevPage={prevPage}
          onPageChange={onPageChange}
          onUrlChange={onUrlChange}
        />
      </div>
    </div>
  )
}

"use client";

import useCustomFetch from "@/app/lib/customFetch";
import { boardMenu } from "@/app/menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { boardPage, getError } from "@/app/menu";
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";
import { formatDate } from "@/app/common/formatDate";

type BoardPageProps = {
  name: keyof (typeof boardMenu)["korean"];
};

interface BoardData {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export default function BoardPageCompo({ name }: BoardPageProps) {
  const customFetch = useCustomFetch();
  const [sort, setSort] = useState<string>(boardPage["korean"]?.title);
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [nextPage, setNextPage] = useState<number>(0); // 다음 페이지
  const [prevPage, setPrevPage] = useState<number>(0); // 이전 페이지
  const [totalPage, setTotalPage] = useState<number>(0);
  const language: Language = (Cookies.get("language") as Language) || "korean";

  // 게시글 불러오기 함수
  const fetchBoard = async (currentPage: number) => {
    try {
      const data = await customFetch(
        `/posts/${name}?limit=10&page=${currentPage}`,
        {
          method: "GET",
        }
      );

      setBoardData(data.data);
      setCurrentPage(data.currentPage);
      setNextPage(data.nextPage);
      setPrevPage(data.prevPage);
      setTotalPage(data.totalPage);
    } catch (error) {
      alert(getError[language]?.boardError);
      console.error(getError[language]?.boardError);
    }
  };

  useEffect(() => {
    fetchBoard(currentPage);
  }, [currentPage]); // currentPage가 변경될 때마다 데이터를 불러옴

  const onPageChange = (page: number) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full h-screen">
      <div
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
        {boardMenu[language]?.[name]}
      </div>
      <div className="w-full flex pl-40">
        <div className="w-2/5 flex justify-evenly">
          <select
            className="w-28 h-8 border-2 border-black rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={boardPage[language]?.title}>
              {boardPage[language]?.title}
            </option>
            <option value={boardPage[language]?.content}>
              {boardPage[language]?.content}
            </option>
            <option value={boardPage[language]?.createDate}>
              {boardPage[language]?.createDate}
            </option>
          </select>
          <input
            className="w-60 h-8 border-2 border-black rounded pl-2 ml-2"
            placeholder="제목을 입력하세요"
          ></input>
          <button className="min-w-12 bg-[#0093EE] text-white ml-2">
            {boardPage[language]?.search}
          </button>
        </div>
        <div className="w-3/5 flex justify-center">
          <button className="w-16 bg-[#0093EE] text-white">
            {boardPage[language]?.write}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mb-5">
        <div className="w-4/5 h-16 border-x-0 border-y-2 border-black mt-12 flex items-center">
          <div className="w-1/5 font-bold pl-10">
            {boardPage[language]?.number}
          </div>
          <div className="w-2/5 font-bold flex justify-center">
            {boardPage[language]?.title}
          </div>
          <div className="w-1/5 font-bold flex justify-center">
            {boardPage[language]?.author}
          </div>
          <div className="w-1/5 font-bold flex justify-center">
            {boardPage[language]?.createDate}
          </div>
        </div>
        {boardData && boardData.length > 0 ? (
          boardData.map((item, index) => (
            <div
              key={index}
              className="w-4/5 h-12 border-b-2 border-black flex items-center"
            >
              {name === "notice" ? (
                <div className="w-1/5 pl-12 border rounded-sm">
                  {boardPage[language]?.notice}
                </div>
              ) : (
                <div className="w-1/5 pl-12">{item.id}</div>
              )}

              <Link
                href={`/board/${name}/${item.id}`}
                className="w-2/5 cursor-pointer"
              >
                {item.title}
              </Link>
              <div className="w-1/5 flex justify-center">{item.author}</div>
              <div className="w-1/5 flex justify-center">
                {formatDate(item.updatedAt)}
              </div>
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
        />
      </div>
    </div>
  );
}

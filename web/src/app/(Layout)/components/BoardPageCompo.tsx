"use client";

import useCustomFetch from "@/app/lib/customFetch";
import { boardMenu } from "@/app/menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { boardPage, getError } from "@/app/menu";
import Cookies from "js-cookie";
import { BoardData, Language } from "@/app/common/types";
import { formatDate } from "@/app/common/formatDate";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hook/auth";

type BoardPageProps = {
  name: keyof (typeof boardMenu)[Language];
};

export default function BoardPageCompo({ name }: BoardPageProps) {
  const customFetch = useCustomFetch();
  const { user } = useAuth();
  const [searchOption, setSearchOption] = useState<string>("title");
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [nextPage, setNextPage] = useState<number>(0); // 다음 페이지
  const [prevPage, setPrevPage] = useState<number>(0); // 이전 페이지
  const [totalPage, setTotalPage] = useState<number>(0);
  const [adminCheck, setAdminCheck] = useState<Boolean>(false);
  const [userCheck, setUserCheck] = useState<Boolean>(false);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState<Language>(Language.korean);
  
  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

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

  useEffect(() => {
    async function adminCheck() {
      const response = await customFetch("/users");
      if (response && response.result) {
        setAdminCheck(true);
      }
    }
    adminCheck();
  }, []);

  useEffect(() => {
    async function userCheck() {

      if (user) {
        setUserCheck(true);
      }
    }
    userCheck();
  }, []);

  const onPageChange = (page: number) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const onWrite = (category: string) => {
    router.push(`/post/${category}`);
  };

  const onSearch = async (value: string) => {
    try {
      const data = await customFetch(
        `/posts/search?limit=10&page=1&category=${name}&${searchOption}=${value}`,
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
      alert("테스트 실패");
    }
  };

  return (
    <div className="w-full">
      <header
        className="w-full flex justify-center items-center font-bold text-3xl"
        style={{ height: "200px" }}
      >
        {boardMenu[language]?.[name]}
      </header>
      <section className="w-full flex sm:px-40 px-20">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between justify-start">
          <div className="flex sm:flex-row sm:justify-evenly flex-col justify-evenly">
            <select
              className="w-28 h-8 border-2 border-black rounded"
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="title">{boardPage[language]?.title}</option>
              <option value="content">{boardPage[language]?.content}</option>
              <option value="author">{boardPage[language]?.author}</option>
            </select>
            <input
              onChange={(e) => setInputValue(e.target.value)}
              className="w-60 h-8 border-2 border-black rounded pl-2 sm:ml-2"
              placeholder={`${boardPage[language]?.writeTitle}`}
            ></input>
            <button
              onClick={() => onSearch(inputValue)}
              className=" px-2 bg-[#0093EE] text-white sm:ml-2 max-w-20"
            >
              {boardPage[language]?.search}
            </button>
          </div>
          <div className="flex justify-center ml-2">
            {adminCheck ||
            ((name === "review" || name === "faq") && userCheck) ? (
              <button
                className=" px-2 bg-[#0093EE] text-white"
                onClick={() => onWrite(name)}
              >
                {boardPage[language]?.write}
              </button>
            ) : null}
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-center mb-5">
        <div className="w-4/5 h-16 border-x-0 border-y-2 border-t-[#4171b4] mt-12 flex sm:items-center items-center justify-between">
          {name==="notice" ?
          <div className="w-20"></div>
          :
          null
        }

          <div className="w-2/5 font-bold flex justify-center ml-4">
            {boardPage[language]?.title}
          </div>
          <div className="sm:w-1/5 sm:font-bold sm:flex sm:justify-center sm:ml-0 ml-2 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
            {boardPage[language]?.author}
          </div>
          <div className="sm:w-1/5 sm:font-bold sm:flex sm:justify-center sm:ml-0 ml-2 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
            {boardPage[language]?.createDate}
          </div>
          <div className="w-1/5 font-bold flex justify-center sm:ml-0 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {boardPage[language]?.updateDate}
          </div>
        </div>
        {boardData && boardData.length > 0
          ? boardData.map((item, index) => (
              <div
                key={index}
                className="w-4/5 h-12 border-b-2 border-[#e5e7eb] flex justify-between items-center sm:items-center"
              >
                {name === "notice" ? (
                  <div className="w-20 border rounded-sm flex justify-center items-center text-white bg-[#0093EE] font-semibold">
                    {boardPage[language]?.notice}
                  </div>
                ) : (
                  <div className="sm:w-20 hidden"></div>
                )}

                <Link
                  href={`/board/${name}/${item.id}`}
                  className="sm:w-2/5 w-3/5 cursor-pointer ml-4 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {item.title}
                </Link>
                <div className="sm:w-1/5 sm:flex sm:justify-center sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
                  {item.author}
                </div>
                <div className="sm:w-1/5 sm:flex sm:justify-center sm:ml-0 ml-2 sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap hidden sm:block">
                  {formatDate(item.createdDate)}
                </div>
                <div className="w-1/5 flex justify-center sm:ml-0 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {formatDate(item.updatedDate)}
                </div>
              </div>
            ))
          : null}
      </section>
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

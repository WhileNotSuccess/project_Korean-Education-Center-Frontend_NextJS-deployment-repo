"use client";
import { Language } from "@/app/common/types";
import { paginationPage } from "@/app/menu";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// components/Pagination.tsx
interface Props {
  currentPage: number;
  totalPage: number;
  nextPage: number;
  prevPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPage,
  nextPage,
  prevPage,
  onPageChange,
}) => {
  const pageNumbers = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 mb-5">
      {/* 이전 버튼 (공간 유지) */}
      <button
        className="border px-3 py-1 min-w-[60px] text-center"
        onClick={() => onPageChange(prevPage)}
        style={{ visibility: prevPage ? "visible" : "hidden" }}
      >
        {paginationPage[language]?.prev}
      </button>

      {/* 페이지 번호 */}
      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`border px-3 py-1 ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 버튼 (공간 유지) */}
      <button
        className="border px-3 py-1 min-w-[60px] text-center"
        onClick={() => onPageChange(nextPage)}
        style={{ visibility: nextPage ? "visible" : "hidden" }}
      >
        {paginationPage[language]?.next}
      </button>
    </div>
  );
};

export default Pagination;

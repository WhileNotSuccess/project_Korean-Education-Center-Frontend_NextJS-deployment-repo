// 모바일 전용 햄버거 메뉴(네비게이션 대신)
'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";
import { Hamburger } from "@/app/menu";
import Link from "next/link";
import Image from "next/image";

export default function HamburgerMenuCompo (){
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null); // 현재 열린 subMenu 인덱스
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const onMenuOpen = ()=>{
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index); // 현재 열린 메뉴 다시 클릭하면 닫힘
  };

  return (
    <nav className="xl:hidden">
      {/* 햄버거 버튼 */}
      <div className="w-full flex justify-end px-4 py-2" onClick={onMenuOpen}>
        <Image
          src="/images/hamburger.png"
          alt="햄버거 메뉴"
          width={32}
          height={32}
          className="size-6"
        />
      </div>

      {menuOpen && (
        <aside className="absolute z-50 top-0 right-0 w-64 h-screen bg-white shadow-2xl border-l border-gray-200 overflow-y-auto transition-all duration-300">
          {/* 닫기 버튼 */}
          <div className="w-full flex justify-end p-4">
            <Image
              src="/images/close.png"
              alt="닫기"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={onMenuOpen}
            />
          </div>

          {/* 메뉴 리스트 */}
          <ul className="flex flex-col gap-1 px-2">
            {Hamburger[language].map((item, index) => (
              <li key={index} className="border-b border-gray-200">
                {/* 상위 메뉴 */}
                <div
                  className="flex justify-between items-center px-4 py-3 font-semibold text-lg text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer transition-all"
                  onClick={() => toggleSubMenu(index)}
                >
                  {item.topMenu}
                  <span className="text-sm">{openSubMenu === index ? "▲" : "▼"}</span>
                </div>

                {/* 하위 메뉴 */}
                <div
                  className={`flex flex-col overflow-hidden transition-all duration-300 ${
                    openSubMenu === index ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.address}
                      className="px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </nav>
  );
}

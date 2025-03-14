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
      <div className="xl:hidden w-full flex justify-end px-4" onClick={onMenuOpen}>
        <Image 
        src="/images/hamburger.png" 
        alt="햄버거 메뉴"
        className="size-8 cursor-pointer"
        width={64}
        height={64}
        />
      </div>

      {menuOpen && (
        <aside className="absolute z-50 bg-white flex flex-col top-0 right-0 overflow-y-scroll shadow-md border-2">
          <div className="w-full flex justify-end p-4">
            <Image 
            src="/images/close.png" 
            alt="닫기"
            width={64}
            height={64}
            className="size-8 cursor-pointer" 
            onClick={onMenuOpen}/>  
          </div>
          <ul>
          {Hamburger[language].map((item, index) => (
            <div key={index} className="border-b">
              <div 
                className="px-4 py-2 font-bold text-lg text-center flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSubMenu(index)}
              >
                {item.topMenu}
                <span>{openSubMenu === index ? "▲" : "▼"}</span>
              </div>
              <div 
                className={`flex flex-col transition-all overflow-hidden ${
                  openSubMenu === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <Link
                   key={subIndex}
                    href={subItem.address} 
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          </ul>
        </aside>
      )}
    </nav>
  );
}

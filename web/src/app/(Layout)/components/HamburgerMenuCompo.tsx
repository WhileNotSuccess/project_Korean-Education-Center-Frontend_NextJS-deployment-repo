'use client'

import { useState } from "react"
import Cookies from "js-cookie";
import { Language } from "@/app/common/types";
import { Hamburger } from "@/app/menu";
import Link from "next/link";

export default function HamburgerMenuCompo (){
  const [menuOpen, setMenuOpen] = useState(false)
  const language: Language = (Cookies.get("language") as Language) || "korean";

  const onMenuOpen = ()=>{
    setMenuOpen(!menuOpen)
  }

  return(
    <div>
    <div className="sm:hidden w-full flex justify-end px-4" onClick={onMenuOpen}>
      <img src="/images/hamburger.png" className="size-8  cursor-pointer"/>
  </div>
  {menuOpen && (
    <div className="absolute z-50 bg-[#FFFFFF] flex flex-col top-0 right-0 overflow-y-scroll">
        <div className="w-full flex justify-end cursor-pointer" onClick={onMenuOpen}>
          <img src="/images/close.png" className="size-8"/>  
        </div>
      {Hamburger[language].map((item, index)=>{
        return(
          <div key={index} className="flex flex-col border">
            <div  className="px-2 font-bold text-center">
            {item.topMenu}
            </div>
            <div className="flex flex-col">
            {item.subMenu.map((item, index)=>{
              return(
                <Link href={item.address} key={index} className="px-4 font-light text-center">
                  {item.name}
                </Link>
            )
            })}
            </div>
          </div>
        )
      })}
    </div>
  )}
  </div>
  )
}
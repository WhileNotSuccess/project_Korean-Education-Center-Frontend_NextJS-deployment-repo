'use client'

import { AlertModalMenu } from "@/app/menu"
import { useEffect, useState } from "react"
import { Language } from "@/app/common/types"
import Cookies from "js-cookie"


interface alertModal  {
    message : string 
    isOpen : boolean
    onClose : () => void
}

export default function AlertModal( props : alertModal) {

  if(!props.isOpen) return null

  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);    


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">{props.message}</h2>
                  
                  <button
                    onClick={props.onClose} 
                    className="px-4 py-2 bg-blue-300 text-white rounded-md"
                  >
                    {AlertModalMenu[language].close}
                  </button>
                </div>
              </div>
    )
}
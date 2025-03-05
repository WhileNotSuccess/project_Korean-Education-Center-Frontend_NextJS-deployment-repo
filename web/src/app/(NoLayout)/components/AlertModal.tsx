'use client'

import { AlertModalMenu } from "@/app/menu"
import { useEffect, useState } from "react"
import { Language } from "@/app/common/types"
import Cookies from "js-cookie"

interface AlertModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertModal(props: AlertModalProps) {

  if (!props.isOpen) return null;

  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">{props.message}</h2>

        <div className="flex justify-center">
          <button
            onClick={props.onClose}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold transition-colors duration-200 hover:bg-blue-600"
          >
            {AlertModalMenu[language].close}
          </button>
        </div>
      </div>
    </div>
  );
}

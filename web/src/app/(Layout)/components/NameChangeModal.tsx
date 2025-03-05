"use client";

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import { NameChangeModalMenu } from "@/app/menu";
import { Language, NameChangeModalProps } from "@/app/common/types";
import Cookies from "js-cookie";

export default function NameChangeModal({ isOpen, onClose }: NameChangeModalProps) {
  const [newName, setNewName] = useState("");
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);


  if (!isOpen) return null;

  const handleNameChange = async () => {
    try {
      const response = await customFetch("/users/name", {
        method: "PATCH",
        body: JSON.stringify({ name: newName }),
      });

      if (response && response.message) {
        alert(`${NameChangeModalMenu[language].successNameChange}`);
      } else {
        alert(`${NameChangeModalMenu[language].failNameChange}`);
      }

      onClose();
    } catch (error) {
      alert(NameChangeModalMenu[language].nameChangeError);
      onClose();  // 오류가 나도 모달은 닫아줌
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{NameChangeModalMenu[language].nameChange}</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={NameChangeModalMenu[language].newNameInput}
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex justify-end gap-2 p-2 rounded-md">
          <button
            onClick={handleNameChange} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {NameChangeModalMenu[language].save}
          </button>
          
          <button
            onClick={onClose} 
            className="px-4 py-2 bg-blue-300 text-white rounded-md"
          >
            {NameChangeModalMenu[language].cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/app/hook/auth";
import { useEffect, useState } from "react";
import NameChangeModal from "../components/NameChangeModal";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/app/lib/customFetch";
import { DashboardCompoMenu } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { SubmittedDocument } from "@/app/common/types";

export default function DashboardCompo() {
  const { user } = useAuth();
  const router = useRouter();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedDocuments, setSubmittedDocuments] = useState<SubmittedDocument[]>([]);
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const googleConectHandle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/link`);
  };

  // 조건부로 early return 하기 전에 useEffect는 항상 호출될 수 있도록 수정
  useEffect(() => {
    if (user) {
      async function fetchSubmittedDocuments() {
        const response = await customFetch("/application-form/user", {
          method: "GET",
        });

        if (response && response.data) {
          setSubmittedDocuments(response.data);
        }
      }

      fetchSubmittedDocuments();
    }
  }, [user]); // user가 변경될 때마다 실행되도록

useEffect(()=>{console.log(submittedDocuments)},[submittedDocuments])
  if (!user) {
    return <div>{DashboardCompoMenu[language].loadingOrNotFoundUser}</div>;
  }

  return (
    
    <div className="w-full flex flex-col items-center bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex flex-col sm:flex-row items-center space-x-2 mb-4 sm:mb-0">
            <h2 className="text-2xl font-semibold">{user.name} {DashboardCompoMenu[language].userInfomation}</h2>
          </div>

          
          <div className="flex space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              {DashboardCompoMenu[language].nameChange}
            </button>
            <button
              onClick={() => googleConectHandle()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-center"
            >
              {DashboardCompoMenu[language].connectGoogle}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{DashboardCompoMenu[language].submitDocument}</h3>
          <div className="space-y-2">
            {submittedDocuments.map((doc) => (
              <div key={doc.Id} className="p-3 bg-blue-50 rounded-md shadow-sm">
                <p className="font-medium">{doc.course}</p>
                <p className="text-sm text-gray-600">{new Date(doc.createdDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">{doc.isDone ? DashboardCompoMenu[language].submitComplete : DashboardCompoMenu[language].submitIncomplete}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NameChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

"use client";

import { useAuth } from "@/app/hook/auth";
import { useEffect, useState } from "react";
import NameChangeModal from "../components/NameChangeModal";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/app/lib/customFetch";
import { DashboardCompoMenu, getError } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";
import { SubmittedDocument } from "@/app/common/types";

export default function DashboardCompo() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedDocuments, setSubmittedDocuments] = useState<
    SubmittedDocument[]
  >([]);
  const [isLink, setIsLink] = useState<boolean>(false);
  const customFetch = useCustomFetch();
  const [language, setLanguage] = useState<Language>(Language.korean);
  const [menuOpen, setMenuOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const googleConnectHandle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/link`);
  };

  // 조건부로 early return 하기 전에 useEffect는 항상 호출될 수 있도록 수정
  useEffect(() => {
    if (user) {
      setIsLink(user.isLinked);
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

  const toggleMenu = (id: number) => {
    setMenuOpen((prev) => ({
      ...prev,
      [id]: !prev[id], // 특정 문서의 상태만 토글
    }));
  };

  const fileDownload = async (filename: string) => {
    try {
      router.push(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/attachments/${filename}`
      );
    } catch (error) {
      alert(getError[language].fileDownloadError);
    }
  };

  useEffect(() => {}, [submittedDocuments]);
  if (!user) {
    return <div>{DashboardCompoMenu[language].loadingOrNotFoundUser}</div>;
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex flex-col sm:flex-row items-center space-x-2 mb-4 sm:mb-0">
            <h2 className="text-2xl font-semibold">
              {user.name} {DashboardCompoMenu[language].userInformation}
            </h2>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              {DashboardCompoMenu[language].nameChange}
            </button>

            {!isLink ? (
              <button
                onClick={() => googleConnectHandle()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-center"
              >
                {DashboardCompoMenu[language].connectGoogle}
              </button>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {DashboardCompoMenu[language].submitDocument}
          </h3>
          <div className="space-y-2">
            {submittedDocuments.map((doc) => (
              <div
                key={doc.Id}
                className="relative p-3 bg-blue-50 rounded-md shadow-sm flex justify-between"
              >
                <div>
                  <p className="font-medium">{doc[language]}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(doc.createdDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="relative">
                  <div className="font-medium">
                    <div className="flex items-center">
                      <div
                        className="w-20 flex justify-between cursor-pointer"
                        onClick={() => toggleMenu(doc.Id)}
                      >
                        <div>{DashboardCompoMenu[language].attachedFile}</div>
                        <div>⋮</div>
                      </div>
                    </div>
                  </div>

                  {menuOpen[doc.Id] && (
                    <nav className="absolute top-1/2 right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {doc.attachments?.map((item) => (
                          <li
                            key={item.filename}
                            onClick={() => fileDownload(item.filename)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {item.filename.substring(16)}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NameChangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

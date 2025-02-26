"use client";

import { useAuth } from "@/app/hook/auth";
import { useEffect, useState } from "react";
import NameChangeModal from "../components/NameChangeModal";
import { useRouter } from "next/navigation";
import useCustomFetch from "@/app/lib/customFetch";

interface SubmittedDocument {
  Id: number;
  course: string;
  createdDate: string;
  isDone: boolean;
}

export default function DashboardCompo() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedDocuments, setSubmittedDocuments] = useState<SubmittedDocument[]>([]);
  const customFetch = useCustomFetch();

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
    return <h2>로딩 중이거나 사용자 정보가 없습니다.</h2>;
  }

  return (
    
    <article className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-10">
      <section className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex flex-col sm:flex-row items-center space-x-2 mb-4 sm:mb-0">
            <h2 className="text-2xl font-semibold">{user.name} 님의 정보</h2>
          </div>

          
          <div className="flex space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              이름 변경
            </button>
            <button
              onClick={() => googleConectHandle()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-center"
            >
              구글 연동
            </button>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">제출한 서류</h3>
          <div className="space-y-2">
            {submittedDocuments.map((doc) => (
              <article key={doc.Id} className="p-3 bg-blue-50 rounded-md shadow-sm">
                <p className="font-medium">{doc.course} 서류</p>
                <p className="text-sm text-gray-600">{new Date(doc.createdDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">{doc.isDone ? '제출 완료' : '제출 미완료'}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <NameChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </article>
  );
}

"use client";

import { useAuth } from "@/app/hook/auth";
import { useState } from "react";
import NameChangeModal from "../components/NameChangeModal";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

export default function DashboardCompo() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submittedDocuments = [
    { id: 1, title: "주민등록등본 제출", date: "2025-01-15" },
  ]; // 예시 값, 백엔드 로직 완성 시 수정 예정

  const googleConectHandle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/link`)
  }

  if (!user) {
    return <div>로딩 중이거나 사용자 정보가 없습니다.</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex flex-col sm:flex-row items-center space-x-2 mb-4 sm:mb-0">
            <h2 className="text-2xl font-semibold">{user.name} 님의 정보</h2>
          </div>

          {/* 버튼들 */}
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

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center"> 
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">제출한 서류</h3>
          <div className="space-y-2">
            {submittedDocuments.map((doc) => (
              <div key={doc.id} className="p-3 bg-blue-50 rounded-md shadow-sm">
                <p className="font-medium">{doc.title}</p>
                <p className="text-sm text-gray-600">{doc.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <NameChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

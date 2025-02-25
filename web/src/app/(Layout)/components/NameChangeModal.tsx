"use client";

import { useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";

interface NameChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NameChangeModal({ isOpen, onClose }: NameChangeModalProps) {
  const [newName, setNewName] = useState("");
  const customFetch = useCustomFetch();

  if (!isOpen) return null;

  const handleNameChange = async () => {
    try {
      const response = await customFetch("/users/name", {
        method: "PATCH",
        body: JSON.stringify({ name: newName }),
      });

      if (response && response.message === "이름을 성공적으로 변경했습니다.") {
        console.log("이름이 성공적으로 변경되었습니다.");
        alert("이름이 성공적으로 변경되었습니다.");
      } else {
        console.error("이름 변경에 실패했습니다:", response.message || "알 수 없는 오류");
        alert(`이름 변경에 실패했습니다: ${response.message || "알 수 없는 오류"}`);
      }

      onClose();
    } catch (error) {
      console.error("이름 변경 중 오류가 발생했습니다:", error);
      alert("이름 변경 중 오류가 발생했습니다.");
      onClose();  // 오류가 나도 모달은 닫아줌
    }
  };

  return (
    <dialog className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <section className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">이름 변경</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="새로운 이름 입력"
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex justify-end gap-2 p-2 rounded-md">
          <button
            onClick={handleNameChange} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            저장
          </button>
          
          <button
            onClick={onClose} 
            className="px-4 py-2 bg-blue-300 text-white rounded-md"
          >
            취소
          </button>
        </div>
      </section>
    </dialog>
  );
}

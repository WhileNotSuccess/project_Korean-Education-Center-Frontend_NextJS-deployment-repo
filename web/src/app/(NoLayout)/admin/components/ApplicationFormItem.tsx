"use client";
import { ApplicationFormItemProp } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFormFetch";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function ApplicationFormItem(data: ApplicationFormItemProp) {
  const customFetch = useCustomFetch();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  const updateIsDone = async () => {
    const formData = new FormData();
    formData.append("isDone", data.isDone ? "false" : "true");
    const response = await customFetch(`/application-form/${data.id}`, {
      method: "PATCH",
      body: formData,
    });
    if (response.ok) {
      window.location.href = location.href;
    }
  };

  return (
    <article className="flex m-3 select-none">
      {modalDeleteOpen && (
        <DeleteModal
          onClose={() => {
            setModalDeleteOpen(false);
          }}
          id={data.id}
          target="application-form"
        />
      )}
      <div className="w-72 p-5 bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 rounded-2xl transition-all duration-300 flex flex-col justify-between relative">
        <div>
          <header className="w-full relative flex items-center justify-between">
            <h2 className="text-slate-900 font-bold text-lg">
              {data.userName}
            </h2>
            <div className="relative">
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
              >
                ⋮
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-100 rounded-xl shadow-lg z-10 py-1">
                  <button
                    onClick={() => {
                      setModalDeleteOpen(true);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 text-xs font-semibold text-rose-600 transition-colors"
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </header>

          <hr className="my-3 border-slate-100" />
          
          <section className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center">
              <span className="w-5 text-slate-400 text-sm">📧</span>
              <span className="font-medium truncate block max-w-[200px]" title={data.userEmail || ""}>
                {data.userEmail}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-5 text-slate-400 text-sm">📱</span>
              <span className="font-medium">{data.phoneNumber}</span>
            </div>
          </section>

          <hr className="my-3 border-slate-100" />
          
          {/* 첨부파일 영역 */}
          <div className="space-y-1.5 h-32 overflow-y-auto pr-1">
            {data.attachments && data.attachments.length > 0 ? (
              data.attachments.map((item) => (
                <div
                  onClick={() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.filename}`;
                  }}
                  className="flex items-center p-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 text-slate-700 cursor-pointer transition-all text-xs"
                  key={item.id}
                >
                  <span className="mr-1.5 text-slate-400">📄</span>
                  <span className="font-medium truncate block max-w-[190px]" title={item.filename}>
                    {item.filename}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-slate-400 font-medium">
                첨부파일 없음
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
          {/* 상태 표시 뱃지 및 상태 변환 버튼 */}
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">상태</span>
          <button
            onClick={updateIsDone}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 shadow-sm ${
              data.isDone
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            }`}
          >
            {data.isDone ? "완료됨" : "처리전"}
          </button>
        </div>
      </div>
    </article>
  );
}

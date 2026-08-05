"use client";
import { Course } from "@/app/common/types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import CourseModal from "./CourseModal";

export default function CourseComponent(item: Course) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  return (
    <section className="flex m-3 select-none">
      {modalUpdateOpen && (
        <CourseModal
          onClose={() => {
            setModalUpdateOpen(false);
          }}
          data={item}
          method="PATCH"
        />
      )}
      {modalDeleteOpen && (
        <DeleteModal
          onClose={() => {
            setModalDeleteOpen(false);
          }}
          id={item.id}
          target="course"
        />
      )}
      <article className="w-80 p-5 bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 rounded-2xl transition-all duration-300 flex flex-col justify-between relative">
        <div>
          <header className="w-full relative flex items-center justify-between">
            <h2 className="text-slate-900 font-bold text-lg">
              {item.korean}
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
                      setModalUpdateOpen(true);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    수정하기
                  </button>
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
          
          <section className="space-y-3 text-xs text-slate-600">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100/50">
              <span className="font-semibold text-slate-400">🇺🇸 English</span>
              <span className="font-semibold text-slate-700">{item.english}</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100/50">
              <span className="font-semibold text-slate-400">🇯🇵 Japanese</span>
              <span className="font-semibold text-slate-700">{item.japanese}</span>
            </div>
          </section>
        </div>
      </article>
    </section>
  );
}

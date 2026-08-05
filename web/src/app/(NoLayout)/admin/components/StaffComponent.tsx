"use client";
import { Teacher } from "@/app/common/types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import StaffModal from "./StaffModal";

export default function StaffComponent({
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  orderNumber,
  ...item
}: Teacher & {
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLElement>) => void;
  orderNumber?: number;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  return (
    <section
      className="flex m-3 cursor-move select-none"
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {modalUpdateOpen && (
        <StaffModal
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
          target="staff"
        />
      )}
      <article className="w-72 p-5 bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 rounded-2xl transition-all duration-300 flex flex-col justify-between relative group">
        <div>
          {/* Grab-grip handle icon */}
          <div className="flex justify-center mb-3">
            <svg width="24" height="12" viewBox="0 0 24 12" className="text-slate-200 group-hover:text-slate-300 transition-colors pointer-events-none">
              <circle cx="6" cy="3" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="3" r="1.5" fill="currentColor"/>
              <circle cx="18" cy="3" r="1.5" fill="currentColor"/>
              <circle cx="6" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="18" cy="9" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <header className="w-full relative flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {orderNumber !== undefined && (
                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                  #{orderNumber}
                </span>
              )}
              <h2 className="text-slate-900 font-bold text-lg">
                {item.name}
              </h2>
            </div>
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
          
          <section className="space-y-2.5 text-xs">
            <div className="flex items-center text-slate-600">
              <span className="w-5 text-sm text-slate-400">📧</span>
              <span className="font-medium truncate block max-w-[200px]" title={item.email || ""}>
                {item.email || "-"}
              </span>
            </div>
            <div className="flex items-center text-slate-600">
              <span className="w-5 text-sm text-slate-400">📞</span>
              <span className="font-medium">{item.phone || "-"}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <span className="w-5 text-sm text-slate-400">💼</span>
              <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {item.position}
              </span>
              {item.subrole && (
                <span className="ml-1.5 text-slate-500 font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                  {item.subrole}
                </span>
              )}
            </div>
          </section>
        </div>
      </article>
    </section>
  );
}

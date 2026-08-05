import { Banner } from "@/app/common/types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { formatDate } from "@/app/common/formatDate";
import Image from "next/image";

export default function BannerItem(props: Banner) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  return (
    <article className="flex m-3 select-none">
      {modalDeleteOpen && (
        <DeleteModal
          onClose={() => {
            setModalDeleteOpen(false);
          }}
          id={props.id}
          target="banners"
        />
      )}
      <section className="w-[420px] p-5 bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 rounded-2xl transition-all duration-300 flex flex-col relative">
        <div className="w-full relative">
          <figure className="overflow-hidden rounded-xl bg-slate-100 aspect-[16/9] relative border border-slate-100">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.image}`}
              alt="배너 이미지"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              unoptimized={true}
            />
          </figure>
          
          {/* Action Menu button in absolute top-right of image card */}
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              className="w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
            >
              ⋮
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-100 rounded-xl shadow-lg py-1">
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
        </div>

        <hr className="my-4 border-slate-100" />
        
        <div className="space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-5 text-slate-400 text-sm">🌐</span>
              <span className="font-semibold text-slate-500">언어</span>
            </div>
            <span className="font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded uppercase">
              {props.language}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-5 text-slate-400 text-sm">🔗</span>
              <span className="font-semibold text-slate-500">이동 주소</span>
            </div>
            <span className="font-medium truncate max-w-[240px] text-blue-600 hover:underline" title={props.url || ""}>
              {props.url || "-"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-5 text-slate-400 text-sm">📅</span>
              <span className="font-semibold text-slate-500">만료일</span>
            </div>
            <span className="font-medium text-slate-700">
              {formatDate(props.expiredDate)}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}

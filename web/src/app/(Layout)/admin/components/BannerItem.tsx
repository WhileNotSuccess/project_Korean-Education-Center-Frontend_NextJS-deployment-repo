import { Banner } from "@/app/common/types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { formatDate } from "@/app/common/formatDate";
import Image from "next/image";

export default function BannerItem(props: Banner) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  return (
    <article className="flex m-2">
      {modalDeleteOpen && (
        <DeleteModal
          onClose={() => {
            setModalDeleteOpen(false);
          }}
          id={props.id}
          target="banners"
        />
      )}
      <section className="w-full p-4 bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="w-full relative">
          <figure>
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.image}`}
            alt=""
            width={2000}
            height={300}
            unoptimized={true}
          />
        </figure>
          <span
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            className="float-right cursor-pointer"
          >
            ㅤㅤ⋮
          </span>
          {menuOpen && (
            <nav className="absolute top-full right-0 mt-8 w-40 bg-white border rounded shadow-lg">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  onClick={() => {
                    setModalDeleteOpen(true);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  삭제
                </li>
              </ul>
            </nav>
          )}
        </div>

        <hr className="my-2 border-gray-300" />
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🌐</span>
            <span className="font-medium">언어: {props.language}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📃</span>
            <span className="font-medium">
              배너 클릭시 이동할 주소: {props.url}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📅</span>
            <span className="font-medium">
              배너 만료일: {formatDate(props.expiredDate)}
            </span>
          </div>
        </div>
        <div className="mt-4"></div>
      </section>
    </article>
  );
}

"use client";
import {Course } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFormFetch";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import CourseModal from "./CourseModal";

export default function CourseComponent(item: Course) {
  const customFetch = useCustomFetch();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  return (
    <section className="flex m-2">
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
      <article className="w-80 p-4 bg-white shadow-lg rounded-lg border border-gray-200 ">
        <header className="w-full relative">
          <h2 className="text-blue-500 font-bold text-lg inline-block">
            {item.korean}
          </h2>
          <span
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            className="float-right cursor-pointer"
          >
            ㅤㅤ⋮
          </span>
          {menuOpen && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border rounded shadow-lg">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  onClick={() => {
                    setModalDeleteOpen(true);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  삭제
                </li>
                <li
                  onClick={() => {
                    setModalUpdateOpen(true);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  수정
                </li>
              </ul>
            </div>
          )}
        </header>

        <hr className="my-2 border-gray-300" />
        <section className="space-y-2 h-30 overflow-y-auto">
          <div className="flex items-center text-gray-700">
            <span className="font-medium">{item.japanese}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="font-medium">{item.english}</span>
          </div>
        </section>
      </article>
    </section>
  );
}

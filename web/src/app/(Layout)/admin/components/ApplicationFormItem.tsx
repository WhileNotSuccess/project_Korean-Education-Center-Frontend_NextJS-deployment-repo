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
    if (response) {
      window.location.href = location.href;
    }
  };
  return (
    <article className="flex m-2">
      {modalDeleteOpen && (
        <DeleteModal
          onClose={() => {
            setModalDeleteOpen(false);
          }}
          id={data.id}
          target="application-form"
        />
      )}
      <div className="w-72 p-4 bg-white shadow-lg rounded-lg border border-gray-200 ">
        <div className="w-full relative">
          <h2 className="text-blue-500 font-bold text-lg inline-block">
            {data.userName}
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
              </ul>
            </div>
          )}
        </div>
        <hr className="my-2 border-gray-300" />
        <div>📧: {data.userEmail}</div>
        <div>📱: {data.phoneNumber}</div>

        <hr className="my-2 border-gray-300" />
        <div className="space-y-2 h-40 overflow-y-auto">
          {data.attachments.map((item) => (
            <div
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.filename}`;
              }}
              className="flex items-center text-gray-700 cursor-pointer"
              key={item.id}
            >
              <span className="mr-2">📄</span>
              <span className="font-medium">{item.filename}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={updateIsDone}
            className={`${
              data.isDone ? "bg-gray-400" : "bg-blue-500"
            } text-white px-4 py-1 rounded-md text-sm font-semibold`}
          >
            {data.isDone ? "완료됨" : "처리전"}
          </button>
        </div>
      </div>
    </article>
  );
}

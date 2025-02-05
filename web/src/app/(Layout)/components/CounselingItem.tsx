import { Counseling } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useState } from "react";
import CounselingItemUpdateModal from "./CounselingItemUpdateModal";
import { formatDateWithTime } from "@/app/common/formatDateWithTime";
import CounselingItemDeleteModal from "./CounselingItemDeleteModal";

export default function CounselingItem(props: Counseling) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState<boolean>(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const customFetch = useCustomFetch();
  const onClick = async () => {
    const response = await customFetch(`/consult/${props.id}`, {
      method: "PATCH",
      body: JSON.stringify({ isDone: !props.isDone }),
    });
    if (response) {
      window.location.href = location.href;
    }
  };
  return (
    <div className="flex m-2">
      {modalUpdateOpen && (
        <CounselingItemUpdateModal
          onClose={() => {
            setModalUpdateOpen(false);
          }}
          data={props}
        />
      )}
      {modalDeleteOpen && (
        <CounselingItemDeleteModal
          onClose={() => {
            setModalDeleteOpen(false);
          }}
          id={props.id}
        />
      )}
      <div className="w-72 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="w-full relative">
          <h2 className="text-blue-500 font-bold text-lg inline-block">
            {props.name}
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
        </div>

        <hr className="my-2 border-gray-300" />
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📞</span>
            <span className="font-medium">{props.phone}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📧</span>
            <span className="font-medium">{props.email}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📅</span>
            <span className="font-medium">
              {formatDateWithTime(props.schedule)}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={onClick}
            className={`${
              props.isDone ? "bg-gray-400" : "bg-blue-500"
            } text-white px-4 py-1 rounded-md text-sm font-semibold`}
          >
            {props.isDone ? "완료됨" : "진행전"}
          </button>
        </div>
      </div>
    </div>
  );
}

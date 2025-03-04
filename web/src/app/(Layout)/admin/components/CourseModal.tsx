import {Course} from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  method: string;
  data?: Course;
};

export default function CourseModal({ onClose, data, method }: ModalProps) {
  const [inputs, setInputs] = useState<Course>(
    data
      ? data
      : {
          id: 0,
          korean: "",
          japanese: "",
          english: "",
        }
  );

  const customFetch = useCustomFetch();

  const onSubmit = async () => {
    const response = await customFetch(
      method == "POST" ? `/course` : `/course/${inputs.id}`,
      {
        method: method,
        body: JSON.stringify({
          korean: inputs.korean,
          japanese: inputs.japanese,
          english: inputs.english,
        }),
      }
    );

    if (response) {
      window.location.href = location.href;
    }
  };
  return createPortal(
    <dialog
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        <label
          htmlFor="korean"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          korean
        </label>

        <input
          value={inputs.korean || ""}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, korean: e.target.value }));
          }}
          type="text"
          id="korean"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="japanese"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          japanese
        </label>

        <input
          value={inputs.japanese || ""}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, japanese: e.target.value }));
          }}
          type="japanese"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <label
          htmlFor="english"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          english
        </label>

        <input
          value={inputs.english}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, english: e.target.value }));
          }}
          type="text"
          id="english"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="p-4 text-center">
          <button
            onClick={onSubmit}
            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {method == "POST" ? "추가하기" : "수정하기"}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
}

import parser from "html-react-parser";
import { useState } from "react";
import { createPortal } from "react-dom";
import TranslationEditorComponent from "./TranslationEditorCompo";
import TranslationUpdateModal from "./TranslationUpdateModal";

type ModalProps = {
  onClose: () => void;
  enUpdate:()=>void;
  jaUpdate:()=>void;
  htmlEn: string;
  htmlJa: string;
};

export default function TranslationModal({ onClose,enUpdate,jaUpdate, htmlEn, htmlJa }: ModalProps) {

  return createPortal(
    <dialog
      id="popup-modal"
      tabIndex={-1}
      className="fixed w-full h-full inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="relative overflow-y-auto p-4 w-3/4 h-3/4 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        <div className="ml-5 mr-5 flex space-x-8 justify-between">
          <div className="p-4 text-center w-1/2">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              영어 번역본
            </h3>
            <div className="border-2 border-solid">{parser(htmlEn)}</div>
            <button onClick={enUpdate} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">수정하기</button>
          </div>
          <div className="p-4 text-center w-1/2">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              일본어 번역본
            </h3>
            <div className="border-2 border-solid">{parser(htmlJa)}</div>
            <button onClick={jaUpdate} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">수정하기</button>
          </div>
        </div>
        <button
        onClick={()=>{alert('업로드 완료!')}}
          className="absolute sticky text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          업로드
        </button>
      </div>
    </dialog>,
    document.body
  );
}

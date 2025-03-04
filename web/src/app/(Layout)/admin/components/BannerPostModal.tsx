import { Counseling } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFormFetch";

import { url } from "inspector";
import { useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
};

export default function BannerPostModal({ onClose }: ModalProps) {
  const [inputs, setInputs] = useState({
    language: "",
    url: "",
    expiredDate: "",
  });

  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const customFetch = useCustomFetch();
  const onSubmit = async () => {
    if (!image || !inputs.expiredDate || !inputs.language || !inputs.url) {
      return;
    }
    const formData = new FormData();
    formData.append("url", inputs.url);
    formData.append("language", inputs.language);
    formData.append("expiredDate", inputs.expiredDate);
    formData.append("image", image);
    for (const [key, value] of formData.entries()) {

    }
    const response = await customFetch(`/banners`, {
      method: "POST",
      body: formData,
    });

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
      <article className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        {image ? <img src={preview} alt="" /> : null}
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          이미지 선택
        </label>

        <input
          onChange={(e) => {
            if (e.target.files) {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(e.target.files[0]);
              fileReader.onload = () => {
                if (typeof fileReader.result === "string")
                  setPreview(fileReader.result);
              };
              setImage(e.target.files[0]);
            }
          }}
          type="file"
          id="image"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="url"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          배너 클릭시 이동할 URL
        </label>

        <input
          value={inputs.url}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, url: e.target.value }));
          }}
          type="text"
          id="url"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="language"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          배너의 언어
        </label>

        <input
          value={inputs.language}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, language: e.target.value }));
          }}
          type="text"
          id="language"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="expiredDate"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          배너 만료일자
        </label>

        <input
          value={inputs.expiredDate}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, expiredDate: e.target.value }));
          }}
          type="date"
          id="expiredDate"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <div className="p-4 text-center">
          <button
            onClick={onSubmit}
            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            업로드
          </button>
        </div>
      </article>
    </dialog>,
    document.body
  );
}

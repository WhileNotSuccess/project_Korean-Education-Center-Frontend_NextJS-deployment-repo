
import useCustomFetch from "@/app/lib/customFetch";

import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  id: number;
  target: string;
};

export default function DeleteModal({ onClose, id, target }: ModalProps) {
  const customFetch = useCustomFetch();

  const onSubmit = async () => {
    const response = await customFetch(`/${target}/${id}`, {
      method: "DELETE",
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
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <div className="p-4 text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            정말로 삭제하시겠습니까?
          </h3>
          <button
            onClick={onSubmit}
            className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            삭제하기
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
}

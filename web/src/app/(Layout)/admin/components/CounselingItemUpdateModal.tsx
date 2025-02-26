import { Counseling } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  data: Counseling;
};

export default function CounselingItemUpdateModal({
  onClose,
  data,
}: ModalProps) {
  const [inputs, setInputs] = useState<Counseling>(data);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const customFetch = useCustomFetch();
  const convertToUTC = (time: string) => {
    const kstDate = new Date(`${time}+09:00`);

    const utcDate = new Date(kstDate.toISOString());

    return utcDate.toISOString();
  };
  const onSubmit = async () => {
    const schedule = selectedTime
      ? convertToUTC(selectedTime)
      : inputs.schedule;
    const response = await customFetch(`/consult/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        email: inputs.email,
        phone: inputs.phone,
        schedule: schedule,
        name: inputs.name,
      }),
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
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          email
        </label>

        <input
          value={inputs.email}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, email: e.target.value }));
          }}
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          phone
        </label>

        <input
          value={inputs.phone}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, phone: e.target.value }));
          }}
          type="text"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="schedule"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          schedule
        </label>

        <input
          value={selectedTime}
          onChange={(e) => {
            setSelectedTime(e.target.value);
          }}
          type="datetime-local"
          id="schedule"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          name
        </label>

        <input
          value={inputs.name}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, name: e.target.value }));
          }}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="p-4 text-center">
          <button
            onClick={onSubmit}
            className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            수정하기
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
}

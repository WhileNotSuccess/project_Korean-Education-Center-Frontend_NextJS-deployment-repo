import { formatDate } from "@/app/common/formatDate";
import { Application } from "@/app/common/types";
type ApplicationFormItemProp = {
  data: Application;
};
export default function ApplicationFormItem({ data }: ApplicationFormItemProp) {
  const props = {
    name: "홍길동",
    isDone: "",
  };
  const array = [
    "filename1.jpg",
    "filename2.jpg",
    "filename3.jpg",
    "filename4.jpg",
    "filename5.jpg",
    "filename6.jpg",
    "filename7.jpg",
    "filename8.jpg",
  ];
  return (
    <div className="flex m-2">
      <div className="w-72 p-4 bg-white shadow-lg rounded-lg border border-gray-200 h-full">
        <h2 className="text-blue-500 font-bold text-lg">{props.name}</h2>
        <hr className="my-2 border-gray-300" />
        <div className="space-y-2 h-40 overflow-y-auto">
          {array.map((item) => (
            <div
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item}`;
              }}
              className="flex items-center text-gray-700"
              key={item}
            >
              <span className="mr-2">📄</span>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            className={`${
              props.isDone ? "bg-gray-400" : "bg-blue-500"
            } text-white px-4 py-1 rounded-md text-sm font-semibold`}
          >
            {props.isDone ? "완료됨" : "처리전"}
          </button>
        </div>
      </div>
    </div>
  );
}

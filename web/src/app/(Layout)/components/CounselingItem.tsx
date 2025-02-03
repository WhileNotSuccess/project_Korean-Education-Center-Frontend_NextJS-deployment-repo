import { formatDate } from "@/app/common/formatDate";
import { Counseling } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";

export default function CounselingItem(props: Counseling) {
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
      <div className="w-72 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-blue-500 font-bold text-lg">{props.name}</h2>
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
            <span className="font-medium">{formatDate(props.schedule)}</span>
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

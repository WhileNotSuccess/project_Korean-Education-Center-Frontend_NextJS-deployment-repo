import BoardPageCompo from "../../components/BoardPageCompo";
import { CategoryParams } from "@/app/common/types";

export default async function BoardPage({ params }: {params : CategoryParams}) {
  const { category } = params;

  return (
    <div className="w-full flex justify-center items-center">
      <BoardPageCompo name={category} />
    </div>
  );
}

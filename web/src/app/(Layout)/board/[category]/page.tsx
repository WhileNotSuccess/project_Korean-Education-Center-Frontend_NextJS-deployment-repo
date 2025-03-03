import { boardMenu } from "@/app/menu";
import BoardPageCompo from "../../components/BoardPageCompo";
import { Language } from "@/app/common/types";

export default async function BoardPage({ params }: any) {
  const { category } = params;

  return (
    <div className="w-full flex justify-center items-center">
      <BoardPageCompo name={category} />
    </div>
  );
}

import BoardPageCompo from "../../components/BoardPageCompo";
import { CategoryParams } from "@/app/common/types";

type Props = {
  params: Promise<CategoryParams>
}

export default async function BoardPage({ params }: Props) {
  const resolvedParams = await params;
  
  const { category } = resolvedParams;

  return (
    <div className="w-full flex justify-center items-center">
      <BoardPageCompo name={category} />
    </div>
  );
}

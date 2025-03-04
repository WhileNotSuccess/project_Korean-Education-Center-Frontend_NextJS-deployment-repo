import { categoryMap } from "@/app/menu";
import SelectTabComponent from "../../components/SelectPageCompo";
import { CategoryParams } from "@/app/common/types";

export default async function SelectTabPage({ params }: { params : CategoryParams }) {
  const { category } = params;
  const categoryTab = categoryMap[category];

  return (
    <div className="w-full flex justify-center items-center">
      <SelectTabComponent name={category} categoryTab={categoryTab} />
    </div>
  );
}

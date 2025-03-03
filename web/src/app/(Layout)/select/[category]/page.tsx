import { categoryMap } from "@/app/menu";
import SelectTabComponent from "../../components/SelectPageCompo";

export default async function SelectTabPage({ params }: any) {
  const { category } = params;
  const categoryTab = categoryMap[category];

  return (
    <div className="w-full flex justify-center items-center">
      <SelectTabComponent name={category} categoryTab={categoryTab} />
    </div>
  );
}

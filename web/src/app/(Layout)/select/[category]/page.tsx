import { categoryMap } from "@/app/menu";
import SelectTabComponent from "../../components/SelectPageCompo";

type SelectTabProps = {
  params: {
    category: string;
  };
};

export default function SelectTabPage({ params }: SelectTabProps) {
  const { category } = params;
  const categoryTab = categoryMap[category];

  return (
    <div className="w-full flex justify-center items-center">
      <SelectTabComponent name={category} categoryTab={categoryTab} />
    </div>
  );
}

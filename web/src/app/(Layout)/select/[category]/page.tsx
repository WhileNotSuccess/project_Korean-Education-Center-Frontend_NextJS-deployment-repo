import { categoryMap } from "@/app/menu";
import SelectTabComponent from "../../components/SelectPageCompo";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

type SelectTabProps = {
  params: {
    category: string;
  };
};

export default function SelectTabPage({ params }: SelectTabProps) {
  const { category } = params;

  const categoryTab = categoryMap[category];

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SelectTabComponent name={category} categoryTab={categoryTab} />
    </div>
  );
}

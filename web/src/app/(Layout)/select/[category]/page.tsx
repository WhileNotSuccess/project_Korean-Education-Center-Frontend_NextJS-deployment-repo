import { categoryMap } from "@/app/menu";
import SelectTabComponent from "../../components/SelectPageCompo";


type Props = {
  params: Promise<any>;
};

export default async function SelectTabPage({ params }: Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;
  const categoryTab = categoryMap[category];

  return (
    <div className="w-full flex justify-center items-center">
      <SelectTabComponent name={category} categoryTab={categoryTab} />
    </div>
  );
}

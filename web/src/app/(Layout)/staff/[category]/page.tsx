import StaffIntro from "../../components/StaffIntro";
import { CategoryParams } from "@/app/common/types";

type Props = {
  params : Promise<CategoryParams>
}


export default async function CenterIntro({ params }: Props) {
  const resolvedParams = await params;
  
  const { category } = resolvedParams;

  return (
    <main className="w-full flex justify-center items-center">
      <StaffIntro name={category} />
    </main>
  );
}

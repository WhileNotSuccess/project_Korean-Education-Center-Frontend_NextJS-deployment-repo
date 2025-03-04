import StaffIntro from "../../components/StaffIntro";
import { CategoryParams } from "@/app/common/types";

export default async function CenterIntro({ params }: { params : CategoryParams}) {
  const { category } = params;

  return (
    <main className="w-full flex justify-center items-center">
      <StaffIntro name={category} />
    </main>
  );
}

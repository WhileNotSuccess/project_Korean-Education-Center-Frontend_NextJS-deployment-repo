import { smallMenu } from "@/app/menu";
import StaffIntro from "../../components/StaffIntro";
import { Language } from "@/app/common/types";

export default async function CenterIntro({ params }: any) {
  const { category } = params;

  return (
    <main className="w-full flex justify-center items-center">
      <StaffIntro name={category} />
    </main>
  );
}

import { smallMenu } from "@/app/menu";
import StaffIntro from "../../components/StaffIntro";
import { Language } from "@/app/common/types";

interface StaffPageProps {
  params : {
  category : keyof typeof smallMenu[Language]
  }
}

export default function CenterIntro({params}: StaffPageProps) {
  const {category} = params

  return (
    <main className="w-full flex justify-center items-center">
      <StaffIntro name={category}/>
    </main>
  );
}

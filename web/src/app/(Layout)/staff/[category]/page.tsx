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
    <main className="w-full h-screen flex justify-center items-center">
      <StaffIntro name={category}/>
    </main>
  );
}

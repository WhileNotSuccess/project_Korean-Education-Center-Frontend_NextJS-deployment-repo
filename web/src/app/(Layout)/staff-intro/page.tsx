import { smallMenu } from "@/app/menu";
import StaffIntro from "../components/StaffIntro";

export default function CenterIntro() {
  const name = smallMenu["korean"].staffIntro

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <StaffIntro category={name}/>
    </main>
  );
}

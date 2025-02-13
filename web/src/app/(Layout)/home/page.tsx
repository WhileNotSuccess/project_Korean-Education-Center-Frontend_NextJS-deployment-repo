import HomePageCompo from "../components/HomePageCompo";
import SetCookie from "../../common/Cookie";
import CheckNewUser from "@/app/(NoLayout)/components/CheckNewUser";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <SetCookie />
      <CheckNewUser />
      <HomePageCompo />
    </div>
  );
}

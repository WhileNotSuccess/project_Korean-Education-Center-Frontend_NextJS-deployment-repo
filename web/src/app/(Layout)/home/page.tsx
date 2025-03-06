import HomePageCompo from "../components/HomePageCompo";
import CheckNewUser from "@/app/(NoLayout)/components/CheckNewUser";

export default function Home() {
  return (
    <div className="w-full">
      <CheckNewUser />
      <HomePageCompo />
    </div>
  );
}

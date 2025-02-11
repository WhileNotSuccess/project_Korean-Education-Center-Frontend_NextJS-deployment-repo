import Link from "next/link";
import SetCookie from "../../common/Cookie";
import HomePageCompo from "../components/HomePageCompo";

export default function Home() {



  return (
    <div className="w-full h-screen">
      <SetCookie/>
      <HomePageCompo/>
    </div>
  );
}

import SetCookie from "../../common/Cookie";
import CheckNewUser from "@/app/(NoLayout)/components/CheckNewUser";


export default function Home() {



  return (
    <div className="w-full h-screen">
      <SetCookie/>
      <CheckNewUser/>
    <div>home 페이지입니다.</div>
    </div>
  );
}

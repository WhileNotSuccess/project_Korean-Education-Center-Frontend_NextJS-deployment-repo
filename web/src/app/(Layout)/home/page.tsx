import SetCookie from "../../common/Cookie";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <SetCookie />
      <div>home 페이지입니다.</div>
    </div>
  );
}

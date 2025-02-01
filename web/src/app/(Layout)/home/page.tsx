
import Link from "next/link";

export default function Home() {


  return (
    <div className="w-full h-screen">
    <div>home 페이지입니다.</div>
    <div className="w-3/5 border flex flex-row">
      {/* {testtest.map((test)=>{
        return(
          <Link href={`/guidance/${name}`} className="w-1/4 border-2 flex flex-wrap">
            {test}
          </Link>
        )
      })} */}
    </div>
    </div>
  );
}

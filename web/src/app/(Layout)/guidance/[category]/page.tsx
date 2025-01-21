import { guidanceMenu } from "@/app/menu"
import HtmlDocs from "../../components/htmlDocs"


interface GuidancePageProps {
  params : {
  category : keyof typeof guidanceMenu["korean"] // 
  // category : string 
  }
}


export default function GuidancePage( {params} : GuidancePageProps ){
  const {category} = params

  return(
    <div className="w-full h-screen flex justify-center items-center">
      <HtmlDocs name={category}/>
    </div>
  )
}
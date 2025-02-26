import { guidanceMenu } from "@/app/menu"
import HtmlDocs from "../../components/HtmlDocs"
import { Language } from "@/app/common/types"


interface GuidancePageProps {
  params : {
  category : keyof typeof guidanceMenu[Language] // 
  // category : string 
  }
}


export default function GuidancePage( {params} : GuidancePageProps ){
  const {category} = params

  return(
    <div className="w-full flex justify-center items-center">
      <HtmlDocs category={category}/>
    </div>
  )
}
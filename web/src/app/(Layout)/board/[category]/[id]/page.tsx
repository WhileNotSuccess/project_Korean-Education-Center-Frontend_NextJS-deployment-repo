import HtmlDocs from "@/app/(Layout)/components/HtmlDocs"


interface GuidancePageProps {
  params : {
    id : string
  }
}


export default function GuidancePage( {params} : GuidancePageProps ){
  const {id} = params


  return(
    <div className="w-full h-screen flex justify-center items-center">
      <HtmlDocs id={id}/>
    </div>
  )
}
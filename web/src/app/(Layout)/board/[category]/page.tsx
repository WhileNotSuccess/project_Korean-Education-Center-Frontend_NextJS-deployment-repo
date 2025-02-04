import { boardMenu } from "@/app/menu"
import BoardPageCompo from "../../components/BoardPageCompo"


interface BoardPageProps {
  params : {
  category : keyof typeof boardMenu["korean"]
  }
}


export default function BoardPage( {params} : BoardPageProps ){
  const {category} = params

  return(
    <div className="w-full h-screen flex justify-center items-center">
      <BoardPageCompo name={category}/>
    </div>
  )
}
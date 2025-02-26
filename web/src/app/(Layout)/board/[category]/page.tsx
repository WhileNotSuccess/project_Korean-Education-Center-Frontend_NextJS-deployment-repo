import { boardMenu } from "@/app/menu"
import BoardPageCompo from "../../components/BoardPageCompo"
import { Language } from "@/app/common/types";


interface BoardPageProps {
  params : {
  category : keyof typeof boardMenu[Language]
  }
}


export default function BoardPage( {params} : BoardPageProps ){
  const {category} = params

  return(
    <div className="w-full flex justify-center items-center">
      <BoardPageCompo name={category}/>
    </div>
  )
}
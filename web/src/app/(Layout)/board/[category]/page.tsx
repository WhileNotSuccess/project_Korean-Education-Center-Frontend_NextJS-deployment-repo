import BoardPageCompo from "../../components/BoardPageCompo";

type Props = {
  params : Promise<any>
}


export default async function BoardPage({ params } : Props) {
  const resolvedParams = await params

  const { category } = resolvedParams;


  return (
    <div className="w-full flex justify-center items-center">
      <BoardPageCompo name={category} />
    </div>
  );
}

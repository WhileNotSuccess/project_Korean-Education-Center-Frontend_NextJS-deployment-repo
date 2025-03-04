import StaffIntro from "../../components/StaffIntro";


type Props = {
  params : Promise<any>
}


export default async function CenterIntro({ params }: Props) {
  const resolvedParams = await params;
  
  const { category } = resolvedParams;

  return (
    <main className="w-full flex justify-center items-center">
      <StaffIntro name={category} />
    </main>
  );
}

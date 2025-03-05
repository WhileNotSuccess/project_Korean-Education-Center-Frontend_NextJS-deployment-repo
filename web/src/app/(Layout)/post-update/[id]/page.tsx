import EditorComponent from "../../components/EditorCompo";
import UserCheck from "../../components/UserCheck";

type Props = {
  params: Promise<any>
}

export default async function PostUpdateTest({ params }: Props) {
  const resolvedParams = await params;
  
  
  const { id } = resolvedParams;

  return (
    <main>
      <UserCheck/>
      <EditorComponent id={id} />
    </main>
  );
}

import EditorComponent from "../../components/EditorCompo";
import UserCheck from "../../components/UserCheck";
type Props = {
  params: Promise<any>
}

export default async function PostTest({ params }: Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return (
    <main>
      <UserCheck />
      <EditorComponent categoryName={category} />
    </main>
  );
}

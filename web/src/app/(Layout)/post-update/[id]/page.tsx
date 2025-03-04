import EditorComponent from "../../components/EditorCompo";

type Props = {
  params: Promise<any>
}

export default async function PostUpdateTest({ params }: Props) {
  const resolvedParams = await params;
  
  
  const { id } = resolvedParams;

  return (
    <main>
      <EditorComponent id={id} />
    </main>
  );
}

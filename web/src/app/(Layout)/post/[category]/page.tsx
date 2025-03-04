import EditorComponent from "../../components/EditorCompo";

type Props = {
  params: Promise<any>
}

export default async function PostTest({ params }: Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;
  return (
    <main>
      <EditorComponent categoryName={category} />
    </main>
  );
}

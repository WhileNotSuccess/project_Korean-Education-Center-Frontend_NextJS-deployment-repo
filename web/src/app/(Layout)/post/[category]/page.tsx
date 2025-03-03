import EditorComponent from "../../components/EditorCompo";

export default async function PostTest({ params }: any) {
  const { category } = params;
  return (
    <main>
      <EditorComponent categoryName={category} />
    </main>
  );
}

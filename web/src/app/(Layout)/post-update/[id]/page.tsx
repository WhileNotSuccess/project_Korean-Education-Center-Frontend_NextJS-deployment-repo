import EditorComponent from "../../components/EditorCompo";

export default async function PostUpdateTest({ params }: any) {
  const { id } = params;

  return (
    <main>
      <EditorComponent id={id} />
    </main>
  );
}

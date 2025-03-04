import { IdParams } from "@/app/common/types";
import EditorComponent from "../../components/EditorCompo";

export default async function PostUpdateTest({ params }: { params : IdParams}) {
  const { id } = params;

  return (
    <main>
      <EditorComponent id={id} />
    </main>
  );
}

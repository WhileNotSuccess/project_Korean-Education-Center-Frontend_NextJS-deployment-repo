import { CategoryParams } from "@/app/common/types";
import EditorComponent from "../../components/EditorCompo";

export default async function PostTest({ params }: { params : CategoryParams}) {
  const { category } = params;
  return (
    <main>
      <EditorComponent categoryName={category} />
    </main>
  );
}

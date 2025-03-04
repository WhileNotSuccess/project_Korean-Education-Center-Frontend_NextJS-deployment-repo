import HtmlDocs from "../../components/HtmlDocs";
import { CategoryParams } from "@/app/common/types";

type Props = {
  params: Promise<CategoryParams>
}

export default async function GuidancePage({ params }: Props) {
  const resolvedParams = await params;

  const { category } = resolvedParams;

  return (
    <div className="w-full flex justify-center items-center">
      <HtmlDocs category={category} />
    </div>
  );
}

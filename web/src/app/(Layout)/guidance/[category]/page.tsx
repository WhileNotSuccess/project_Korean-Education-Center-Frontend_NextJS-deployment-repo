import HtmlDocs from "../../components/HtmlDocs";
import { CategoryParams } from "@/app/common/types";

export default async function GuidancePage({ params }: {params : CategoryParams}) {
  const { category } = params;

  return (
    <div className="w-full flex justify-center items-center">
      <HtmlDocs category={category} />
    </div>
  );
}

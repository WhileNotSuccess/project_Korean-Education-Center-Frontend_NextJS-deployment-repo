import { guidanceMenu } from "@/app/menu";
import HtmlDocs from "../../components/HtmlDocs";
import { Language } from "@/app/common/types";

export default async function GuidancePage({ params }: any) {
  const { category } = params;

  return (
    <div className="w-full flex justify-center items-center">
      <HtmlDocs category={category} />
    </div>
  );
}

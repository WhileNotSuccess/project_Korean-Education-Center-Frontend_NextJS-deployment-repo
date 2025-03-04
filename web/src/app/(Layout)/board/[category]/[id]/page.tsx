import HtmlDocs from "@/app/(Layout)/components/HtmlDocs";
import { IdParams } from "@/app/common/types";

export default async function GuidancePage({ params }:  {params : IdParams}) {
  const { id } = params;

  return (
    <div className="w-full flex justify-center items-center">
      <HtmlDocs id={id} />
    </div>
  );
}

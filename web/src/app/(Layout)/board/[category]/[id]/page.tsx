import HtmlDocs from "@/app/(Layout)/components/HtmlDocs";
import { IdParams } from "@/app/common/types";

type Props = {
  params: Promise<IdParams>
}

export default async function GuidancePage({ params } : Props) {
  const resolvedParams = await params;
  
  const { id } = resolvedParams;

  return (
    <div className="w-full flex justify-center items-center">
      <HtmlDocs id={id} />
    </div>
  );
}

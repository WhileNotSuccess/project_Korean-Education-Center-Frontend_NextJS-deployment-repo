import HtmlDocs from "@/app/(Layout)/components/HtmlDocs";

export default async function GuidancePage({ params }: any) {
  const { id } = params;

  return (
    <div className="w-full flex justify-center items-center">
      <HtmlDocs id={id} />
    </div>
  );
}

import AdminComponent from "../components/AdminComponent";
import CheckAdmin from "../components/CheckAdmin";

type Props = {
  params: Promise<any>
}

export default async function ApplicationPage({ params }: Props) {
  const resolvedParams = await params;
  
  const { category } = resolvedParams;
  return (
    <div>
      <CheckAdmin />
      <AdminComponent category={category} />
    </div>
  );
}

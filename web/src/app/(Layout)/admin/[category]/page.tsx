import AdminComponent from "../components/AdminComponent";
import CheckAdmin from "../components/CheckAdmin";

export default async function ApplicationPage({ params }: any) {
  const { category } = params;
  return (
    <div>
      <CheckAdmin />
      <AdminComponent category={category} />
    </div>
  );
}

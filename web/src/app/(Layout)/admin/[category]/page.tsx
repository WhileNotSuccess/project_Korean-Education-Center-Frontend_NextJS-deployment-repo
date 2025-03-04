import AdminComponent from "../components/AdminComponent";
import CheckAdmin from "../components/CheckAdmin";
import { CategoryParams } from "@/app/common/types";

export default async function ApplicationPage({ params }: { params : CategoryParams}) {
  const { category } = params;
  return (
    <div>
      <CheckAdmin />
      <AdminComponent category={category} />
    </div>
  );
}

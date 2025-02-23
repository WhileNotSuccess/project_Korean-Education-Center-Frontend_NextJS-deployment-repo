import AdminComponent from "../components/AdminComponent";
import CheckAdmin from "../components/CheckAdmin";

interface AdminPageProps {
  params: {
    category: string;
  };
}

export default function ApplicationPage({ params }: AdminPageProps) {
  const { category } = params;
  return (
    <div>
      <CheckAdmin />
      <AdminComponent category={category} />
    </div>
  );
}

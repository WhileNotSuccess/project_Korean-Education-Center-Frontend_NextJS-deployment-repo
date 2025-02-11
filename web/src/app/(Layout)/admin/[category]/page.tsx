import AdminComponent from "../../components/AdminComponent";

interface AdminPageProps {
  params: {
    category: string;
  };
}

export default function AdminPage({ params }: AdminPageProps) {
  return (
    <div>
      <AdminComponent category={params.category} />
    </div>
  );
}

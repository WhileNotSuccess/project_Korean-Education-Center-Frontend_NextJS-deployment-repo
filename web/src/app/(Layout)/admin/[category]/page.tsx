import AdminComponent from "../../components/AdminComponent";

interface AdminPageProps {
  params: {
    category: string;
  };
}

export default function ApplicationPage({ params }: AdminPageProps) {
  const { category } = params;
  return (
    <div>
      <AdminComponent category={category} />
    </div>
  );
}

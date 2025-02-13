import AdminComponent from "../../components/AdminComponent";

interface AdminPageProps {
  params: {
    category: string;
  };
}


export default function ApplicationPage({ params }: ApplicationPageProps) {
  const {category} = params
  return (
    <div>
      <ApplicationComponent category={category} />
    </div>
  );
}

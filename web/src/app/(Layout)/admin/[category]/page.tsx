import ApplicationComponent from "../../components/ApplicationComponent";

interface ApplicationPageProps {
  params: {
    category: string;
  };
}

export default function ApplicationPage({ params }: ApplicationPageProps) {
  return (
    <div>
      <ApplicationComponent category={params.category} />
    </div>
  );
}

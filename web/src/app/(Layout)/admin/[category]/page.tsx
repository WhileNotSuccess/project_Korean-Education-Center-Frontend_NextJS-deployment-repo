import ApplicationComponent from "../../components/ApplicationComponent";

interface ApplicationPageProps {
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

import FormComponent from "../../components/FormCompo";
import { counselingForm } from "@/app/menu";

type FormProps = {
  params: {
    category: keyof typeof counselingForm["korean"];
  };
};

export default function FormPage({ params }: FormProps) {
  const { category } = params;

  
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <FormComponent category={category} />
    </div>
  );
}

import { koreancurriculumList,opencampusList, smallMenu } from "@/app/menu";
import SelectTabComponent from "../../components/SelectPageCompo";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

type selectTabProps = {
  params: {
    category: keyof typeof smallMenu["korean"];
  };
};

export default function SelectTabPage({ params }: selectTabProps) {
  const { category } = params; // category 지정
  const language: Language = (Cookies.get("language") as Language) || "korean";
  // category에 맞는 categoryTab 설정
  const categoryTab = category === "korean-curriculum" ? koreancurriculumList : opencampusList; // 임시 제작, 추후 수정 예정

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SelectTabComponent
        name={category}
        categoryTab={categoryTab}
      />
    </div>
  );
}

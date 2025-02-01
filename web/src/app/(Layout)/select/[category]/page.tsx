import { koreanCurriculumMenu, openCampusMenu, smallMenu } from "@/app/menu";
import SelectTabComponent from "../../components/selectPageCompo";

type selectTabProps = {
  params: {
    category: keyof typeof smallMenu["korean"];
  };
};

export default function SelectTabPage({ params }: selectTabProps) {
  const { category } = params; // category 지정

  // category에 맞는 tabKeys 설정
  const tabKeys = category === "koreanCurriculum" ? koreanCurriculumMenu : openCampusMenu; // 임시 제작, 추후 수정 예정

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SelectTabComponent
        name={category}
        tabKeys={tabKeys}
      />
    </div>
  );
}

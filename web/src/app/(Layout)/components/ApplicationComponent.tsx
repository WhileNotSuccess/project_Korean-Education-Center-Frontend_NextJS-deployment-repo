"use client";

import { Application, Counseling } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import CounselingItem from "./CounselingItem";
import ApplicationFormItem from "./ApplicationFormItem";

type ApplicationComponentProps = {
  category: string;
};

export default function ApplicationComponent({
  category,
}: ApplicationComponentProps) {
  const customFetch = useCustomFetch();
  const [counselingList, setCounselingList] = useState<Counseling[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  if (category === "counseling") {
    useEffect(() => {
      async function getCounseling() {
        const response = await customFetch("/consult");
        setCounselingList(response.data);
      }
      getCounseling();
    }, []);
    return (
      <>
        <h1 className="text-3xl mb-4 font-bold text-center">상담 신청 확인</h1>
        <div className="flex flex-row flex-wrap ">
          {counselingList.map((item) => {
            return (
              <div key={item.id}>
                <CounselingItem {...item} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  if (category === "applications") {
    useEffect(() => {
      async function getApplications() {
        const response = await customFetch("/application-form");
        setApplications(response.data);
      }
      getApplications();
    }, []);
    return (
      <>
        <h1 className="text-3xl mb-4 font-bold text-center">서류 확인</h1>
        <div className="flex flex-row flex-wrap ">
          {applications.map((item) => {
            return (
              <div key={item.id}>
                <ApplicationFormItem data={item} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return <div>{category}</div>;
}

"use client";

import { Application, Banner, Counseling } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import CounselingItem from "./CounselingItem";
import ApplicationFormItem from "./ApplicationFormItem";
import BoardPageCompo from "./BoardPageCompo";
import BannerItem from "./BannerItem";

type AdminComponentProps = {
  category: string;
};

export default function AdminComponent({ category }: AdminComponentProps) {
  const customFetch = useCustomFetch();
  const [counselingList, setCounselingList] = useState<Counseling[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
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
  } else if (category === "applications") {
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
  } else if (category === "banner") {
    useEffect(() => {
      async function getBanners() {
        const response = await customFetch("/banners?ignore=true");
        setBanners(response.data);
      }
      getBanners();
    }, []);
    return (
      <>
        <h1 className="text-3xl mb-4 font-bold text-center">배너</h1>
        <div className="flex flex-row flex-wrap ">
          {banners.map((item) => {
            return (
              <div key={item.id}>
                <BannerItem {...item} />
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <BoardPageCompo name={category} />
      </div>
    );
  }
}

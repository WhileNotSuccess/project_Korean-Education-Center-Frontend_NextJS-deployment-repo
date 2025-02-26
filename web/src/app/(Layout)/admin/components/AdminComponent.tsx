"use client";

import {
  ApplicationFormItemProp,
  Banner,
  Counseling,
  Teacher,
} from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import CounselingItem from "./CounselingItem";
import ApplicationFormItem from "./ApplicationFormItem";
import BoardPageCompo from "../../components/BoardPageCompo";
import BannerItem from "./BannerItem";
import BannerPostModal from "./BannerPostModal";
import StaffIntro from "../../components/StaffIntro";
import StaffComponent from "./StaffComponent";
import StaffModal from "./StaffModal";

type AdminComponentProps = {
  category: string;
};

export default function AdminComponent({ category }: AdminComponentProps) {
  const customFetch = useCustomFetch();
  const [counselingList, setCounselingList] = useState<Counseling[]>([]);
  const [applications, setApplications] = useState<ApplicationFormItemProp[]>(
    []
  );
  const [bannerPostModal, setBannerPostModal] = useState<boolean>(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Teacher[]>([]);
  const [staffPostModal, setStaffPostModal] = useState<boolean>(false);
  if (category === "counseling") {
    useEffect(() => {
      async function getCounseling() {
        const response = await customFetch("/consult");
        setCounselingList(response.data);
      }
      getCounseling();
    }, []);
    return (
      <section>
        <header>
          <h1 className="text-3xl mb-4 font-bold text-center">상담 신청 확인</h1>
        </header>

        <ul className="flex flex-row flex-wrap ">
          {counselingList.map((item) => {
            return (
              <li key={item.id}>
                <article>
                  <CounselingItem {...item} />
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    );
  } else if (category === "applications") {
    useEffect(() => {
      async function getApplications() {
        const response = await customFetch("/application-form?ignore=true");
        setApplications(response.data);
      }
      getApplications();
    }, []);
    return (
      <section>
        <header>
          <h1 className="text-3xl mb-4 font-bold text-center">서류 확인</h1>
        </header>

        <ul className="flex flex-row flex-wrap ">
          {applications.map((item) => {
            console.log(applications);
            return (
              <li key={item.id}>
                <article>
                  <ApplicationFormItem {...item} />
                </article>
              </li>
            );
          })}
        </ul>
      </section>
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
      <section>
        {bannerPostModal ? (
          <BannerPostModal
            onClose={() => {
              setBannerPostModal(false);
            }}
          />
        ) : null}
        <header>
          <h1 className="text-3xl mb-4 font-bold text-center">배너</h1>
        </header>
        <div className="w-full">
          <button
            onClick={() => {
              setBannerPostModal(true);
            }}
            className="absolute text-white right-10 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            배너 추가
          </button>
        </div>
        <ul className="flex flex-row flex-wrap ">
          {banners.map((item) => {
            return (
              <li key={item.id}>
                <article>
                  <BannerItem {...item} />
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    );
  } else if (category === "staff") {
    useEffect(() => {
      async function getStaff() {
        const response = await customFetch("/staff");
        setTeacher(response.teacher);
        setStaff(response.staff);
      }
      getStaff();
    }, []);
    return (
      <section>
        {staffPostModal && (
          <StaffModal
            onClose={() => {
              setStaffPostModal(false);
            }}
            method="POST"
          />
        )}
        <div className="flex flex-wrap">
          <h1 className="text-3xl mb-4 font-bold text-center w-full">
            강사진 및 교직원 소개
            <span className="p-4 text-right">
              <button
                onClick={() => {
                  setStaffPostModal(true);
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                추가하기
              </button>
            </span>
          </h1>

          {teacher.map((item) => {
            return(
            <article>   
            <StaffComponent key={item.name} {...item} />
            </article>
            )
          })}
          {staff.map((item) => {
            return (
            <article>
            <StaffComponent key={item.name} {...item} />
            </article>
            )
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <BoardPageCompo name={category} />
      </section>
    );
  }
}

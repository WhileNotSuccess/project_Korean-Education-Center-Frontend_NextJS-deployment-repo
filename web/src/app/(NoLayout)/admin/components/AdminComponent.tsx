"use client";

import {
  ApplicationFormItemProp,
  Banner,
  Course,
  Teacher,
} from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";
import ApplicationFormItem from "./ApplicationFormItem";
import BoardPageCompo from "../../../(Layout)/components/BoardPageCompo";
import BannerItem from "./BannerItem";
import BannerPostModal from "./BannerPostModal";
import StaffComponent from "./StaffComponent";
import StaffModal from "./StaffModal";
import Pagination from "../../../(Layout)/components/Pagination"; // 페이지네이션 컴포넌트
import CourseModal from "./CourseModal";
import CourseComponent from "./CourseComponent";

type AdminComponentProps = {
  category: string;
};

export default function AdminComponent({ category }: AdminComponentProps) {
  const customFetch = useCustomFetch();
  const [applications, setApplications] = useState<ApplicationFormItemProp[]>([]);
  const [bannerPostModal, setBannerPostModal] = useState<boolean>(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Teacher[]>([]);
  const [staffPostModal, setStaffPostModal] = useState<boolean>(false);
  const [course, setCourse] = useState<Course[]>([])
  const [coursePostModal, setCoursePostModal] = useState<boolean>(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // 드래그 앤 드롭 상태 및 핸들러
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    setStaff((prev) => {
      const list = [...prev];
      const draggedItem = list[draggedIndex];
      list.splice(draggedIndex, 1);
      list.splice(targetIndex, 0, draggedItem);
      return list;
    });

    setDraggedIndex(targetIndex);
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);
    const updatedOrders = staff.map((item, idx) => ({
      id: item.id,
      sortOrder: idx + 1,
    }));

    try {
      const response = await customFetch("/staff/order", {
        method: "PATCH",
        body: JSON.stringify(updatedOrders),
      });
      if (!response.ok) {
        console.error("Failed to update staff order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (category === "applications") {
    // 신청서 리스트를 받아오는 함수
    const getApplications = async (page: number) => {
      setLoading(true);
      const response = await customFetch(`/application-form?limit=10&page=${page}&ignore=true`, {
        method: "GET"
      });
      const data = await response.json()
      setApplications(data.data);
      setCurrentPage(data.currentPage); // 현재 페이지 번호
      setTotalPages(data.totalPage); // 전체 페이지 수
      setPrevPage(data.prevPage); // 이전 페이지 번호
      setNextPage(data.nextPage); // 다음 페이지 번호
      setLoading(false);
      console.log(data);
    };

    // 초기 데이터 요청 (첫 페이지)
    useEffect(() => {
      getApplications(currentPage);
    }, [currentPage]);

    // 페이지네이션을 위한 함수
    const handlePageChange = (page: number | null) => {
      if (page) {
        setCurrentPage(page); // 페이지 변경
      }
    };

    return (
      <>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 w-full">
          <h1 className="text-2xl font-bold text-slate-800">서류 확인</h1>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {applications.map((item) => {
            return (
              <div key={item.id}>
                <ApplicationFormItem {...item} />
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            onPageChange={handlePageChange}
          />
        </div>

        {loading && <div>Loading...</div>} {/* 로딩 중 표시 */}
      </>
    );
  } else if (category === "banner") {
    useEffect(() => {
      async function getBanners() {
        const response = await customFetch("/banners?ignore=true");
        const data = await response.json()
        setBanners(data.data);
      }
      getBanners();
    }, []);
    return (
      <>
        {bannerPostModal ? (
          <BannerPostModal
            onClose={() => {
              setBannerPostModal(false);
            }}
          />
        ) : null}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">배너 관리</h1>
          <button
            onClick={() => {
              setBannerPostModal(true);
            }}
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-2.5 shadow-sm shadow-blue-500/10 transition-colors"
          >
            배너 추가
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
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
  } else if (category === "staff") {
    useEffect(() => {
      async function getStaff() {
        const response = await customFetch("/staff");
        const data = await response.json()
        setTeacher(data.teacher || []);
        setStaff(data.staff || []);
      }
      getStaff();
    }, []);
    return (
      <>
        {staffPostModal && (
          <StaffModal
            onClose={() => {
              setStaffPostModal(false);
            }}
            method="POST"
          />
        )}
        <div className="flex flex-wrap">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 w-full">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">교직원 소개</h1>
              <p className="text-xs text-slate-400 mt-1.5 flex items-center">
                <span className="inline-block mr-1">💡</span>
                마우스 드래그 앤 드롭으로 노출 순서를 바로 지정할 수 있습니다.
              </p>
            </div>
            <button
              onClick={() => {
                setStaffPostModal(true);
              }}
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-2.5 shadow-sm shadow-blue-500/10 transition-colors"
            >
              교직원 추가
            </button>
          </div>

          {teacher.map((item, index) => {
            return <StaffComponent key={item.id} {...item} orderNumber={index + 1} />;
          })}
          {staff.map((item, index) => {
            return (
              <StaffComponent
                key={item.id}
                {...item}
                orderNumber={index + 1}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
              />
            );
          })}
        </div>
      </>
    );
  } else if (category === "course") {
    useEffect(() => {
      async function getCourse() {
        const response = await customFetch("/course");
        const data = await response.json()
        setCourse(data.data);
      }
      getCourse();
    }, []);
    return (
      <>
        {coursePostModal && (
          <CourseModal
            onClose={() => {
              setCoursePostModal(false);
            }}
            method="POST"
          />
        )}
        <div className="flex flex-wrap">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 w-full">
            <h1 className="text-2xl font-bold text-slate-800">강좌 관리</h1>
            <button
              onClick={() => {
                setCoursePostModal(true);
              }}
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-2.5 shadow-sm shadow-blue-500/10 transition-colors"
            >
              강좌 추가
            </button>
          </div>

          {course.map((item) => {
            return <CourseComponent key={item.id} {...item} />;
          })}
        </div>
      </>
    );
  } else {
    return (
      <div className="w-full flex justify-center items-center">
        <BoardPageCompo name={category} />
      </div>
    );
  }
}

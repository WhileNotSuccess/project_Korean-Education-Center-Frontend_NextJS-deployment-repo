"use client";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // 사이드바 하위 메뉴 펼치기/닫기 상태 관리
  const [open, setOpen] = useState<number>(0);
  const pathname = usePathname();

  const toggleSubMenu = (menu: number) => {
    setOpen(menu); // 하위 메뉴 펼침/닫힘
  };

  useEffect(() => {
    // 현재 경로에 맞는 서브메뉴를 자동으로 펼쳐줍니다.
    if (
      pathname.includes("/admin/review") ||
      pathname.includes("/admin/learning-materials") ||
      pathname.includes("/admin/notice") ||
      pathname.includes("/admin/news") ||
      pathname.includes("/admin/faq")
    ) {
      setOpen(1);
    } else if (
      pathname.includes("/admin/introduction") ||
      pathname.includes("/admin/directions") ||
      pathname.includes("/admin/visa") ||
      pathname.includes("/admin/dormitory") ||
      pathname.includes("/admin/facility") ||
      pathname.includes("/admin/insurance") ||
      pathname.includes("/admin/korean-outline") ||
      pathname.includes("/admin/korean-sample") ||
      pathname.includes("/admin/opencampus-") ||
      pathname.includes("/admin/procedure-guide")
    ) {
      setOpen(2);
    }
  }, [pathname]);

  const isBoardActive = open === 1;
  const isGuideActive = open === 2;

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <aside className="w-72 bg-white text-slate-600 flex flex-col shadow-sm border-r border-slate-200/80 shrink-0">
        {/* 로고 영역 */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/10">
              K
            </div>
            <div>
              <span className="text-lg font-bold text-slate-800 tracking-wide block">KCenter Admin</span>
              <span className="text-[10px] text-slate-400 font-medium block -mt-1 font-semibold">관리자 대시보드</span>
            </div>
          </div>
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          {/* 그룹 1: 게시판 및 안내 */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block">컨텐츠 관리</span>
            <ul className="space-y-1">
              {/* 게시판 페이지 */}
              <li>
                <button
                  onClick={() => toggleSubMenu(isBoardActive ? 0 : 1)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isBoardActive
                      ? "text-slate-800 bg-slate-50 border border-slate-105"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base">📋</span>
                    <span>게시판 페이지</span>
                  </div>
                  <span className="text-xs transition-transform duration-200 text-slate-400" style={{ transform: isBoardActive ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    ▶
                  </span>
                </button>
                {isBoardActive && (
                  <ul className="mt-1 ml-4 border-l border-slate-100 pl-3 py-1 space-y-1">
                    <li>
                      <a
                        href="/admin/review"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/review"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        유학생 후기
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/learning-materials"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/learning-materials"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        학습 자료 안내
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/notice"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/notice"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        공지사항
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/news"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/news"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        한국어교육센터 알림
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/faq"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/faq"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        FAQ
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* 안내 페이지 */}
              <li>
                <button
                  onClick={() => toggleSubMenu(isGuideActive ? 0 : 2)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isGuideActive
                      ? "text-slate-800 bg-slate-50 border border-slate-105"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base">ℹ️</span>
                    <span>안내 페이지</span>
                  </div>
                  <span className="text-xs transition-transform duration-200 text-slate-400" style={{ transform: isGuideActive ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    ▶
                  </span>
                </button>
                {isGuideActive && (
                  <ul className="mt-1 ml-4 border-l border-slate-100 pl-3 py-1 space-y-1">
                    <li>
                      <a
                        href="/admin/introduction"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/introduction"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        한국어 교육센터 소개
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/directions"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/directions"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        오시는 길
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/visa"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/visa"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        비자 안내
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/dormitory"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/dormitory"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        기숙사 안내
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/facility"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/facility"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        학교 시설 안내
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/insurance"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/insurance"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        건강 보험 안내
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/korean-outline"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/korean-outline"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        한국어과정 개요
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/korean-sample"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/korean-sample"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        한국어과정 학사일정
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/opencampus-purpose"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/opencampus-purpose"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        오픈캠퍼스 목적
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/opencampus-content"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/opencampus-content"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        오픈캠퍼스 일정 및 내용
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/opencampus-schedule"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/opencampus-schedule"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        오픈캠퍼스 스케쥴
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/procedure-guide"
                        className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                          pathname === "/admin/procedure-guide"
                            ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                            : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/60"
                        }`}
                      >
                        입학신청 절차안내
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* 그룹 2: 핵심 설정 및 관리 */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block">운영 관리</span>
            <ul className="space-y-1">
              <li>
                <a
                  href="/admin/banner"
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    pathname === "/admin/banner"
                      ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="text-base">🖼️</span>
                  <span>배너 관리</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/staff"
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    pathname === "/admin/staff"
                      ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="text-base">👥</span>
                  <span>교직원 소개</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/guidelinesForApplicants"
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    pathname === "/admin/guidelinesForApplicants"
                      ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="text-base">📄</span>
                  <span>모집요강 관리</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/applicants"
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    pathname === "/admin/applicants"
                      ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="text-base">📝</span>
                  <span>입학신청서 서류</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/course"
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    pathname === "/admin/course"
                      ? "bg-blue-50 text-blue-600 border border-blue-100/50 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <span className="text-base">🎓</span>
                  <span>강좌 관리</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                >
                  <span className="text-base">🏠</span>
                  <span>홈페이지로 이동</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 사이드바 하단 정보 */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-center">
          <p className="text-[10px] text-slate-400 font-medium">© 2026 Korean Education Center</p>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}

import { MenuType } from "./common/types";
import { Language } from "./common/types";

export const menu: Record<Language, Record<string, string>> = {
  // 예시메뉴
  [Language.korean]: {
    introduce: "센터소개",
    curriculum: "과정소개",
    application: "신청",
    schoolLife: "학교생활",
    notification: "알림/공지",
  },
};

export const smallMenu: Record<Language, Record<string, string>> = {
  // 예시메뉴
  [Language.korean]: {
    centerIntro: "한국어교육센터 소개",
    howToGetHere: "오시는길",
    staffIntro: "강사진 및 교직원 소개",
    "korean-curriculum": "한국어교육과정",
    "open-campus": "오픈캠퍼스",
    internationalReview: "유학생 후기",
    dormitory: "기숙사 안내",
    facility: "학교 시설 안내",
    "applied-to": "입학 신청",
  },
};

export const staffPage: Record<Language, Record<string, string>> = {
  // 강사진 및 교직원 소개 페이지
  [Language.korean]: {
    faculty: "강사진 소개",
    staff: "교직원 소개",
  },
};

export const editorCompo: Record<Language, Record<string, string>> = {
  // (임시) 글 업로드 하는 페이지에 사용될 메뉴들
  [Language.korean]: {
    submit: "제출",
    delete: "삭제",
    update: "수정",
    write: "작성",
    file: "파일",
    edit: "편집",
    view: "보기",
    insert: "삽입",
    format: "서식",
    table: "테이블",
  },
};

export const homePage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    notice: "공지사항",
    download: "다운로드",
    "applied-to": "입학신청",
    "recruitment-guidelines": "모집요강",
    faq: "FAQ",
    review: "유학생 후기",
    footerAddress:
      "41527 대구광역시 북구 복현로 35 (복현2동 218) 영진전문대학교 한국어교육센터",
    footerCallEmail: "대표전화 : +82-53-940-5632 이메일 : intl@yju.ac.kr",
  },
};

export const updateError: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    update: "글 수정에 실패했습니다.",
  },
};

export const postSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    contentPost: "글 업로드에 성공했습니다.",
    appliedPost: "입학신청에 성공했습니다.",
  },
};

export const updateSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    updatePost: "글 수정에 성공했습니다.",
  },
};

export const koreancurriculumList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "korean-outline", value: "개요" },
    { key: "korean-sample", value: "프로그램 샘플" },
  ],
};

export const boardMenu: Record<Language, Record<string, string>> = {
  // 게시판페이지 메뉴
  [Language.korean]: {
    review: "유학생 후기",
    "application-form": "신청 서류",
    "learning-materials": "학습 자료 안내",
    notice: "공지사항",
    news: "한국어교육센터 알림",
    faq: "FAQ",
    introduction: "한국어 교육센터 소개",
    directions: "오시는 길",
    visa: "비자 안내",
    dormitory: "기숙사 안내",
    scholarship: "장학금 안내",
    facility: "학교 시설 안내",
    insurance: "건강 보험 안내",
    "korean-outline": "한국어교육과정 개요",
    "korean-sample": "한국어교육과정 프로그램 샘플",
    "opencampus-purpose": "오픈캠퍼스 목적",
    "opencampus-content": "오픈캠퍼스 일정 및 내용",
    "opencampus-schedule": "오픈캠퍼스 스케쥴",
    banner: "배너",
    "procedure-guide": "입학 신청의 절차 안내",
    guidelinesForApplicants: "모집요강",
    applicants: "입학신청서",
  },
};

export const categoryList: Record<Language, { key: string; value: string }[]> =
  {
    [Language.korean]: [
      { key: "introduction", value: "한국어교육센터 소개" },
      { key: "directions", value: "오시는 길" },
      { key: "visa", value: "비자 안내" },
      { key: "dormitory", value: "기숙사 안내" },
      { key: "facility", value: "학교 시설 안내" },
      { key: "insurance", value: "건강 보험 안내" },
      { key: "review", value: "유학생 후기" },
      { key: "application-form", value: "신청 서류" },
      { key: "learning-materials", value: "학습 자료 안내" },
      { key: "notice", value: "공지사항" },
      { key: "news", value: "한국어교육센터 알림" },
      { key: "faq", value: "FAQ" },
      { key: "korean-outline", value: "개요" },
      { key: "korean-sample", value: "프로그램 샘플" },
      { key: "applied-to", value: "입학 신청" },
    ],
  };

export const paginationPage: Record<Language, Record<string, string>> = {
  // 페이지네이션 기능이 보여지는 페이지에 쓰일 메뉴
  [Language.korean]: {
    prev: "이전",
    next: "다음",
  },
};

export const guidanceMenu: Record<Language, Record<string, string>> = {
  // 문서페이지 메뉴
  [Language.korean]: {
    introduction: "한국어교육센터 소개",
    directions: "오시는 길",
    visa: "비자 안내",
    dormitory: "기숙사 안내",
    facility: "학교 시설 안내",
    insurance: "건강 보험 안내",
  },
};

export const selectMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "korean-curriculum": "한국어교육과정",
    "open-campus": "오픈캠퍼스",
    "applied-to": "입학신청",
  },
};

export const boardPage: Record<Language, Record<string, string>> = {
  // 게시판페이지에 사용되는 메뉴들
  [Language.korean]: {
    notice: "공지",
    title: "제목",
    content: "내용",
    createDate: "작성일",
    updateDate: "수정일",
    search: "검색",
    write: "작성",
    number: "순번",
    author: "작성자",
  },
};

export const getError: Record<Language, Record<string, string>> = {
  // get요청에 실패했을때의 메뉴들
  [Language.korean]: {
    staffError: "강사진 및 교직원 정보를 불러오지 못했습니다.",
    boardError: "게시글들을 불러올 수 없습니다.",
    htmlError: "해당 게시글을 불러올 수 없습니다.",
    bannerError: "배너를 불러올 수 없습니다.",
    newsError: "소식을 불러올 수 없습니다.",
  },
};

export const postError: Record<Language, Record<string, string>> = {
  // post요청에 실패했을때의 메뉴들
  [Language.korean]: {
    imgError: "이미지 업로드에 실패했습니다.",
    subError: "제출에 실패했습니다.",
  },
};

export const deleteError: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    delete: "글 삭제에 실패했습니다",
  },
};

export const deleteSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    contentDelete: "글 삭제에 성공했습니다.",
  },
};

export const fileError: Record<Language, Record<string, string>> = {
  // 파일 다운로드 관련 에러
  [Language.korean]: {
    Error: "파일 다운로드에 실패했습니다.",
  },
};

export const counselingForm: Record<Language, Record<string, string>> = {
  [Language.korean]: { counseling: "상담 신청" },
};

export const opencampusList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "opencampus-purpose", value: "목적" },
    { key: "opencampus-content", value: "일정 및 내용" },
    { key: "opencampus-schedule", value: "스케쥴" },
  ],
};

export const applicationList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "procedure-guide", value: "절차 안내" },
    { key: "upload-documents", value: "서류 업로드" },
  ],
};

export const categoryMap: Record<
  string,
  Record<Language, { key: string; value: string }[]>
> = {
  "korean-curriculum": koreancurriculumList,
  "open-campus": opencampusList,
  "applied-to": applicationList,
};

export const counselingPageMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "counseling-guide": `상담 운영 시간은 한국 시간(KST) 기준으로\n평일 오전 9시 ~ 오후 6시,\n주말 오전 9시 ~ 오후 5시까지입니다.`,
    name: "이름",
    phone: "휴대폰 번호",
    email: "이메일",
    date: "상담 일정",
    save: "저장",
  },
};

export const locationMap: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "main-campus": " 대구광역시 북구 복현로 35",
  },
};

export const LoginCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    Login: "로그인",
  },
};

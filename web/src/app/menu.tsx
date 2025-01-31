import { MenuType } from "./common/types"
import { Language } from "./common/types"

export const menu : Record<Language, Record<string, string>> = { // 예시메뉴
  [Language.korean] : {
    introduce : '센터소개',
    curriculum : '과정소개',
    application : '신청', 
    schoolLife : '학교생활',
    notification : '소식/공지'
  }
}

export const smallMenu  : Record<Language, Record<string, string>>= {  // 예시메뉴
  [Language.korean] : {
    centerIntro : '한국어교육센터 소개',
    howToGetHere : '오시는길',
    staffIntro : '강사진 및 교직원 소개',
    koreaCurriculum : "한국어교육과정",
    openCampus : "오픈캠퍼스",
    internationalReview : "유학생 후기"
  }
}

export const guidanceMenu : Record<Language, Record<string, string>> = {  // 문서페이지 메뉴
  [Language.korean] : {
    introduction : "한국어교육센터 소개",
    directions : "오시는 길",
    visa : "비자 안내",
    dormitory : "기숙사 안내",
    facility : "학교 시설 안내",
    insurance : "건강 보험 안내"
  }
}

export const boardMenu : Record<Language, Record<string, string>> = {  // 게시판페이지 메뉴
  [Language.korean] : {
    review : "유학생 후기",
    "application-form" : "신청 서류",
    "learning-materials" : "학습 자료 안내",
    notice : "공지사항",
    news : "한국어교육센터 소식",
    faq : "FAQ"
  }
}

export const staffPage  : Record<Language, Record<string, string>> = { // 강사진 및 교직원 소개 페이지
  [Language.korean] : {
  faculty : "강사진 소개",
  staff : "교직원 소개"
  }
}

export const boardPage : Record<Language, Record<string, string>> = { // 게시판페이지에 사용되는 메뉴들
  [Language.korean] : {
    notice : "공지",
    title : "제목",
    content : "내용",
    createDate : "작성일",
    search : "검색",
    write : "작성",
    number : "순번",
    author : "작성자"
  }
}

export const editorCompo : Record<Language, Record<string, string>> = { // (임시) 글 업로드 하는 페이지에 사용될 메뉴들
  [Language.korean] : {
    submit : "제출"
  }
}

export const paginationPage : Record<Language, Record<string, string>> = { // 페이지네이션 기능이 보여지는 페이지에 쓰일 메뉴
  [Language.korean] : {
    prev : "이전",
    next : "다음"
  }
}


export const getError : Record<Language, Record<string, string>> = { // get요청에 실패했을때의 메뉴들
  [Language.korean] : {
    staffError : "강사진 및 교직원 정보를 불러오지 못했습니다.",
    boardError : "게시글들을 불러올수 없습니다.",
    htmlError : "해당 게시글을 불러올수 없습니다."
  }
}

export const postError : Record<Language, Record<string, string>> = { // post요청에 실패했을때의 메뉴들
  [Language.korean] : {
    imgError : "이미지 업로드에 실패했습니다.",
    subError : "제출에 실패했습니다."
  }
}
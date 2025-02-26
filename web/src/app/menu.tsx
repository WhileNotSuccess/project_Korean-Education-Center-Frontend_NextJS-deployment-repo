import { Language,  MenuType } from "./common/types";

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
    needInputTitle : "제목을 입력해주세요",
    needInputContent : "내용을 입력해주세요",
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

export const serverError: Record<Language, Record<string, string>> = {
  [Language.korean] : {
    server : "서버 오류가 발생했습니다.",
  }
}

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
      { key: "opencampus-purpose", value: "목적" },
      { key: "opencampus-content", value: "일정 및 내용" },
      { key: "opencampus-schedule", value: "스케쥴" },
      { key: "procedure-guide", value: "절차 안내" },
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


export const counselingPageMenu : Record<Language, Record<string, string>> = {

  [Language.korean] : {
    "counseling-guide" : `상담 운영 시간은 한국 시간(KST) 기준으로\n평일 오전 9시 ~ 오후 6시,\n주말 오전 9시 ~ 오후 5시까지입니다.`,
    "name": "이름",
    "phone": "휴대폰 번호",
    "email": "이메일",
    "date": "상담 일정",
    "save": "저장",
  }
}

export const locationMap: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "main-campus" : " 대구광역시 북구 복현로 35",
    
}
}

export const LoginCompoMenu : Record<Language, Record<string, string>> = {
  [Language.korean]: {
    Login: "로그인",
    register: "회원가입",
    welcome: "영진전문대학교 한국어교육센터 방문을 환영합니다.",
    inputId : "아이디 입력",
    inputPassWord : "비밀번호 입력",
  }

}

export const TermsAgreementMenu : Record<Language, Record<string, string>> = {

  [Language.korean] : {
    MainTermOfUse : "약관 동의",
    TermOfUse : "이용약관 동의 (필수)",
    TermOfUseContent : `본인은 [영진전문대학교] 의 교육 서비스를 이용하기 위해 다음과 같은 약관에 동의합니다.
1. 이용약관의 목적
본 약관은 [영진전문대학교](이하 "영진전문대학교")에서 제공하는 교육 서비스 이용에 관한 사항을 규정하는 것을 목적으로 합니다.

2. 이용자의 의무
이용자는 학교의 교육 서비스를 이용하는 동안 다른 사람의 권리를 침해하지 않으며, 학교의 규정과 지침을 준수하여야 합니다.

3. 서비스 이용
학교는 학생들에게 교육 서비스를 제공하며, 그에 필요한 자료와 정보를 제공할 수 있습니다. 서비스 이용에 따른 권리와 의무는 본 약관에 명시된 대로 이행됩니다.

3. 책임의 한계
학교는 천재지변 등 불가항력적인 사유로 인해 서비스 제공이 불가능할 경우, 이에 대한 책임을 지지 않습니다.

4. 약관의 변경
학교는 본 약관을 언제든지 변경할 수 있으며, 변경된 약관은 학교의 공식 웹사이트를 통해 고지됩니다.

5. 이용 계약의 해지
학생이 약관을 위반하거나 부정한 방법으로 서비스를 이용할 경우, 학교는 이용 계약을 해지할 수 있습니다.`,
informationConsent : '개인정보 처리방침 동의 (필수)',
informationConsentContext : `개인정보 처리방침 동의서

[영진전문대학교](이하 "영진전문대학교")는 학생들의 개인정보 보호를 매우 중요하게 생각하며, 다음과 같은 개인정보 처리방침을 시행합니다. 본인은 본 개인정보 처리방침에 동의합니다.

1. 개인정보 수집 항목
학교는 학생의 이름, 생년월일, 연락처, 이메일 주소, 학적 정보 등을 수집합니다.

2. 개인정보 수집 목적
학교는 수집된 개인정보를 학생의 학업 관리, 교육 서비스 제공, 공지사항 안내 등의 목적으로 사용합니다.

3. 개인정보의 보유 및 이용 기간
학생의 개인정보는 해당 교육 과정이 종료될 때까지 보유되며, 그 이후에는 법적인 의무를 제외하고는 즉시 파기됩니다.

4. 개인정보의 제3자 제공
학교는 학생의 개인정보를 제3자에게 제공하지 않으며, 법적인 요구에 따라 필요한 경우에만 제공될 수 있습니다.

5. 개인정보의 보호
학교는 학생의 개인정보를 안전하게 보호하기 위해 필요한 기술적, 관리적 조치를 취합니다.

6. 개인정보 처리에 대한 권리
학생은 언제든지 자신의 개인정보 열람, 수정, 삭제를 요구할 수 있으며, 이에 대한 절차는 학교의 개인정보 관리 부서에 문의하여 처리할 수 있습니다.

7. 개인정보 처리방침의 변경
학교는 개인정보 처리방침을 수시로 변경할 수 있으며, 변경된 사항은 학교의 웹사이트를 통해 공지됩니다.

`,
next: '다음',
}
}

export const RegisterCompoMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    inputName : "한국어교육센터에서 사용할 이름을 입력해주세요.",
    register : "회원가입",
    namePlaceHolder : "이름",
    emailPlaceHolder : "이메일",
    passWordPlaceHolder : "비밀번호",
  }
}

export const FormComponentMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    applicationSuccess : "상담 신청이 완료되었습니다.",
    applicationfail : "상담 신청에 실패했습니다.",
  }
}

export const DashboardCompoMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    loadingOrNotFoundUser : "로딩 중이거나 사용자 정보가 없습니다.",
    userInfomation : "님의 정보",
    nameChange : "이름 변경",
    connectGoogle : "구글 연동",
    submitDocument : "제출한 서류",
    submitComplete  : "제출 완료",
    submitIncomplete : "제출 미완료",
  }
}

export const NameChangeModalMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    successNameChange : "이름이 성공적으로 변경되었습니다.",
    failNameChange : "이름 변경에 실패했습니다.",
    nameChangeError : "이름 변경 중 오류가 발생했습니다",
    nameChange : "이름 변경",
    save : "저장",
    cancel : "취소",
    newNameInput : "새로운 이름 입력"
  }
}

export const NeedLinkCompoMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    notConnectGoogle : "해당 이메일로 가입되어있는 계정이 있지만, 구글 연동은 되어있지 않습니다.\n기존 계정으로 로그인 후, 마이페이지에서 구글 연동을 진행해주세요",
    connectGoogleGuide : "구글 연동 절차 안내",
    step1 : "기존 계정으로 로그인한 후 이름을 클릭해 마이페이지로 이동합니다.",
    step2 : "마이페이지에서 '구글 연동' 옵션을 찾아 연동을 진행합니다.",
    step3 : "구글 로그인창으로 이동해 로그인합니다.",
    step4 : "홈페이지로 돌아왔다면 구글 연동이 완료됩니다."
  }
}

export const SelectPageCompoMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    failLoadPosts : "해당 게시글을 불러올 수 없습니다.",
    failLoadContent : "내용을 불러올 수 없습니다.",
    failLoadCourse : "지원과정 목록을 불러올 수 없습니다.",
    failLoadUserInfo : "유저 정보를 불러오는데 실패했습니다.",
    needLogin : "로그인이 필요합니다.",
    needFile : "파일을 첨부해주세요.",
    needPhoneNumber : "전화번호를 입력해주세요.",
    needCourse : "지원과정을 선택해주세요.",
    loadingCourse : "지원과정을 불러오는 중...",
    submit : "제출",
    inputPhoneNumber : "전화번호를 입력하세요.",
  }
}

export const AuthMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    LoadError : "데이터를 불러오는데 실패했습니다."
  }
}

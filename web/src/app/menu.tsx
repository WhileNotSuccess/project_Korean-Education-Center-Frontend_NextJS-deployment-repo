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
  [Language.japanese]: {
    introduce: "センター紹介",
    curriculum: "コース紹介",
    application: "申請",
    schoolLife: "学校生活",
    notification: "お知らせ/通知",
  },
  [Language.english]: {
    introduce: "Center Introduction",
    curriculum: "Curriculum",
    application: "Application",
    schoolLife: "School Life",
    notification: "Notification/Announcement",
  },
};

export const smallMenu: Record<Language, Record<string, string>> = {
  // 예시메뉴
  [Language.korean]: {
    centerIntro: "한국어교육센터 소개",
    howToGetHere: "오시는길",
    "staff-intro": "강사진 및 교직원 소개",
    "korean-curriculum": "한국어교육과정",
    "open-campus": "오픈캠퍼스",
    internationalReview: "유학생 후기",
    dormitory: "기숙사 안내",
    facility: "학교 시설 안내",
    "applied-to": "입학 신청",
  },
  [Language.japanese]: {
    centerIntro: "韓国語教育センター紹介",
    howToGetHere: "アクセス",
    staffIntro: "講師陣および職員紹介",
    "korean-curriculum": "韓国語教育課程",
    "open-campus": "オープンキャンパス",
    internationalReview: "留学生の声",
    dormitory: "寮案内",
    facility: "学校施設案内",
    "applied-to": "入学申請",
  },
  [Language.english]: {
    centerIntro: "Korean Language Education Center Introduction",
    howToGetHere: "Directions",
    staffIntro: "Introduction of Faculty and Staff",
    "korean-curriculum": "Korean Language Curriculum",
    "open-campus": "Open Campus",
    internationalReview: "International Student Reviews",
    dormitory: "Dormitory Guide",
    facility: "School Facility Guide",
    "applied-to": "Application for Admission",
  },
};

export const staffPage: Record<Language, Record<string, string>> = {
  // 강사진 및 교직원 소개 페이지
  [Language.korean]: {
    faculty: "강사진 소개",
    staff: "교직원 소개",
  },
  [Language.japanese]: {
    faculty: "講師紹介",
    staff: "職員紹介",
  },
  [Language.english]: {
    faculty: "Faculty Introduction",
    staff: "Staff Introduction",
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
  [Language.japanese]: {
    submit: "提出",
    delete: "削除",
    update: "修正",
    write: "作成",
    file: "ファイル",
    edit: "編集",
    view: "表示",
    insert: "挿入",
    format: "フォーマット",
    table: "テーブル",
  },
  [Language.english]: {
    submit: "Submit",
    delete: "Delete",
    update: "Update",
    write: "Write",
    file: "File",
    edit: "Edit",
    view: "View",
    insert: "Insert",
    format: "Format",
    table: "Table",
  },
};

export const homePage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    notice: "공지사항",
    download: "다운로드",
    "applied-to": "입학신청",
    "recruitment-guidelines": "모집요강",
    "Application-Form" : "입학신청서",
    faq: "FAQ",
    review: "유학생 후기",
    footerAddress:
      "41527 대구광역시 북구 복현로 35 (복현2동 218) 영진전문대학교 한국어교육센터",
    footerCallEmail: "대표전화 : +82-53-940-5632 이메일 : intl@yju.ac.kr",
  },
  [Language.japanese]: {
    notice: "お知らせ",
    download: "ダウンロード",
    "applied-to": "入学申請",
    "recruitment-guidelines": "募集要項",
    faq: "FAQ",
    review: "留学生の声",
    footerAddress:
      "41527 大邱広域市 北区 復県路 35 (復県2洞 218) 永進専門大学 韓国語教育センター",
    footerCallEmail: "代表電話 : +82-53-940-5632 メール : intl@yju.ac.kr",
  },
  [Language.english]: {
    notice: "Notice",
    download: "Download",
    "applied-to": "Application for Admission",
    "recruitment-guidelines": "Admission Guidelines",
    faq: "FAQ",
    review: "International Student Reviews",
    footerAddress:
      "41527 35 Bokhyeon-ro, Buk-gu, Daegu, Korea Yeungjin College Korean Language Education Center",
    footerCallEmail: "Phone: +82-53-940-5632 Email: intl@yju.ac.kr",
  },
};

export const updateError: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    update: "글 수정에 실패했습니다.",
  },
  [Language.japanese]: {
    update: "記事の修正に失敗しました。",
  },
  [Language.english]: {
    update: "Failed to update post.",
  },
};

export const postSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    contentPost: "글 업로드에 성공했습니다.",
    appliedPost: "입학신청에 성공했습니다.",
  },
  [Language.japanese]: {
    contentPost: "記事のアップロードに成功しました。",
    appliedPost: "入学申請に成功しました。",
  },
  [Language.english]: {
    contentPost: "Successfully uploaded post.",
    appliedPost: "Successfully applied for admission.",
  },
};

export const updateSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    updatePost: "글 수정에 성공했습니다.",
  },
  [Language.japanese]: {
    updatePost: "記事の修正に成功しました。",
  },
  [Language.english]: {
    updatePost: "Successfully updated post.",
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
  [Language.japanese]: [
    { key: "korean-outline", value: "概要" },
    { key: "korean-sample", value: "プログラムサンプル" },
  ],
  [Language.english]: [
    { key: "korean-outline", value: "Outline" },
    { key: "korean-sample", value: "Program Sample" },
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
  [Language.japanese]: {
    review: "留学生の感想",
    "application-form": "申請書類",
    "learning-materials": "学習資料案内",
    notice: "お知らせ",
    news: "韓国語教育センターからのお知らせ",
    faq: "FAQ",
    introduction: "韓国語教育センター紹介",
    directions: "アクセス",
    visa: "ビザ案内",
    dormitory: "寮案内",
    scholarship: "奨学金案内",
    facility: "学校施設案内",
    insurance: "健康保険案内",
    "korean-outline": "韓国語教育課程概要",
    "korean-sample": "韓国語教育課程プログラムサンプル",
    "opencampus-purpose": "オープンキャンパスの目的",
    "opencampus-content": "オープンキャンパスの内容",
    "opencampus-schedule": "オープンキャンパスのスケジュール",
    banner: "バナー",
    "procedure-guide": "入学申請手続き案内",
    guidelinesForApplicants: "募集要項",
    applicants: "入学申請書",
  },
  [Language.english]: {
    review: "Student Reviews",
    "application-form": "Application Form",
    "learning-materials": "Learning Materials Guide",
    notice: "Notice",
    news: "Korean Language Center News",
    faq: "FAQ",
    introduction: "Introduction to Korean Language Center",
    directions: "Directions",
    visa: "Visa Information",
    dormitory: "Dormitory Information",
    scholarship: "Scholarship Information",
    facility: "School Facilities Guide",
    insurance: "Health Insurance Information",
    "korean-outline": "Overview of Korean Language Program",
    "korean-sample": "Sample Korean Language Program",
    "opencampus-purpose": "Purpose of Open Campus",
    "opencampus-content": "Open Campus Schedule and Details",
    "opencampus-schedule": "Open Campus Schedule",
    banner: "Banner",
    "procedure-guide": "Admission Procedure Guide",
    guidelinesForApplicants: "Application Guidelines",
    applicants: "Application Form",
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
    [Language.japanese]: [
      { key: "introduction", value: "韓国語教育センター紹介" },
      { key: "directions", value: "アクセス" },
      { key: "visa", value: "ビザ案内" },
      { key: "dormitory", value: "寮案内" },
      { key: "facility", value: "学校施設案内" },
      { key: "insurance", value: "健康保険案内" },
      { key: "review", value: "留学生の感想" },
      { key: "application-form", value: "申請書類" },
      { key: "learning-materials", value: "学習資料案内" },
      { key: "notice", value: "お知らせ" },
      { key: "news", value: "韓国語教育センターからのお知らせ" },
      { key: "faq", value: "FAQ" },
      { key: "korean-outline", value: "概要" },
      { key: "korean-sample", value: "プログラムサンプル" },
      { key: "applied-to", value: "入学申請" },
    ],
    [Language.english]: [
      { key: "introduction", value: "Introduction to Korean Language Center" },
      { key: "directions", value: "Directions" },
      { key: "visa", value: "Visa Information" },
      { key: "dormitory", value: "Dormitory Information" },
      { key: "facility", value: "School Facilities Guide" },
      { key: "insurance", value: "Health Insurance Information" },
      { key: "review", value: "Student Reviews" },
      { key: "application-form", value: "Application Form" },
      { key: "learning-materials", value: "Learning Materials Guide" },
      { key: "notice", value: "Notice" },
      { key: "news", value: "Korean Language Center News" },
      { key: "faq", value: "FAQ" },
      { key: "korean-outline", value: "Overview" },
      { key: "korean-sample", value: "Program Sample" },
      { key: "applied-to", value: "Application" },
    ],
  };

export const paginationPage: Record<Language, Record<string, string>> = {
  // 페이지네이션 기능이 보여지는 페이지에 쓰일 메뉴
  [Language.korean]: {
    prev: "이전",
    next: "다음",
  },
  [Language.japanese]: {
    prev: "前へ",
    next: "次へ",
  },
  [Language.english]: {
    prev: "Previous",
    next: "Next",
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
  [Language.japanese]: {
    introduction: "韓国語教育センター紹介",
    directions: "アクセス",
    visa: "ビザ案内",
    dormitory: "寮案内",
    facility: "学校施設案内",
    insurance: "健康保険案内",
  },
  [Language.english]: {
    introduction: "Introduction to Korean Language Education Center",
    directions: "Directions",
    visa: "Visa Information",
    dormitory: "Dormitory Information",
    facility: "School Facility Guide",
    insurance: "Health Insurance Information",
  },
};

export const selectMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "korean-curriculum": "한국어교육과정",
    "open-campus": "오픈캠퍼스",
    "applied-to": "입학신청",
  },
  [Language.japanese]: {
    "korean-curriculum": "韓国語教育課程",
    "open-campus": "オープンキャンパス",
    "applied-to": "入学申請",
  },
  [Language.english]: {
    "korean-curriculum": "Korean Language Curriculum",
    "open-campus": "Open Campus",
    "applied-to": "Admission Application",
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
    writeTitle : "제목을 입력하세요"
  },
  [Language.japanese]: {
    notice: "お知らせ",
    title: "タイトル",
    content: "内容",
    createDate: "作成日",
    updateDate: "更新日",
    search: "検索",
    write: "作成",
    number: "番号",
    author: "作成者",
  },
  [Language.english]: {
    notice: "Notice",
    title: "Title",
    content: "Content",
    createDate: "Created Date",
    updateDate: "Updated Date",
    search: "Search",
    write: "Write",
    number: "Number",
    author: "Author",
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
    entranceApplicationError : "모집요강 및 입학신청를 불러올 수 없습니다.",
    searchBoardError : "검색된 게시글들을 불러올 수 없습니다."
  },
  [Language.japanese]: {
    staffError: "スタッフおよび職員情報を読み込めませんでした。",
    boardError: "投稿を読み込むことができませんでした。",
    htmlError: "該当の投稿を読み込むことができませんでした。",
    bannerError: "バナーを読み込むことができませんでした。",
    newsError: "お知らせを読み込むことができませんでした。",
  },
  [Language.english]: {
    staffError: "Failed to load staff and employee information.",
    boardError: "Failed to load the posts.",
    htmlError: "Failed to load the specific post.",
    bannerError: "Failed to load the banner.",
    newsError: "Failed to load the news.",
  },
};

export const postError: Record<Language, Record<string, string>> = {
  // post요청에 실패했을때의 메뉴들
  [Language.korean]: {
    imgError: "이미지 업로드에 실패했습니다.",
    subError: "제출에 실패했습니다.",
  },
  [Language.japanese]: {
    imgError: "画像のアップロードに失敗しました。",
    subError: "提出に失敗しました。",
  },
  [Language.english]: {
    imgError: "Failed to upload image.",
    subError: "Failed to submit.",
  },
};

export const deleteError: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    delete: "글 삭제에 실패했습니다",
    userError : "로그인 후 이용하셔야 합니다."
  },
  [Language.japanese]: {
    delete: "投稿の削除に失敗しました。",
  },
  [Language.english]: {
    delete: "Failed to delete the post.",
  },
};

export const deleteSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    contentDelete: "글 삭제에 성공했습니다.",
  },
  [Language.japanese]: {
    contentDelete: "投稿の削除に成功しました。",
  },
  [Language.english]: {
    contentDelete: "Successfully deleted the post.",
  },
};

export const fileError: Record<Language, Record<string, string>> = {
  // 파일 다운로드 관련 에러
  [Language.korean]: {
    Error: "파일 다운로드에 실패했습니다.",
  },
  [Language.japanese]: {
    Error: "ファイルのダウンロードに失敗しました。",
  },
  [Language.english]: {
    Error: "Failed to download the file.",
  },
};

export const counselingForm: Record<Language, Record<string, string>> = {
  [Language.korean]: { counseling: "상담 신청" },
  [Language.japanese]: { counseling: "カウンセリング申し込み" },
  [Language.english]: { counseling: "Counseling Application" },
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
  [Language.japanese]: [
    { key: "opencampus-purpose", value: "目的" },
    { key: "opencampus-content", value: "日程と内容" },
    { key: "opencampus-schedule", value: "スケジュール" },
  ],
  [Language.english]: [
    { key: "opencampus-purpose", value: "Purpose" },
    { key: "opencampus-content", value: "Schedule and Content" },
    { key: "opencampus-schedule", value: "Schedule" },
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
  [Language.japanese]: [
    { key: "procedure-guide", value: "手続きガイド" },
    { key: "upload-documents", value: "書類アップロード" },
  ],
  [Language.english]: [
    { key: "procedure-guide", value: "Procedure Guide" },
    { key: "upload-documents", value: "Upload Documents" },
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
  [Language.japanese]: {
    "counseling-guide": `カウンセリングの営業時間は、韓国標準時間(KST)で\n平日午前9時～午後6時、\n週末午前9時～午後5時です。`,
    name: "名前",
    phone: "携帯番号",
    email: "メール",
    date: "カウンセリング日程",
    save: "保存",
  },
  [Language.english]: {
    "counseling-guide": `Counseling hours are from 9 AM to 6 PM on weekdays, and 9 AM to 5 PM on weekends (KST).`,
    name: "Name",
    phone: "Phone Number",
    email: "Email",
    date: "Counseling Schedule",
    save: "Save",
  },
};

export const locationMap: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "main-campus": " 대구광역시 북구 복현로 35",
  },
  [Language.japanese]: {
    "main-campus": " 大邱広域市北区復現路35",
  },
  [Language.english]: {
    "main-campus": "35, Bokhyeon-ro, Buk-gu, Daegu, South Korea",
  },
};

export const LoginCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    Login: "로그인",
  },
  [Language.japanese]: {
    Login: "ログイン",
  },
  [Language.english]: {
    Login: "Login",
  },
};

export const Hamburger : Record<Language, { topMenu: string; subMenu:{address : string, name: string}[] }[]> = {
  [Language.korean] : [
    {topMenu : "센터소개", subMenu: [
      {address:"/guidance/introduction",name:"한국어교육센터 소개"},
      {address:"/guidance/directions",name:"오시는길"},
      {address:"/staff-intro",name:"강사진 및 교직원 소개"}]},
    {topMenu : "과정소개", subMenu: [
      {address:"/select/korean-curriculum",name:"한국어교육과정"},
      {address:"/select/open-campus",name:"오픈캠퍼스"},
      {address:"/board/review",name:"유학생 후기"}]},
    {topMenu : "신청", subMenu: [
      {address:"/select/applied-to",name:"입학 신청"},
      {address:"/form/counseling",name:"상담 신청"},
      {address:"/board/application-form",name:"신청 서류"},
      {address:"/guidance/visa",name:"비자 안내"}]},
    {topMenu : "학교생활", subMenu: [
      {address:"/guidance/dormitory",name:"기숙사 안내"},
      {address:"/guidance/facility",name:"학교 시설 안내"},
      {address:"/board/learning-materials",name:"학습 자료 안내"},
      {address:"/guidance/insurance",name:"건강 보험 안내"}]},
    {topMenu : "알림/공지", subMenu: [
      {address:"/board/notice",name:"공지사항"},
      {address:"/board/news",name:"한국어교육센터 알림"},
      {address:"/board/faq",name:"FAQ"}]},
  ]
}

export const postLanguageList : Record<Language, { key: string; value: string }[]> = {
  [Language.korean] :  [
    { key: "korean", value: "한국어" },
    { key: "japanese", value: "일본어" },
    { key: "english", value: "영어" },
  ]
}

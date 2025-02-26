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
    needInputTitle : "제목을 입력해주세요",
    needInputContent : "내용을 입력해주세요",
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

export const serverError: Record<Language, Record<string, string>> = {
  [Language.korean] : {
    server : "서버 오류가 발생했습니다.",
  },
  [Language.english] : {

  },
  [Language.japanese] : {
  
  },
  
}

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
      { key: "opencampus-purpose", value: "목적" },
      { key: "opencampus-content", value: "일정 및 내용" },
      { key: "opencampus-schedule", value: "스케쥴" },
      { key: "procedure-guide", value: "절차 안내" },
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
    register: "회원가입",
    welcome: "영진전문대학교 한국어교육센터 방문을 환영합니다.",
    inputId : "아이디 입력",
    inputPassWord : "비밀번호 입력",
  },
  [Language.japanese]: {
    Login: "ログイン",
  },
  [Language.english]: {
    Login: "Login",
  },
};



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
},
[Language.english] : {

},
[Language.japanese] : {

},

}

export const RegisterCompoMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    inputName : "한국어교육센터에서 사용할 이름을 입력해주세요.",
    register : "회원가입",
    namePlaceHolder : "이름",
    emailPlaceHolder : "이메일",
    passWordPlaceHolder : "비밀번호",
  },

  [Language.english] : {

  },
  [Language.japanese] : {

  },

}

export const FormComponentMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    applicationSuccess : "상담 신청이 완료되었습니다.",
    applicationfail : "상담 신청에 실패했습니다.",
  },
  [Language.english] : {

  },
  [Language.japanese] : {
  
  },
  
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
  },
  [Language.english] : {

  },
  [Language.japanese] : {
  
  },
  
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
  },
  [Language.english] : {

  },
  [Language.japanese] : {
  
  },
  
}

export const NeedLinkCompoMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    notConnectGoogle : "해당 이메일로 가입되어있는 계정이 있지만, 구글 연동은 되어있지 않습니다.\n기존 계정으로 로그인 후, 마이페이지에서 구글 연동을 진행해주세요",
    connectGoogleGuide : "구글 연동 절차 안내",
    step1 : "기존 계정으로 로그인한 후 이름을 클릭해 마이페이지로 이동합니다.",
    step2 : "마이페이지에서 '구글 연동' 옵션을 찾아 연동을 진행합니다.",
    step3 : "구글 로그인창으로 이동해 로그인합니다.",
    step4 : "홈페이지로 돌아왔다면 구글 연동이 완료됩니다."
  },
  [Language.english] : {

  },
  [Language.japanese] : {
  
  },
  
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
  },
  [Language.english] : {

  },
  [Language.japanese] : {
  
  },
  
}

export const AuthMenu : Record<Language, Record<string, string>> = {
  [Language.korean] : {
    LoadError : "데이터를 불러오는데 실패했습니다."
  },
  [Language.english] : {

  },
  [Language.japanese] : {
  
  },
  
  }


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
  ],
  [Language.english] : [

  ],
  [Language.japanese] : [

  ],
  
}

export const postLanguageList : Record<Language, { key: string; value: string }[]> = {
  [Language.korean] :  [
    { key: "korean", value: "한국어" },
    { key: "japanese", value: "일본어" },
    { key: "english", value: "영어" },
  ],
  [Language.english] : [

  ],
[Language.japanese] : [

],

}

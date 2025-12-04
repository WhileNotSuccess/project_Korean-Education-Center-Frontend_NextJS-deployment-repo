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
    introduce: "紹介",
    curriculum: "コース紹介",
    application: "申請",
    schoolLife: "学校生活",
    notification: "お知らせ/通知",
  },
  [Language.english]: {
    introduce: "Introduction",
    curriculum: "Curriculum",
    application: "Application",
    schoolLife: "School Life",
    notification: "Notification",
  },
};

export const smallMenu: Record<Language, Record<string, string>> = {
  // 예시메뉴
  [Language.korean]: {
    centerIntro: "한국어교육센터",
    howToGetHere: "오시는길",
    "staff-intro": "교직원",
    "korean-curriculum": "한국어교육과정",
    "open-campus": "오픈캠퍼스",
    internationalReview: "유학생 후기",
    dormitory: "기숙사 안내",
    facility: "학교 시설 안내",
    "procedure-guide": "입학 신청",
  },
  [Language.japanese]: {
    centerIntro: "韓国語教育センター",
    howToGetHere: "アクセス",
    "staff-intro": "教職員",
    "korean-curriculum": "韓国語教育課程",
    "open-campus": "オープンキャンパス",
    internationalReview: "留学生の感想",
    dormitory: "寮案内",
    facility: "学校施設案内",
    "procedure-guide": "入学申請",
  },
  [Language.english]: {
    centerIntro: "Korean Education Center",
    howToGetHere: "Directions",
    "staff-intro": "Faculty and Staff",
    "korean-curriculum": "Korean Language Curriculum",
    "open-campus": "Open Campus",
    internationalReview: "International Student Reviews",
    dormitory: "Dormitory Guide",
    facility: "School Facility Guide",
    "procedure-guide": "Application for Admission",
  },
};

export const staffPage: Record<Language, Record<string, string>> = {
  // 직원 소개 페이지
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
    needInputTitle: "제목을 입력해주세요",
    needInputContent: "내용을 입력해주세요",
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
    needInputTitle: "タイトルを入力してください。",
    needInputContent: "内容を入力してください。",
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
    needInputTitle: "Please enter the title.",
    needInputContent: "Please enter the content.",
  },
};

export const homePage: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    overview: "학사일정",
    notice: "공지사항",
    download: "다운로드",
    "procedure-guide": "입학신청",
    "recruitment-guidelines": "모집요강",
    "Application-Form": "입학신청서",
    certified: "교육국제화역량 인증제(IEQAS) 학위과정/어학연수과정 동시 인증 대학",
    introduction: "영진전문대학교 한국어교육센터는 2021년 3월 설립 이후, 한국어와 한국 문화의 매력을 널리 전파하는 선도적인 교육 기관으로 성장하고 있습니다. 한국어교육센터는 영진전문대학교 내 부설 기관으로 운영되며, 실용적이고 차별화된 한국어 교육과 한국 생활 및 학업에 필요한 세심한 학생지원 서비스를 제공합니다.",
    program: "우리 학교는 외국인 학습자를 위한 체계적인 한국어 교육 프로그램을 운영하고 있습니다. 한국에서의 진학·취업·비즈니스를 준비하거나 한국어를 집중적으로 배우고 싶은 분들에게 적합한 과정으로, 수준별(1~6급) 수업을 통해 기초부터 고급까지 단계적으로 학습할 수 있습니다. 정규 학기제로 운영되어 꾸준한 학습 환경을 제공하며, 실제 생활에서 바로 활용할 수 있는 실용 한국어 중심으로 수업이 진행됩니다.",
    faq: "FAQ",
    review: "유학생 후기",
    footerAddress:
      "41527 대구광역시 북구 복현로 35 (복현2동 218) 영진전문대학교 한국어교육센터",
    footerCallEmail: "대표전화 : +82-53-940-5768 이메일 : intl@yju.ac.kr",
  },
  [Language.japanese]: {
    overview: "学年度カレンダー",
    notice: "通知",
    download: "ダウンロード",
    "procedure-guide": "入学申請",
    "recruitment-guidelines": "募集要項",
    "Application-Form": "入学申請書",
    certified: "IEQAS（教育国際化能力認証制度）学位課程・語学研修課程 同時認証大学",
    introduction: "2021年3月の設立以来、永進大学韓国語教育センターは、韓国語と韓国文化の魅力を広める先駆的な教育機関として成長してきました。永進大学の附属機関として運営されている韓国語教育センターは、韓国での生活と学びに必要な詳細な学生サポートサービスとともに、実践的で特徴的な韓国語教育を提供しています。",
    program: "本校では、外国人学習者のための体系的な韓国語教育プログラムを提供しています。 韓国での進学・就職・ビジネスを目指す方、または集中して韓国語を学習したい方に最適な課程で、1級から6級までのレベル別クラスを通して基礎から上級まで段階的に学ぶことができます。 学期制で計画的に学習でき、日常生活でそのまま使える実用的な韓国語を中心に授業が行われます。",
    faq: "FAQ",
    review: "留学生の感想",
    footerAddress:
      "41527 大邱広域市 北区 復県路 35 (復県2洞 218) 永進専門大学 韓国語教育センター",
    footerCallEmail: "代表電話 : +82-53-940-5768 メール : intl@yju.ac.kr",
  },
  [Language.english]: {
    overview: "Academic Calendar",
    notice: "Notice",
    download: "Download",
    "procedure-guide": "Application for Admission",
    "recruitment-guidelines": "Admission Guidelines",
    "Application-Form": "Application for Admission",
    certified: "A university simultaneously certified for both IEQAS Degree Programs and Language Training Programs",
    introduction: "Since its establishment in March 2021, the Yeungjin University Korean Language Education Center has been growing as a leading educational institution that promotes the charm of the Korean language and culture. Operated as an affiliated institution within Yeungjin University, the Korean Language Education Center provides practical and distinctive Korean language education along with detailed student support services essential for living and studying in Korea.",
    program: "Our school offers a structured Korean language program designed for international learners. It is ideal for those preparing for academic studies, employment, or business in Korea, as well as learners who wish to study Korean intensively. Through level-based classes (from Level 1 to Level 6), students can progress systematically from beginner to advanced Korean. The program follows a regular academic schedule and focuses on practical, real-life Korean that students can use immediately in daily situations.",
    faq: "FAQ",
    review: "International Student Reviews",
    footerAddress:
      "41527 35 Bokhyeon-ro, Buk-gu, Daegu, Korea Yeungjin College Korean Language Education Center",
    footerCallEmail: "Phone: +82-53-940-5768 Email: intl@yju.ac.kr",
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
  [Language.korean]: {
    server: "서버 오류가 발생했습니다.",
  },
  [Language.english]: {
    server: "A server error has occurred.",
  },
  [Language.japanese]: {
    server: "サーバーエラーが発生しました。",
  },
};

export const postSuccess: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    contentPost: "글 업로드에 성공했습니다.",
  },
  [Language.japanese]: {
    contentPost: "記事のアップロードに成功しました。",
  },
  [Language.english]: {
    contentPost: "Successfully uploaded post.",
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
    { key: "korean-outline", value: "Overview of Korean Language Program" },
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
    introduction: "한국어교육센터 소개",
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
    notice: "通知",
    news: "お知らせ",
    faq: "FAQ",
    introduction: "韓国語教育センター",
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
    review: "International Student Reviews",
    "application-form": "Application Form",
    "learning-materials": "Learning Materials Guide",
    notice: "Notice",
    news: "Center News",
    faq: "FAQ",
    introduction: "Korean Education Center",
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
      { key: "introduction", value: "한국어교육센터" },
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
      { key: "opencampus-purpose", value: "목적" },
      { key: "opencampus-content", value: "일정 및 내용" },
      { key: "opencampus-schedule", value: "스케쥴" },
      { key: "procedure-guide", value: "입학 신청" },
    ],
    [Language.japanese]: [
      { key: "introduction", value: "韓国語教育センター" },
      { key: "directions", value: "アクセス" },
      { key: "visa", value: "ビザ案内" },
      { key: "dormitory", value: "寮案内" },
      { key: "facility", value: "学校施設案内" },
      { key: "insurance", value: "健康保険案内" },
      { key: "review", value: "留学生の感想" },
      { key: "application-form", value: "申請書類" },
      { key: "learning-materials", value: "学習資料案内" },
      { key: "notice", value: "通知" },
      { key: "news", value: "お知らせ" },
      { key: "faq", value: "FAQ" },
      { key: "korean-outline", value: "概要" },
      { key: "korean-sample", value: "プログラムサンプル" },
      { key: "opencampus-purpose", value: "目的" },
      { key: "opencampus-content", value: "日程と内容" },
      { key: "opencampus-schedule", value: "スケジュール" },
      { key: "procedure-guide", value: "入学申請" },
    ],
    [Language.english]: [
      { key: "introduction", value: "Korean Education Center" },
      { key: "directions", value: "Directions" },
      { key: "visa", value: "Visa Information" },
      { key: "dormitory", value: "Dormitory Information" },
      { key: "facility", value: "School Facilities Guide" },
      { key: "insurance", value: "Health Insurance Information" },
      { key: "review", value: "International Student Reviews" },
      { key: "application-form", value: "Application Form" },
      { key: "learning-materials", value: "Learning Materials Guide" },
      { key: "notice", value: "Notice" },
      { key: "news", value: "Korean Education Center News" },
      { key: "faq", value: "FAQ" },
      { key: "korean-outline", value: "Overview" },
      { key: "korean-sample", value: "Program Sample" },
      { key: "opencampus-purpose", value: "Purpose" },
      { key: "opencampus-content", value: "Schedule and Content" },
      { key: "opencampus-schedule", value: "Schedule" },
      { key: "procedure-guide", value: "Application for Admission" },
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
    introduction: "한국어교육센터",
    directions: "오시는 길",
    visa: "비자 안내",
    dormitory: "기숙사 안내",
    facility: "학교 시설 안내",
    insurance: "건강 보험 안내",
    "korean-outline": "개요",
    "korean-sample": "프로그램 샘플",
    "opencampus-purpose": "목적",
    "opencampus-content": "일정 및 내용",
    "opencampus-schedule": "스케쥴",
    "procedure-guide": "입학 신청",
  },
  [Language.japanese]: {
    introduction: "韓国語教育センター",
    directions: "アクセス",
    visa: "ビザ案内",
    dormitory: "寮案内",
    facility: "学校施設案内",
    insurance: "健康保険案内",
    "korean-outline": "概要",
    "korean-sample": "プログラムサンプル",
    "opencampus-purpose": "目的",
    "opencampus-content": "日程と内容",
    "opencampus-schedule": "スケジュール",
    "procedure-guide": "入学申請",
  },
  [Language.english]: {
    introduction: "Korean Education Center",
    directions: "Directions",
    visa: "Visa Information",
    dormitory: "Dormitory Information",
    facility: "School Facility Guide",
    insurance: "Health Insurance Information",
    "korean-outline": "Overview of Korean Language Program",
    "korean-sample": "Program Sample",
    "opencampus-purpose": "Purpose",
    "opencampus-content": "Schedule and Content",
    "opencampus-schedule": "Schedule",
    "procedure-guide": "Application for admission",
  },
};

export const selectMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    "korean-curriculum": "한국어교육과정",
    "open-campus": "오픈캠퍼스",
  },
  [Language.japanese]: {
    "korean-curriculum": "韓国語教育課程",
    "open-campus": "オープンキャンパス",
  },
  [Language.english]: {
    "korean-curriculum": "Korean Language Curriculum",
    "open-campus": "Open Campus",
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
    writeTitle: "제목을 입력하세요",
  },
  [Language.japanese]: {
    notice: "通知",
    title: "タイトル",
    content: "内容",
    createDate: "作成日",
    updateDate: "更新日",
    search: "検索",
    write: "作成",
    number: "番号",
    author: "作成者",
    writeTitle: "タイトルを入力してください",
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
    writeTitle: "Enter a title",
  },
};

export const getError: Record<Language, Record<string, string>> = {
  // get요청에 실패했을때의 메뉴들
  [Language.korean]: {
    staffError: "교직원 정보를 불러오지 못했습니다.",
    boardError: "게시글들을 불러올 수 없습니다.",
    htmlError: "해당 게시글을 불러올 수 없습니다.",
    bannerError: "배너를 불러올 수 없습니다.",
    newsError: "소식을 불러올 수 없습니다.",
    entranceApplicationError: "모집요강 및 입학신청를 불러올 수 없습니다.",
    searchBoardError: "검색된 게시글들을 불러올 수 없습니다.",
    fileDownloadError: "파일을 다운로드하지 못했습니다.",
  },
  [Language.japanese]: {
    staffError: "教職員の情報を読み込めませんでした。",
    boardError: "投稿を読み込むことができませんでした。",
    htmlError: "該当の投稿を読み込むことができませんでした。",
    bannerError: "バナーを読み込むことができませんでした。",
    newsError: "お知らせを読み込むことができませんでした。",
    entranceApplicationError:
      "募集要項および入学申請を読み込むことができません。",
    searchBoardError: "検索結果を読み込むことができません。",
    fileDownloadError: "ファイルをダウンロードできませんでした。",
  },
  [Language.english]: {
    staffError: "Failed to load staff and employee information.",
    boardError: "Failed to load the posts.",
    htmlError: "Failed to load the specific post.",
    bannerError: "Failed to load the banner.",
    newsError: "Failed to load the news.",
    entranceApplicationError:
      "Failed to load the recruitment guidelines and admission application.",
    searchBoardError: "Failed to load the search results.",
    fileDownloadError: "The file could not be downloaded.",
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
    userError: "로그인 후 이용하셔야 합니다.",
  },
  [Language.japanese]: {
    delete: "投稿の削除に失敗しました。",
    userError: "ログイン後に利用する必要があります。",
  },
  [Language.english]: {
    delete: "Failed to delete the post.",
    userError: "You need to log in to use this.",
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
    { key: "procedure-guide", value: "입학 신청 안내" },
    { key: "upload-documents", value: "서류 업로드" },
  ],
  [Language.japanese]: [
    { key: "procedure-guide", value: "入学申請手続きに関して" },
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
    "counseling-guide": `カウンセリング申し込みを入学相談のお申込みに変換 入学相談が可能な時間は、韓国標準時間(KST)で平日午前9時~午後6時です。`,
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
    inputId: "아이디 입력",
    inputPassWord: "비밀번호 입력",
  },
  [Language.japanese]: {
    Login: "ログイン",
    register: "会員登録",
    welcome: "ヨンジン専門大学 韓国語教育センターへようこそ。",
    inputId: "IDを入力",
    inputPassWord: "パスワードを入力",
  },
  [Language.english]: {
    Login: "Login",
    register: "Sign Up",
    welcome: "Welcome to Yeungjin College Korean Education Center.",
    inputId: "Enter ID",
    inputPassWord: "Enter Password",
  },
};

export const RegisterCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    inputName: "한국어교육센터에서 사용할 이름을 입력해주세요.",
    register: "회원가입",
    namePlaceHolder: "이름",
    emailPlaceHolder: "이메일",
    passWordPlaceHolder: "비밀번호",
    googleRegister: "구글 회원가입",
    nameChange: "이름 변경",
    registerComplete: "이메일 인증이 필요합니다. 이메일을 확인해주세요.",
    registerError: "회원가입을 할 수 없습니다.",
    nameChangeComplete: "이름이 성공적으로 변경되었습니다.",
    nameChangeError: "이름을 변경할 수 없습니다",
  },
  [Language.english]: {
    inputName:
      "Please enter the name to be used at the Korean Language Education Center.",
    register: "Register",
    namePlaceHolder: "Name",
    emailPlaceHolder: "Email",
    passWordPlaceHolder: "Password",
    googleRegister: "Google Register",
    nameChange: "Change Name",
    registerComplete:
      "Email verification is required. Please check your email.",
    registerError: "Registration is not possible.",
    nameChangeComplete: "Your name has been successfully changed.",
    nameChangeError: "Your name cannot be changed.",
  },
  [Language.japanese]: {
    inputName: "韓国語教育センターで使用する名前を入力してください。",
    register: "登録",
    namePlaceHolder: "名前",
    emailPlaceHolder: "メール",
    passWordPlaceHolder: "パスワード",
    googleRegister: "Google サインアップ",
    nameChange: "名前変更",
    registerComplete: "メール認証が必要です。メールをご確認ください。",
    registerError: "登録できません。",
    nameChangeComplete: "名前が正常に変更されました。",
    nameChangeError: "名前を変更できません。",
  },
};

export const FormComponentMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    applicationSuccess: "상담 신청이 완료되었습니다.",
    applicationFail: "상담 신청에 실패했습니다.",
  },
  [Language.english]: {
    applicationSuccess: "The consultation application has been completed.",
    applicationFail: "Failed to apply for consultation.",
  },
  [Language.japanese]: {
    applicationSuccess: "相談申請が完了しました。",
    applicationFail: "相談申請に失敗しました。",
  },
};

export const DashboardCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    loadingOrNotFoundUser: "로딩 중이거나 사용자 정보가 없습니다.",
    userInformation: "님의 정보",
    nameChange: "이름 변경",
    connectGoogle: "구글 연동",
    submitDocument: "제출한 서류",
    submitComplete: "제출 완료",
    submitIncomplete: "제출 미완료",
    attachedFile: "첨부파일",
  },
  [Language.english]: {
    loadingOrNotFoundUser: "Loading or no user information found.",
    userInformation: "'s Information",
    nameChange: "Change Name",
    connectGoogle: "Connect Google",
    submitDocument: "Submitted Documents",
    submitComplete: "Submission Complete",
    submitIncomplete: "Submission Incomplete",
    attachedFile: "Attachment",
  },
  [Language.japanese]: {
    loadingOrNotFoundUser: "読み込み中またはユーザー情報がありません。",
    userInformation: "の情報",
    nameChange: "名前変更",
    connectGoogle: "Google連携",
    submitDocument: "提出した書類",
    submitComplete: "提出完了",
    submitIncomplete: "提出未完了",
    attachedFile: "添付ファイル",
  },
};

export const NameChangeModalMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    successNameChange: "이름이 성공적으로 변경되었습니다.",
    failNameChange: "이름 변경에 실패했습니다.",
    nameChangeError: "이름 변경 중 오류가 발생했습니다",
    nameChange: "이름 변경",
    save: "저장",
    cancel: "취소",
    newNameInput: "새로운 이름 입력",
  },
  [Language.english]: {
    successNameChange: "Name has been successfully changed.",
    failNameChange: "Failed to change name.",
    nameChangeError: "An error occurred while changing the name.",
    nameChange: "Change Name",
    save: "Save",
    cancel: "Cancel",
    newNameInput: "Enter new name",
  },
  [Language.japanese]: {
    successNameChange: "名前が正常に変更されました。",
    failNameChange: "名前の変更に失敗しました。",
    nameChangeError: "名前変更中にエラーが発生しました。",
    nameChange: "名前変更",
    save: "保存",
    cancel: "キャンセル",
    newNameInput: "新しい名前を入力",
  },
};

export const SelectPageCompoMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    failLoadPosts: "해당 게시글을 불러올 수 없습니다.",
    failLoadContent: "내용을 불러올 수 없습니다.",
    failLoadCourse: "지원과정 목록을 불러올 수 없습니다.",
    failLoadUserInfo: "유저 정보를 불러오는데 실패했습니다.",
    needLogin: "로그인이 필요합니다.",
    needFile: "파일을 첨부해주세요.",
    needPhoneNumber: "전화번호를 입력해주세요.",
    needCourse: "지원과정을 선택해주세요.",
    loadingCourse: "지원과정을 불러오는 중...",
    submit: "제출",
    inputPhoneNumber: "전화번호를 입력하세요.",
    fileSelect: "파일 선택",
  },
  [Language.english]: {
    failLoadPosts: "Unable to load the post.",
    failLoadContent: "Unable to load the content.",
    failLoadCourse: "Unable to load the course list.",
    failLoadUserInfo: "Failed to load user information.",
    needLogin: "Login is required.",
    needFile: "Please attach a file.",
    needPhoneNumber: "Please enter a phone number.",
    needCourse: "Please select a course.",
    loadingCourse: "Loading courses...",
    submit: "Submit",
    inputPhoneNumber: "Enter phone number.",
    fileSelect: "file Select",
  },
  [Language.japanese]: {
    failLoadPosts: "その投稿を読み込むことができません。",
    failLoadContent: "内容を読み込むことができません。",
    failLoadCourse: "サポートコースのリストを読み込むことができません。",
    failLoadUserInfo: "ユーザー情報の読み込みに失敗しました。",
    needLogin: "ログインが必要です。",
    needFile: "ファイルを添付してください。",
    needPhoneNumber: "電話番号を入力してください。",
    needCourse: "コースを選択してください。",
    loadingCourse: "コースを読み込んでいます...",
    submit: "提出",
    inputPhoneNumber: "電話番号を入力してください。",
    fileSelect: "ファイル選択",
  },
};

export const AuthMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    LoadError: "데이터를 불러오는데 실패했습니다.",
  },
  [Language.english]: {
    LoadError: "Failed to load data.",
  },
  [Language.japanese]: {
    LoadError: "データの読み込みに失敗しました。",
  },
};

export const Hamburger: Record<
  Language,
  { topMenu: string; subMenu: { address: string; name: string }[] }[]
> = {
  [Language.korean]: [
    {
      topMenu: "센터소개",
      subMenu: [
        { address: "/guidance/introduction", name: "한국어교육센터" },
        { address: "/guidance/directions", name: "오시는길" },
        { address: "/staff/staff-intro", name: "교직원" },
      ],
    },
    {
      topMenu: "과정소개",
      subMenu: [
        { address: "/select/korean-curriculum", name: "한국어교육과정" },
        { address: "/select/open-campus", name: "오픈캠퍼스" },
        { address: "/board/review", name: "유학생 후기" },
      ],
    },
    {
      topMenu: "신청",
      subMenu: [
        { address: "/guidance/procedure-guide", name: "입학 신청" },
        { address: "/form/counseling", name: "상담 신청" },
        { address: "/board/application-form", name: "신청 서류" },
        { address: "/guidance/visa", name: "비자 안내" },
      ],
    },
    {
      topMenu: "학교생활",
      subMenu: [
        { address: "/guidance/dormitory", name: "기숙사 안내" },
        { address: "/guidance/facility", name: "학교 시설 안내" },
        { address: "/board/learning-materials", name: "학습 자료 안내" },
        { address: "/guidance/insurance", name: "건강 보험 안내" },
      ],
    },
    {
      topMenu: "알림/공지",
      subMenu: [
        { address: "/board/notice", name: "공지사항" },
        { address: "/board/news", name: "한국어교육센터 알림" },
        { address: "/board/faq", name: "FAQ" },
      ],
    },
  ],
  [Language.english]: [
    {
      topMenu: "Center Introduction",
      subMenu: [
        {
          address: "/guidance/introduction",
          name: "Korean Education Center",
        },
        { address: "/guidance/directions", name: "Directions" },
        {
          address: "/staff/staff-intro",
          name: "Faculty and Staff Introduction",
        },
      ],
    },
    {
      topMenu: "Course Introduction",
      subMenu: [
        {
          address: "/select/korean-curriculum",
          name: "Korean Language Curriculum",
        },
        { address: "/select/open-campus", name: "Open Campus" },
        { address: "/board/review", name: "International Student Reviews" },
      ],
    },
    {
      topMenu: "Application",
      subMenu: [
        { address: "/guidance/procedure-guide", name: "Application for Admission" },
        { address: "/form/counseling", name: "Counseling Application" },
        { address: "/board/application-form", name: "Application Documents" },
        { address: "/guidance/visa", name: "Visa Information" },
      ],
    },
    {
      topMenu: "School Life",
      subMenu: [
        { address: "/guidance/dormitory", name: "Dormitory Information" },
        {
          address: "/guidance/facility",
          name: "School Facilities Information",
        },
        {
          address: "/board/learning-materials",
          name: "Learning Materials Information",
        },
        {
          address: "/guidance/insurance",
          name: "Health Insurance Information",
        },
      ],
    },
    {
      topMenu: "Notification",
      subMenu: [
        { address: "/board/notice", name: "Notices" },
        {
          address: "/board/news",
          name: "Center News",
        },
        { address: "/board/faq", name: "FAQ" },
      ],
    },
  ],
  [Language.japanese]: [
    {
      topMenu: "紹介",
      subMenu: [
        { address: "/guidance/introduction", name: "韓国語教育センター" },
        { address: "/guidance/directions", name: "アクセス" },
        { address: "/staff/staff-intro", name: "教職員" },
      ],
    },
    {
      topMenu: "コース紹介",
      subMenu: [
        { address: "/select/korean-curriculum", name: "韓国語教育課程" },
        { address: "/select/open-campus", name: "オープンキャンパス" },
        { address: "/board/review", name: "留学生の感想" },
      ],
    },
    {
      topMenu: "申請",
      subMenu: [
        { address: "/guidance/procedure-guide", name: "入学申請" },
        { address: "/form/counseling", name: "カウンセリング申し込み" },
        { address: "/board/application-form", name: "申請書類" },
        { address: "/guidance/visa", name: "ビザ案内" },
      ],
    },
    {
      topMenu: "学校生活",
      subMenu: [
        { address: "/guidance/dormitory", name: "寮案内" },
        { address: "/guidance/facility", name: "学校施設案内" },
        { address: "/board/learning-materials", name: "学習資料案内" },
        { address: "/guidance/insurance", name: "健康保険案内" },
      ],
    },
    {
      topMenu: "お知らせ/通知",
      subMenu: [
        { address: "/board/notice", name: "通知" },
        { address: "/board/news", name: "お知らせ" },
        { address: "/board/faq", name: "FAQ" },
      ],
    },
  ],
};

export const postLanguageList: Record<
  Language,
  { key: string; value: string }[]
> = {
  [Language.korean]: [
    { key: "korean", value: "한국어" },
    { key: "japanese", value: "일본어" },
    { key: "english", value: "영어" },
  ],
  [Language.english]: [
    { key: "korean", value: "Korean" },
    { key: "japanese", value: "Japanese" },
    { key: "english", value: "English" },
  ],
  [Language.japanese]: [
    { key: "korean", value: "韓国語" },
    { key: "japanese", value: "日本語" },
    { key: "english", value: "英語" },
  ],
};

export const HomePageTitle: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    yeungjin: "영진전문대학교",
    koreanEducationCenter: "한국어교육센터",
  },
  [Language.english]: {
    yeungjin: "Yeungjin University",
    koreanEducationCenter: "Korean Education Center",
  },
  [Language.japanese]: {
    yeungjin: "ヨンジン専門大学",
    koreanEducationCenter: "韓国語教育センター",
  },
};

export const CheckAdminAlert: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    noPermission: "잘못된 접근입니다.",
  },
  [Language.english]: {
    noPermission: "This is an invalid access",
  },
  [Language.japanese]: {
    noPermission: "不正なアクセスです",
  },
};

export const TermsOfService: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    privacyPolicy: "개인정보처리방침",
    terms: "이용약관",
  },
  [Language.japanese]: {
    privacyPolicy: "個人情報保護方針",
    terms: "利用規約",
  },
  [Language.english]: {
    privacyPolicy: "Privacy Policy",
    terms: "Terms and Conditions",
  },
};

export const AlertModalMenu: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    close: "닫기",
  },
  [Language.english]: {
    close: "close",
  },
  [Language.japanese]: {
    close: "閉じる",
  },
};

export const CheckUserAlert: Record<Language, Record<string, string>> = {
  [Language.korean]: {
    noPermission: "잘못된 접근입니다.",
  },
  [Language.english]: {
    noPermission: "This is an invalid access",
  },
  [Language.japanese]: {
    noPermission: "不正なアクセスです",
  },
};

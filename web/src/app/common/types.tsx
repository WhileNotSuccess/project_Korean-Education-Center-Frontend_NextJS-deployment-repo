export interface HtmlDocsProps {
  id?: string;
  category?: string;
}

export interface MenuType {
  [key: string]: { [key: string]: string };
}

export enum Language {
  korean = "korean",
  english = "english",
  japanese = "japanese",
}

export type Counseling = {
  email: string;
  id: number;
  isDone: number;
  phone: string;
  schedule: string;
  name: string;
};

export type Attachments = {
  id: number;
  fileSize: number;
  filename: string;
  filetype: string;
  applicationId: number;
};
export type ApplicationFormItemProp = {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  course: string;
  phoneNumber: string;
  createdDate: string;
  isDone: boolean;
  attachments: Array<Attachments>;
};

export type ServerDocumentFile = {
  // 서버에서 받는 파일 타입
  id: number;
  postId: number;
  filename: string;
  filetype: string;
  filesize: number;
  createdDate: string;
};

export type BoardData = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdDate: string;
  updatedDate: string;
  category: string;
};

export type Banner = {
  expiredDate: string;
  id: number;
  image: string;
  language: string;
  url: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export interface Teacher {
  id: number;
  name: string;
  position: string;
  phone: string | null;
  email: string | null;
}

export interface SubmittedDocument {
  Id: number;
  korean: string;
  english: string;
  japanese: string;
  createdDate: string;
  isDone: boolean;
  attachments: ApplicationAttach[];
}

export interface NameChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export interface Course {
  id: number;
  korean: string;
  japanese: string;
  english: string;
}

export interface CategoryParams {
  category: string;
}

export interface IdParams {
  id: string;
}

export type ApplicationAttach = {
  id: number;
  filename: string;
  filetype: string;
  fileSize: number;
};

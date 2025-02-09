import { guidanceMenu } from "../menu";

const language = "korean";

export interface HtmlDocsProps {
  //category : keyof typeof guidanceMenu["korean"]
  //[key in "id" | "category" ]: string;
  id?: string;
  category?: string | number;
}

export interface MenuType {
  [key: string]: { [key: string]: string };
}

export enum Language {
  korean = "korean",
}

export type Counseling = {
  email: string;
  id: number;
  isDone: number;
  phone: string;
  schedule: string;
  name: string;
};

export type Application = {
  id: number;
  userId: number;
  filename: string;
  course: string;
  createdDate: string;
  filetype: string;
  fileSize: number;
  isDone: boolean;
};

export type ServerDocumentFile = { // 서버에서 받는 파일 타입
  id : number;
  postId : number;
  filename : string;
  filetype : string;
  filesize : number;
  createdDate : string
}
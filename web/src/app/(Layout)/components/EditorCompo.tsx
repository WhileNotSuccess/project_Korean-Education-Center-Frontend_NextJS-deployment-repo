"use client";
import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  editorCompo,
  postError,
  postSuccess,
  categoryList,
  updateSuccess,
  updateError,
  SelectPageCompoMenu,
} from "@/app/menu";
import Cookies from "js-cookie";
import useCustomFormFetch from "@/app/lib/customFormFetch";
import { Language, ServerDocumentFile } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";
import { useRouter } from "next/navigation";
import Image from "next/image";

type EditorProps = {
  id?: string;
  categoryName?: string;
  content?: string;
  title?: string;
};

export default function EditorComponent(props: EditorProps) {
  const editorRef = useRef<any>(null); // tinymce를 직접 조작하는
  const [content, setContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [imagePath, setImagePath] = useState<Array<string>>([]);
  const [documentFiles, setDocumentFiles] = useState<Array<File>>([]); // 파일 저장을 위한 상태
  const [documentFileNames, setDocumentFileNames] = useState<Array<string>>([]); // 파일 이름 리스트
  const [deleteFileNames, setDeleteFileNames] = useState<Array<string>>([]); // 삭제할 파일 이름 리스트
  const customFormFetch = useCustomFormFetch();
  const customFetch = useCustomFetch();
  const [category, setCategory] = useState<string>(props.categoryName || "");
  const [isPinned, setIsPinned] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const [writerName, setWriterName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const checkPermissionAndLoad = async () => {
      let currentCategory = props.categoryName || "";

      if (props.id) {
        try {
          const urlPwd = new URLSearchParams(window.location.search).get("password") || "";
          const endpoint = `/posts?id=${props.id}${urlPwd ? `&password=${encodeURIComponent(urlPwd)}` : ""}`;
          const response = await customFetch(endpoint, {
            method: "GET",
          });
          if (!response.ok) throw new Error("Load failed");
          const data = await response.json();
          setContent(data.data.content);
          setTitle(data.data.title);
          setCategory(data.data.category);
          setIsPinned(!!data.data.isPinned);
          setIsSecret(!!data.data.isSecret);
          setWriterName(data.data.writerName || "");
          setPassword(urlPwd || data.data.password || "");
          setDocumentFileNames(
            data.files.map((file: ServerDocumentFile) => file.filename)
          );
          currentCategory = data.data.category;
        } catch (error) {
          alert(language === Language.korean ? "게시글을 불러올 수 없거나 권한이 없습니다." : "Cannot load post or unauthorized.");
          router.back();
          return;
        }
      }

      try {
        const response = await customFetch("/users");
        if (response.ok) {
          const adminData = await response.json();
          setIsAdmin(adminData.result);
        } else {
          if (currentCategory !== "qna") {
            alert(language === Language.korean ? "관리자 로그인이 필요합니다." : "Admin login required.");
            router.push("/login");
          }
        }
      } catch (error) {
        if (currentCategory !== "qna") {
          alert(language === Language.korean ? "관리자 로그인이 필요합니다." : "Admin login required.");
          router.push("/login");
        }
      }
    };
    checkPermissionAndLoad();
  }, [props.id, props.categoryName]);

  const submit = async () => {
    if (title === "") {
      alert(editorCompo[language].needInputTitle);
    } else if (content === "") {
      alert(editorCompo[language].needInputContent);
    } else {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("language", language);
        if (category === "notice" && isPinned) {
          formData.append("isPinned", "true");
        }
        if (category === "qna") {
          if (!writerName.trim()) {
            alert(language === Language.korean ? "작성자 이름을 입력해주세요." : "Please enter the writer name.");
            return;
          }
          if (!password || password.length < 4) {
            alert(language === Language.korean ? "비밀번호는 4자 이상이어야 합니다." : "Password must be at least 4 characters.");
            return;
          }
          formData.append("writerName", writerName);
          formData.append("password", password);
          if (isSecret) {
            formData.append("isSecret", "true");
          }
        }

        // 첨부파일이 있다면, FormData에 추가
        documentFiles.forEach((file) => {
          formData.append("files", file); // 문서 파일도 함께 전송
        });
        const response = await customFormFetch("/posts", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          alert(postSuccess[language]?.contentPost);
          router.back();
        } else {
          alert(postError[language]?.subError);
        }

      } catch (error) {
        alert(postError[language]?.subError);
      }
    }
  };

  const update = async () => {
    if (title === "") {
      alert(editorCompo[language].needInputTitle);
    } else if (content === "") {
      alert(editorCompo[language].needInputContent);
    } else {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("language", language);
        if (category === "notice" && isPinned) {
          formData.append("isPinned", "true");
        }
        if (category === "qna") {
          if (!writerName.trim()) {
            alert(language === Language.korean ? "작성자 이름을 입력해주세요." : "Please enter the writer name.");
            return;
          }
          formData.append("writerName", writerName);
          if (isSecret) {
            formData.append("isSecret", "true");
          }
          const urlPwd = new URLSearchParams(window.location.search).get("password") || "";
          formData.append("password", password || urlPwd);
        }

        formData.append("deleteFilePath", JSON.stringify(deleteFileNames));
        documentFiles.forEach((file) => {
          formData.append("files", file); // 문서 파일도 함께 전송
        });
        const response = await customFormFetch(`/posts/${props.id}`, {
          method: "PATCH",
          body: formData,
        });
        if (response.ok) {
          alert(updateSuccess[language]?.updatePost);
          router.back();
        }

      } catch (error) {
        alert(updateError[language]?.update);
      }
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const data = await customFormFetch("/attachments", {
          // 주소 바꿔야함, body랑 헤더를 커스텀 함수를 만들어서 보내는걸로로 변경해야함

          method: "POST",
          body: formData,
        });
        const body = await data.json()
        const imageUrl = decodeURIComponent(body.url);
        return imageUrl;
      } catch (error) {
        alert(postError[language]?.imgError);
      }
    }
  };

  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFileNames = filesArray.map((file) => file.name);
      setDeleteFileNames((prev) =>
        prev.filter((name) => !newFileNames.includes(name))
      );
      setDocumentFiles((prev) => [...prev, ...filesArray]);
      setDocumentFileNames((prev) => [
        ...prev,
        ...filesArray.map((file) => file.name),
      ]); // 파일 이름을 저장
    }
  };

  const addDeleteFileName = (fileName: string) => {
    setDocumentFiles((prev) => prev.filter((file) => file.name !== fileName));
    setDocumentFileNames((prev) => prev.filter((name) => name !== fileName));
    setDeleteFileNames((prev) => [...prev, fileName]);
  };

  return (
    <main className="w-full flex justify-center">
      <section style={{ width: "80%" }} className="mt-4">
        <form>
          <div className="flex">
            <div>
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Your Email
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </div>
          {category === "qna" && (
            <div className="flex flex-col gap-2 mb-3 mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={language === Language.korean ? "작성자 이름" : "Author Name"}
                  className="p-2.5 border border-gray-300 rounded-lg text-sm w-full sm:w-1/3"
                  value={writerName}
                  onChange={(e) => setWriterName(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center gap-4 mt-1">
                <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSecret}
                    onChange={(e) => {
                      setIsSecret(e.target.checked);
                    }}
                  />
                  {language === Language.korean ? "비밀글로 작성" : language === Language.japanese ? "非公開にする" : "Write as secret post"}
                </label>

                <input
                  type="password"
                  placeholder={language === Language.korean ? "비밀번호 (4자 이상)" : "Password (4+ chars)"}
                  className="p-2 border border-gray-300 rounded-lg text-sm w-full sm:w-1/3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                  required
                />
              </div>
            </div>
          )}
          {isAdmin ? (
            <div className="w-full flex justify-between border mb-1">
              <select
                className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                value={category}
                onChange={(e) => {
                  const next = e.target.value;
                  setCategory(next);
                  if (next !== "notice") setIsPinned(false);
                }}
              >
                All categories
                {categoryList[language].map((item) => (
                  <option
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    key={item.key}
                    value={item.key}
                  >
                    {item.value}
                  </option>
                ))}
              </select>

              <select
                className="border rounded-sm cursor-pointer"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                {Object.values(Language).map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {isAdmin && category === "notice" ? (
            <label className="flex items-center gap-2 mt-2 mb-2 text-sm text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
              />
              {editorCompo[language]?.pin}
            </label>
          ) : null}

        </form>

        <div className="w-full flex justify-between items-center">
          <section className="w-[50%]">
            <label className="w-full text-xs  bg-blue-500 text-white p-2 rounded-md">
              {SelectPageCompoMenu[language].fileSelect}
              <input
                type="file"
                accept=".*"
                multiple
                onChange={handleDocumentFileChange}
                className="hidden"
              />
            </label>

            <ul className={documentFileNames.length > 0 ? "border mt-4" : ""}>
              {documentFileNames &&
                documentFileNames.map((fileName, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center ${deleteFileNames.includes(fileName) ? "hidden" : ""
                      }`}
                  >
                    <div className="flex flex-rows items-center">
                      <Image
                        src="/images/attachFile.png"
                        alt=""
                        width={96}
                        height={96}
                        className="size-4 flex justify-center items-center mr-4"
                      />
                      <li>
                        {fileName.match(/^\d{8}-\d{6}_/)
                          ? fileName.substring(16)
                          : fileName}
                      </li>
                    </div>
                    <Image
                      src="/images/xbutton.png"
                      alt=""
                      width={96}
                      height={96}
                      className="size-4 cursor-pointer"
                      onClick={() => addDeleteFileName(fileName)}
                    />
                  </div>
                ))}
            </ul>
          </section>
        </div>
        <section className="mt-1.5">
          {category === "qna" ? (
            <textarea
              className="w-full min-h-[300px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder={language === Language.korean ? "내용을 입력해주세요." : "Enter content here..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          ) : (
            <Editor
              tinymceScriptSrc={"/tinymce/tinymce.min.js"}
              id="tinymce-editor"
              value={content}
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              init={{
                language: "ko_KR",
                relative_urls: false,
                remove_script_host: false,
                document_base_url: process.env.NEXT_PUBLIC_BACKEND_URL?.replace(
                  "/api",
                  ""
                ),
                language_url: "/tinymce/langs/ko_KR.js",
                height: 800,
                plugins: ["lists", "link", "image", "table"],
                content_style: "p {margin:0} img{display:inline}",
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | table",
                file_picker_types: "image", // 파일 선택기에서 다룰 파일 형식
                file_picker_callback: (cb, value, meta) => {
                  const input = fileInputRef.current;
                  input?.addEventListener("change", async (e) => {
                    const target = e.target as HTMLInputElement;
                    const imageFile = target.files ? target.files[0] : null;
                    if (imageFile) {
                      const url = await handleFileSelect(imageFile);
                      if (url) {
                        setImagePath((prev) => [...prev, url]);
                        cb(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
                          title: imageFile.name,
                        });
                      }
                    }
                  });
                  input?.click();
                },
              }}
              onEditorChange={(item) => setContent(item)}
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="imageInput"
          />
        </section>
        {props.id ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
            onClick={update}
          >
            {editorCompo[language]?.update}
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
            onClick={submit}
          >
            {editorCompo[language]?.submit}
          </button>
        )}
      </section>
    </main>
  );
}

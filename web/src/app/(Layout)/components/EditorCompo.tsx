'use client'
import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorCompo, postError, postSuccess, categoryList, deleteError, deleteSuccess, updateSuccess, updateError } from "@/app/menu";
import Cookies from "js-cookie";
import useCustomFormFetch from "@/app/lib/customFormFetch";
import { Language, ServerDocumentFile } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";

// PATCH요청 미완성, 현재 POST요청은 formdata로만 보내기 가능(파일이없으면 application/json으로 보내려고 협의중), patch요청은 작동을 안함
// 파일 업로드 로직은 미완성

type EditorProps = {
  id? : string
  categoryName? : string
  content? : string
  title? : string
};

export default function EditorComponent( props : EditorProps) {
  const editorRef = useRef<any>(null); // tinymce를 직접 조작하는
  const [content, setContent] = useState<string>(""); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [imagePath, setImagePath] = useState<Array<string>>([]);
  const [documentFiles, setDocumentFiles] = useState<Array<File>>([]); // 파일 저장을 위한 상태
  const [documentFileNames, setDocumentFileNames] = useState<Array<string>>([]); // 파일 이름 리스트
  const [deleteFileNames, setDeleteFileNames] = useState<Array<string>>([]) // 삭제할 파일 이름 리스트
  const customFormFetch = useCustomFormFetch();
  const customFetch = useCustomFetch();
  const language: Language = (Cookies.get("language") as Language) || "korean";
  const [category, setCategory] = useState<string>(props.categoryName || "");

  useEffect(() => {
    const oldPost = async () => {
      if (!props.id) return;
      try {
        const data = await customFetch(`/posts?id=${props.id}`, { method: "GET" });
        setContent(data.data.content);
        setTitle(data.data.title);
        setCategory(data.data.category);
        setDocumentFileNames(data.files.map((file : ServerDocumentFile) => file.filename))
        console.log(data.files.map((file : ServerDocumentFile) => file.filename));
      } catch (error) {
        console.error(error);
      }
    };
    oldPost();
  }, [props.id]);

  const submit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("language", language);

    // 첨부파일이 있다면, FormData에 추가
    documentFiles.forEach((file) => {
      formData.append("file", file); // 문서 파일도 함께 전송
    });
    const response = await customFormFetch(
      "/posts",{ 
        method: "POST", body: formData 
      }
    )} catch (error) {
      alert(postError[language]?.subError);
    }
  };

  const update = async () =>{
    try{
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("language", language);
      formData.append("deleteFilePath", JSON.stringify(deleteFileNames))
      documentFiles.forEach((file) => {
        formData.append("file", file); // 문서 파일도 함께 전송
      });
      const response = await customFormFetch(
        `/posts/${props.id}`,{
          method : "PATCH",
          body : formData
        }
      )

    }catch(error){

    }
  }


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
        const imageUrl = decodeURIComponent(data.url);
        return imageUrl;
      } catch (error) {
        alert(postError[language]?.imgError);
      }
    }
  };

  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDocumentFiles((prev) => [...prev, ...filesArray]);
      setDocumentFileNames((prev) => [...prev, ...filesArray.map((file) => file.name)]); // 파일 이름을 저장
    }
  };

  const addDeleteFileName = (fileName : string)=>{
    setDocumentFiles((prev) => prev.filter((file) => file.name !== fileName));
    setDocumentFileNames((prev) => prev.filter((name) => name !== fileName));
    setDeleteFileNames((prev)=>[...prev, fileName])
  }

  return (
    <div className="w-full flex justify-center">
    <div style={{ width: "60%" }} className="mt-4">      
<form>
    <div className="flex">
      <div>
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <select className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"value={category} onChange={(e) => setCategory(e.target.value)}>All categories
          {categoryList[language].map((item) => (
          <option className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
            </select>
        </div>
        <div className="relative w-full">
            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Title" required onChange={(e) => setTitle(e.target.value)} value={title}/>
            <button type="submit" className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
  </svg></button>
        </div>
    </div>
</form>

      <input
        type="file"
        accept=".*"
        multiple
        onChange={handleDocumentFileChange}
      />
      <ul>
        {documentFileNames && documentFileNames.map((fileName, index) => (
          <div key={index} className={`w-1/3 flex justify-between items-center ${deleteFileNames.includes(fileName) ? "hidden" : ""}`}>
            <li >{fileName.match(/^\d{8}-\d{6}_/) ? fileName.substring(16) : fileName}</li>
            <img src="/images/X버튼.png" className="size-4 cursor-pointer" onClick={()=>addDeleteFileName(fileName)}/>
          </div>
        ))}
      </ul>

      <Editor
        id="tinymce-editor"
        value={content}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
        onInit={(evt, editor) => {
          console.log(editor.id)
          editorRef.current = editor;
        }}
        init={{
          height: 500,
          plugins: ["lists", "link", "image", "table"],
          content_style: "p {margin:0}",
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
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="imageInput"
      />

      {props.id ? <button className="border" onClick={update}>
        {editorCompo[language]?.update}
      </button> : <button className="border" onClick={submit}>
        {editorCompo[language]?.submit}
      </button>}
    </div>
    </div>
  );
}
'use client'
import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorCompo, postError, postSuccess, categoryList, deleteError, deleteSuccess } from "@/app/menu";
import Cookies from "js-cookie";
import useCustomFormFetch from "@/app/lib/customFormFetch";
import { Language } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";

type EditorProps = {
  id? : string
  categoryName? : string
};

export default function EditorComponent( props : EditorProps) {
  const editorRef = useRef<any>(null); // tinymce를 직접 조작하는
  const [content, setContent] = useState<string>(""); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [imagePath, setImagePath] = useState<Array<string>>([]);
  const [documentFiles, setDocumentFiles] = useState<Array<File>>([]); // 파일 저장을 위한 상태
  const [documentFileNames, setDocumentFileNames] = useState<Array<string>>([]); // 파일 이름 리스트
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
      } catch (error) {
        console.error(error);
      }
    };
    oldPost();
  }, [props.id]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const submit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("language", language);
    formData.append("imagePath", JSON.stringify(imagePath));

    // 첨부파일이 있다면, FormData에 추가
    documentFiles.forEach((file) => {
      formData.append("file", file); // 문서 파일도 함께 전송
    });

    try {
      const response = await customFormFetch(
        props.id ? `/posts/${props.id}` : "/posts",
        { method: props.id ? "PATCH" : "POST", body: formData }
      );
      alert(postSuccess[language]?.contentPost);
    } catch (error) {
      alert(postError[language]?.subError);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const data = await customFormFetch("/attachments", {
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

  const onFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 선택창을 열기
    }
  };

  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDocumentFiles(filesArray);
      setDocumentFileNames((prev) => [...prev, ...filesArray.map((file) => file.name)]); // 파일 이름을 저장
      console.log(documentFiles)
    }
  };

  const onDelete = async (id: string | undefined) => {
    try {
      const data = await customFetch(`/posts/${id}`, { method: "DELETE" });
      alert(deleteSuccess[language]?.contentDelete);
    } catch (error) {
      alert(deleteError[language]?.delete);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ width: "60%" }}>
      <input className="w-40 border-2" onChange={(e) => setTitle(e.target.value)} value={title} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categoryList[language].map((item) => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
      <Editor
        value={content}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          height: 500,
          plugins: ["lists", "link", "image", "table"],
          content_style: "p {margin:0}",
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | table | fileUpload",
          file_picker_types: "image", // 파일 선택기에서 다룰 파일 형식
          setup(editor) {
            editor.ui.registry.addButton("fileUpload", {
              text: "파일 업로드",
              onAction: onFileUploadClick,
            });
          },
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
      {/* 문서 파일 선택 */}
      <input
        type="file"
        accept=".*"
        multiple
        onChange={handleDocumentFileChange}
      />
      {/* 선택된 문서 파일들 표시 */}
      <ul>
        {documentFileNames.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </ul>
      <button className="border" onClick={submit}>
        {editorCompo[language]?.submit}
      </button>
      <button className="border" onClick={() => onDelete(props.id)}>
        {editorCompo[language]?.delete}
      </button>
    </div>
  );
}
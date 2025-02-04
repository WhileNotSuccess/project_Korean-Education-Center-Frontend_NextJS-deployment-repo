"use client";
import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorCompo, postError, postSuccess, categoryList, deleteError, deleteSuccess } from "@/app/menu";
import Cookies from "js-cookie";
import useCustomFormFetch from "@/app/lib/customFormFetch";
import { Language } from "@/app/common/types";
import useCustomFetch from "@/app/lib/customFetch";

type EditorProps = {
  id? : string
};

export default function EditorComponent( {id} : EditorProps) {
  const editorRef = useRef<any>(null); // tinymce를 직접 조작하는
  const [content, setContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [imagePath, setImagePath] = useState<Array<string>>([]);
  const customFormFetch = useCustomFormFetch();
  const customFetch = useCustomFetch()
  const language: Language = (Cookies.get("language") as Language) || "korean";
  const [category, setCategory] = useState<string>(categoryList[language]?.[0]?.key)

  useEffect(() => {
    const oldPost = async ()=>{
      console.log(id)
      if (!id)return
      try{
        const data = await customFetch(`/posts?id=${id}`,{
            method : "GET"
          })
          setContent(data.data.content)
          console.log(content)
          setTitle(data.data.title)
          console.log(title)
      }catch(error){

      }
    }
    oldPost()
  }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const submit = async () => {
    console.log(category)
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("category", category);
    formdata.append("language", language);
    formdata.append("imagePath", JSON.stringify(imagePath));
    try {
      const response = await customFormFetch(
        id ? `/posts/${id}` : "/posts",
        {
          method: id ? "PATCH" : "POST",
          body: formdata,
        }
      );
      alert(postSuccess[language]?.contentPost)
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

  if (!isClient) {
    return null;
  }

  const onChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onDelete = async (id : string | undefined)=>{
    try{
      const data = await customFetch(`/posts/${id}`, {
        method : "DELETE"
      })
      alert(deleteSuccess[language]?.contentDelete)
    }catch(error){
      alert(deleteError[language]?.delete)
    }
  }

  return (
    <div style={{ width: "60%" }}>
      <input className="w-40 border-2" onChange={onChange} value={title}></input>
      <select
      value={category}
        onChange={(e)=>{setCategory(e.target.value)
          console.log(category)
        }}
      >
        {categoryList[language].map((item)=>{
          return(
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
          )
        })}
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
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | table",
          file_picker_types: "image", // 파일 선택기에서 다룰 파일 형식
          file_picker_callback: (cb, value, meta) => {
            const input = fileInputRef.current;
            input?.addEventListener("change", async (e) => {
              const target = e.target as HTMLInputElement;
              const file = target.files ? target.files[0] : null;
              if (file) {
                const url = await handleFileSelect(file);
                if (url) {
                  setImagePath((prev) => [...prev, url]);
                  cb(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
                    title: file.name,
                  });
                }
              }
            });
            input?.click();
          },
        }}
        onEditorChange={(item) => {
          setContent(item);
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="imageInput"
      />
      <button className="border" onClick={submit}>{editorCompo[language]?.submit}</button>
      <button className="border" onClick={()=>onDelete(id)}>{editorCompo[language]?.delete}</button>
    </div>
  );
}
"use client";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  editorCompo,
  postError,
} from "@/app/menu";
import TranslationModal from "./TranslationModal";
import useCustomFormFetch from "@/app/lib/customFormFetch";
import TranslationUpdateModal from "./TranslationUpdateModal";
import LoadingModal from "./LoadingModal";

export default function TranslationEditorComponent() {
  const editorRef = useRef<any>(null); // tinymce를 직접 조작하는
  const [content, setContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const customFormFetch = useCustomFormFetch();
  const [result, setResult] = useState({
    en:"",
    ja:"",
  })
  const [jaUpdate, setJaUpdate] = useState<boolean>(false)
  const [enUpdate, setEnUpdate] = useState<boolean>(false)
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
          alert('이미지 업로드 실패!');
        }
      }
    };


  const submit = async () => {
    if (title === "") {
      alert(editorCompo['korean'].needInputTitle);
    } else if (content === "") {
      alert(editorCompo['korean'].needInputContent);
    } else {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:5000/translate',
          {
            method:'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              title,
              content
            })
          }
        )
        const body = await response.json()
        setResult({
          en:body.translated_html_en,
          ja:body.translated_html_ja
        })
        setIsModalOpen(true)
        setIsLoading(false)
      } catch (error) {
        alert(postError['korean']?.subError);
      }
    }
  };


  return (
    <main className="w-full flex justify-center">
      {isLoading && <LoadingModal/>}
      {(enUpdate || jaUpdate) && (
  <TranslationUpdateModal
    onClose={() => {
      setEnUpdate(false);
      setJaUpdate(false);
      setIsModalOpen(true)
    }}
    content={enUpdate ? result.en : result.ja}
    setContent={enUpdate ? (item:string)=>setResult(prev=>({...prev,en:item})) : (item:string)=>setResult(prev=>({...prev,ja:item}))}
  />
)}
      {result.en.length>0 && isModalOpen && <TranslationModal onClose={()=>{setIsModalOpen(false)}} 
      enUpdate={()=>{
        setEnUpdate(true)
        setIsModalOpen(false)
      }} 
      jaUpdate={()=>{
        setJaUpdate(true)
        setIsModalOpen(false)
      }} 
      htmlEn={result.en} htmlJa={result.ja}/>}
      <section style={{ width: "80%" }} className="mt-4">
        <form>
          <div className="flex">
            <div>
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Title
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
          
        </form>

        
        <section className="mt-1.5">
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
        </section>
       
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
            onClick={submit}
          >
            {editorCompo['korean']?.submit}
          </button>
        
      </section>
    </main>
  );
}

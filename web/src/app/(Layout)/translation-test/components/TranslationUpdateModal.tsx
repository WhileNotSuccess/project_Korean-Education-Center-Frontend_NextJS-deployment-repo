import { createPortal } from "react-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import useCustomFormFetch from "@/app/lib/customFormFetch";

type ModalProps = {
  onClose: () => void;
  content: string;
  setContent: (item:string) => void;
};

export default function TranslationUpdateModal({ onClose, content, setContent }: ModalProps) {
    const editorRef2 = useRef<any>(null); // tinymce를 직접 조작하는
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const customFormFetch = useCustomFormFetch();
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
    return createPortal(
        <dialog open
        tabIndex={-2}
        className="border-2 border-solid fixed w-full h-full inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-2/3 h-3/4 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        <Editor
            tinymceScriptSrc={"/tinymce/tinymce.min.js"}
            id="tinymce-editor2"
            value={content}
            onInit={(evt, editor) => {
                editorRef2.current = editor;
                console.log("TinyMCE 초기화 완료", editor);
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
        </div>
        </div>
        
    </dialog>,
    document.body
    );
}

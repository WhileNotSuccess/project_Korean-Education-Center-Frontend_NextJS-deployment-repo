'use client';
import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useCustomFetch from "@/app/lib/customFormFetch";

export default function EditorComponent() {
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [title, setTitle] = useState<string>("");
  const customFetch = useCustomFetch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("category", "directions");
    formdata.append("language", "korean");

    try {
      const response = await customFetch(`/posts`, {
        method: "POST",
        body: formdata,
      });
    } catch (error) {
      alert("그 요청 안된다");
    }
  };

  const handleFileSelect = async () => {
    const input = fileInputRef.current;
    if (input && input.files) {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.url;
          if (editorRef.current) {
            editorRef.current.insertContent(`<img src="${imageUrl}"/>`);
          }
        } else {
          console.error("업로드에 실패했습니다.");
        }
      }
    }
  };

  if (!isClient) {
    return null;
  }

  const onChange = (e: any) => {
    setTitle(e.target.value);
    console.log(title);
  };

  return (
    <div style={{ width: "60%" }}>
      <input className="w-40 border-2" onChange={onChange}></input>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        init={{
          height: 500,
          menubar: false,
          plugins: ["link", "image"],
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat ",
          setup: (editor) => {
            editorRef.current = editor;
          },
        }}
        onEditorChange={(content) => setContent(content)}
      />
      <button onClick={submit}>Submit</button>
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
    </div>
  );
}

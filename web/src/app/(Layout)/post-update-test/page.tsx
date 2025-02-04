"use client";
import HtmlDocs from "../components/HtmlDocs";
import EditorComponent from "../components/EditorComponent";
import useCustomFetch from "@/app/lib/customFetch";
import { useEffect, useState } from "react";

export default function PostUpdateTest() {
  const customFetch = useCustomFetch();
  const [oldPost, setOldPost] = useState("");

  useEffect(() => {
    async function getOldPost() {
      const response = await customFetch(`/posts?id=1`);
      setOldPost(response.data.content);
    }

    getOldPost();
  }, []);

  return (
    <main>
      {oldPost ? (
        <EditorComponent updateProps={{ id: 1, content: oldPost }} />
      ) : null}
    </main>
  );
}

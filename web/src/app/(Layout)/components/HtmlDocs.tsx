'use client'

import { useEffect, useState } from "react";
import useCustomFetch from "@/app/lib/customFetch";
import {
  guidanceMenu,
  getError,
  editorCompo,
  deleteSuccess,
  deleteError,
  locationMap
} from "../../menu";
import parser from "html-react-parser";
import {
  HtmlDocsProps,
  Language,
  ServerDocumentFile,
} from "@/app/common/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import MapCompo from "./MapCompo";



type HtmlDocsPropsId = {
  id?: string;
  category?: string;
};

export default function HtmlDocs(props: HtmlDocsProps) {
  const [documentFiles, setDocumentFiles] = useState<ServerDocumentFile[]>([]);
  const [allData, setAllData] = useState<{
    content: string;
    title: string;
    documentFiles: ServerDocumentFile[];
    guidanceId: string;
    author: string;
    createdDate: string;
  }>({
    content: "",
    title: "",
    documentFiles: [],
    guidanceId: "",
    author: "",
    createdDate: "",
  });

  const customFetch = useCustomFetch();
  const router = useRouter();
  let endpoint = "";
  const language: Language = (Cookies.get("language") as Language) || "korean";

  useEffect(() => {
    const introData = async () => {
      try {
        {
          props.id
            ? (endpoint = `/posts?id=${props.id}`)
            : (endpoint = `/posts?category=${props.category}`);
        }
        const data = await customFetch(endpoint, {
          method: "GET",
        });
        setAllData({
          content: data.data.content,
          title: data.data.title,
          documentFiles: data.files,
          guidanceId: data.data.id,
          author: data.data.author,
          createdDate: data.data.createdDate,
        });
      } catch (error) {
        alert(getError[language]?.htmlError);
        console.error(getError[language]?.htmlError);
      }
    };
    introData();
  }, []);

  const onUpdate = async (guidanceId?: string) => {
    router.push(`/post-update/${guidanceId}`);
  };

  const onDelete = async (id: string | undefined) => {
    try {
      const data = await customFetch(`/posts/${id}`, { method: "DELETE" });
      alert(deleteSuccess[language]?.contentDelete);
      router.back()
    } catch (error) {
      alert(deleteError[language]?.delete);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="h-12"></div>

      <div className="w-full flex justify-center">
        {props.category ? (
          <div
            className="w-full flex justify-center items-center font-bold text-3xl"
            style={{ height: "200px" }}
          >
            {guidanceMenu[language]?.[props.category]}
          </div>
        ) : (
          <>
            <div className="w-11/12 flex flex-col mt-4">
              
              <div className="flex justify-between items-center border-t-2 border-blue-400 pt-2">
                <div className="text-lg font-bold">{allData.title}</div>
                
              </div>

             
              <div className="text-sm mt-2 border-b-2 pb-2 flex items-center">
                <div className="mr-2">
                  <img src="/images/author.png" className="w-4 h-4"></img>
                </div>
                <div>{allData.author}</div>

                <div className="ml-4 mr-2">
                  <img src="/images/createdDate.png" className="w-4 h-4"></img>
                </div>
                <div>{allData.createdDate.substring(0, 10)}</div>
              </div>

              
              <div className="border-b-2 pb-2 pt-2">
                {allData.documentFiles.length > 0 ? (
                  allData.documentFiles.map((item, index) => {
                    return (
                      <div key={index} className="flex items-center">
                        <img src="/images/attachfile.png" className="w-4 h-4 mr-2"></img>
                        {item.filename.substring(16)}
                      </div>
                    );
                  })
                ) : (
                  <div className="mt-2">첨부파일이 없습니다.</div>
                )}
                
              </div>
              <div className="flex space-x-4 ml-auto mt-2">
                
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => onUpdate(allData.guidanceId)}
                  >
                    {props.category ? editorCompo[language]?.write : editorCompo[language]?.update}
                  </button>

            
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => onDelete(allData.guidanceId)}
                  >
                    {editorCompo[language]?.delete}
                  </button>
                </div>
            </div>
          </>
        )}
      </div>

      {props.category === "directions" ? (
        <>
          <div
            className="w-full mt-4 flex justify-center"
            style={{ height: "400px", overflow: "hidden" }}
          >
            <MapCompo />
          </div>
          <div className="w-full mt-0 flex justify-center">
            <div className="w-[70%] bg-[#5592e7] p-4 mb-10">
              <div className="text-left text-white text-lg font-bold">
                {locationMap[language]["main-campus"]}
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="w-full h-screen flex justify-center">
        <div className="w-3/5">{parser(allData.content)}</div>
      </div>
    </div>
  );
}

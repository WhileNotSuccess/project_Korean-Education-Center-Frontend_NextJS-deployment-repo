'use client';

import { useEffect, useState } from 'react';
import useCustomFetch from '@/app/lib/customFetch';
import {
  guidanceMenu,
  getError,
  editorCompo,
  deleteSuccess,
  deleteError,
  fileError,
  locationMap,
} from '../../menu';
import parser from 'html-react-parser';
import { HtmlDocsProps, Language, ServerDocumentFile } from '@/app/common/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import MapCompo from './MapCompo';

type HtmlDocsPropsId = {
  id?: string;
  category?: string;
};


export default function HtmlDocs(props: HtmlDocsProps) {
  const [allData, setAllData] = useState<{
    content: string;
    title: string;
    documentFiles: ServerDocumentFile[];
    guidanceId: string;
    author: string;
    createdDate: string;
  }>({
    content: '',
    title: '',
    documentFiles: [],
    guidanceId: '',
    author: '',
    createdDate: '',
  });

  const customFetch = useCustomFetch();
  const router = useRouter();
  const language: Language = (Cookies.get('language') as Language) || 'korean';

  useEffect(() => {
    const introData = async () => {
      try {
        const endpoint = props.id
          ? `/posts?id=${props.id}`
          : `/posts?category=${props.category}`;
        const data = await customFetch(endpoint, { method: 'GET' });

        setAllData({
          content: data.data.content,
          title: data.data.title,
          documentFiles: data.files,
          guidanceId: data.data.Id,
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

  const handleFileDownload = async (filename: string) => {
    try {
      const response = await customFetch(`/attachments/${filename}`, { method: 'GET' });

      if (!response) {
        throw new Error(fileError[language]?.Error);
      }
    } catch (error) {
      alert(fileError[language]?.Error);
    }
  };

  const onUpdate = (guidanceId?: string) => {
    router.push(`/post-update/${guidanceId}`);
  };

  const onDelete = async (guidanceId?: string) => {
    try {
      await customFetch(`/posts/${guidanceId}`, { method: 'DELETE' });
      alert(deleteSuccess[language]?.contentDelete);
      router.push('/'); 
    } catch (error) {
      alert(deleteError[language]?.delete);
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="h-12"></div>

      <div className="w-full flex justify-center">
        {props.category ? (
          <div className="w-full flex justify-center items-center font-bold text-3xl" style={{ height: '200px' }}>
            {guidanceMenu[language]?.[props.category]}
          </div>
        ) : (
          <div className="w-11/12 flex flex-col mt-4">
            <div className="flex justify-between items-center border-t-2 border-blue-400 pt-2">
              <div className="text-lg font-bold">{allData.title}</div>
            </div>

            <div className="text-sm mt-2 border-b-2 pb-2 flex items-center">
              <img src="/images/author.png" className="w-4 h-4 mr-2" />
              <div>{allData.author}</div>
              <img src="/images/createdDate.png" className="w-4 h-4 ml-4 mr-2" />
              <div>{allData.createdDate.substring(0, 10)}</div>
            </div>

            <div className="border-b-2 pb-2 pt-2">
              {allData.documentFiles.length > 0 ? (
                allData.documentFiles.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <img src="/images/attachfile.png" className="w-4 h-4 mr-2" />
                    <button
                      onClick={() => handleFileDownload(item.filename)}
                      className="text-blue-600 hover:underline"
                    >
                      {item.filename}
                    </button>
                  </div>
                ))
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
        )}
      </div>

      {props.category === 'directions' && (
        <>
          <div className="w-full mt-4 flex justify-center" style={{ height: '400px', overflow: 'hidden' }}>
            <MapCompo />
          </div>
          <div className="w-full mt-0 flex justify-center">
            <div className="w-[70%] bg-[#5592e7] p-4 mb-10">
              <div className="text-left text-white text-lg font-bold">
                {locationMap[language]['main-campus']}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="w-full h-screen flex justify-center">
        <div className="w-3/5">{parser(allData.content)}</div>
      </div>
    </div>
  );
}

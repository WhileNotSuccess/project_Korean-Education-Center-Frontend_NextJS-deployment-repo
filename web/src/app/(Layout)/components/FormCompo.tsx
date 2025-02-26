'use client';

import { useState } from 'react';
import { counselingForm, counselingPageMenu, FormComponentMenu, serverError } from '@/app/menu';
import Cookies from 'js-cookie';
import { Language } from '@/app/common/types';
import useCustomFetch from '@/app/lib/customFetch';

type CategoryProps = {
  category: string;
};

export default function FormComponent(props: CategoryProps) {
  const language: Language = (Cookies.get('language') as Language) || 'korean';

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    date: '', 
    name: '',
  });

  const customFetch = useCustomFetch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 사용자가 선택한 날짜를 KST 형식으로 받기 때문에, 이를 UTC로 변환합니다.
    const localDate = new Date(formData.date); 
    const utcDate = new Date(localDate.getTime());

    // 서버에 보낼 데이터를 객체로 묶음
    const requestData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      schedule: utcDate.toISOString(), // UTC 형식으로 변환된 날짜
    };

    try {
      console.log(requestData);
      const response = await customFetch('/consult', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      if (response.success) {
        alert(FormComponentMenu[language].applicationSuccess);
      } else {
        alert(FormComponentMenu[language].applicationfail);
      }
    } catch (error) {
      console.error(error);
      alert(serverError[language].server);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* 상담 신청 제목 */}
      <div className="w-full flex justify-center items-center font-bold text-3xl mt-12">
        {counselingForm[language]?.[props.category]}
      </div>

      {/* 상담 안내글 */}
      <div className="w-full max-w-lg p-4 bg-blue-100 rounded-md shadow-md border border-blue-300 mt-8 mb-6 text-lg font-semibold text-blue-700 text-center">
        {counselingPageMenu[language]["counseling-guide"]}
      </div>

      {/* 상담 신청 폼 */}
      <div className="w-full p-8 bg-white rounded-lg shadow-lg border-2 border-blue-300 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className=" text-lg font-bold mb-2 text-blue-700">{counselingPageMenu[language]["name"]}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className=" text-lg font-bold mb-2 text-blue-700">{counselingPageMenu[language]["phone"]}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className=" text-lg font-bold mb-2 text-blue-700">{counselingPageMenu[language]["email"]}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className=" text-lg font-bold mb-2 text-blue-700">{counselingPageMenu[language]["date"]}</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-6 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {counselingPageMenu[language]["save"]}
          </button>
        </form>
      </div>
    </div>
  );
}

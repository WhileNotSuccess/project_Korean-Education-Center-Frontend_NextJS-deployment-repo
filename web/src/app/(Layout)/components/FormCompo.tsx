'use client';

import { useState } from 'react';
import { counselingForm } from '@/app/menu';
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

    // 서버에 보낼 데이터를 객체로 묶음
    
    const requestData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      schedule: formData.date,
    };


    try {
      console.log(requestData);
      const response = await customFetch('/consult', {
        method: 'POST',
        body: JSON.stringify(requestData), 
      });

      if (response.success) {
        alert('상담 신청이 완료되었습니다.');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* 상담 신청 텍스트 부분 */}
      <div className="w-full flex justify-center items-center font-bold text-3xl mt-12">
        {counselingForm[language]?.[props.category]}
      </div>

      {/* 폼 영역 */}
      <div className="w-full p-8 bg-white rounded-lg shadow-lg border-2 border-gray-300 mt-8 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium mb-2">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-lg font-medium mb-2">휴대폰 번호</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-2">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-lg font-medium mb-2">상담 일정</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-6 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            저장
          </button>
        </form>
      </div>
    </div>
  );
}

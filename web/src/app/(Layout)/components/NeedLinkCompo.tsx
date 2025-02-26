'use client'

import { NeedLinkCompoMenu } from "@/app/menu";
import { useEffect } from "react";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function NeedLinkCompo() {


  const language: Language = (Cookies.get('language') as Language) || 'korean';

  useEffect(() => {
    alert(
      NeedLinkCompoMenu[language].notConnectGoogle
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-blue-100 to-blue-300 flex flex-col items-center py-12 space-y-12 overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-white mb-6">{NeedLinkCompoMenu[language].connectGoogleGuide}</h1>

      <div className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step1.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">{NeedLinkCompoMenu[language].step1}</p>
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step2.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">{NeedLinkCompoMenu[language].step2}</p>
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step3.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">{NeedLinkCompoMenu[language].step3}</p>
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step4.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">{NeedLinkCompoMenu[language].step4}</p>
      </div>
    </div>
  );
}

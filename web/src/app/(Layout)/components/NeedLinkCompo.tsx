'use client'

import { useEffect } from "react";

export default function NeedLinkCompo() {

  useEffect(() => {
    alert(
      "해당 이메일로 가입되어있는 계정이 있지만, 구글 연동은 되어있지 않습니다.\n기존 계정으로 로그인 후, 마이페이지에서 구글 연동을 진행해주세요"
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-blue-100 to-blue-300 flex flex-col items-center py-12 space-y-12 overflow-y-auto">
      <header>
      <h1 className="text-3xl font-extrabold text-white mb-6">구글 연동 절차 안내</h1>
      </header>

      <section className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step1.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">기존 계정으로 로그인한 후 이름을 클릭해 마이페이지로 이동합니다.</p>
      </section>

      <section className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step2.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">마이페이지에서 '구글 연동' 옵션을 찾아 연동을 진행합니다.</p>
      </section>

      <section className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step3.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">구글 로그인창으로 이동해 로그인합니다.</p>
      </section>

      <section className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl space-y-6">
        <div className="w-full h-72 bg-white mb-6 flex justify-center items-center rounded-lg overflow-hidden">
          <img src="/images/step4.png" className="object-contain w-full h-full" />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">홈페이지로 돌아왔다면 구글 연동이 완료됩니다.</p>
      </section>
    </div>
  );
}

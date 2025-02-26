"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TermsAgreementMenu } from "@/app/menu";
import { Language } from "@/app/common/types";
import Cookies from "js-cookie";

export default function TermsAgreement() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const allChecked = agreements.terms && agreements.privacy;

  const handleSubmit = () => {
    if (!allChecked) return;
    router.push("/register");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-center bg-cover"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        height: "100vh",
      }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md z-20">
        <h1 className="text-2xl font-bold mb-4">{TermsAgreementMenu[language].MainTermOfUse}</h1>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="terms"
              checked={agreements.terms}
              onChange={handleChange}
            />
            <p>{TermsAgreementMenu[language].TermOfUse}</p>
          </label>
          <div className="border p-2 h-32 overflow-y-scroll text-sm">
            <p className="whitespace-pre-line">
              {TermsAgreementMenu[language].TermOfUseContent}
            </p>
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="privacy"
              checked={agreements.privacy}
              onChange={handleChange}
            />
            <div>{TermsAgreementMenu[language].informationConsent}</div>
          </label>
          <div className="border p-2 h-32 overflow-y-scroll text-sm">
            <p className="whitespace-pre-line">
              {TermsAgreementMenu[language].informationConsentContext}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allChecked}
          className={`w-full mt-4 py-2 rounded-md text-white ${
            allChecked ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {TermsAgreementMenu[language].next}
        </button>
      </div>
    </div>
  );
}

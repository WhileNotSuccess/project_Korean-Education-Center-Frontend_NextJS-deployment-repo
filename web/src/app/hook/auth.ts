"use client";
import { default as useSWR } from "swr";
import useCustomFetch from "../lib/customFetch";
import { LoginBody } from "../common/types";
import { useRouter } from "next/navigation";
import { AuthMenu, serverError } from "../menu";
import { Language } from "../common/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(
    "/users/info",
    async (endpoint) => {
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(AuthMenu[language].LoadError);
      }

      return response.json();
    },
    {
      refreshInterval: 60000 * 30,
    }
  );
  const customFetch = useCustomFetch();
  const router = useRouter();
  const [language, setLanguage] = useState<Language>(Language.korean);

  useEffect(() => {
    const savedLanguage = Cookies.get("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  const login = async (
    payload: LoginBody,
    setError: (error: string) => void
  ) => {
    try {
      const data = await customFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (data.error) {
        setError(data.message);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(serverError[language].server);
    }
  };

  return {
    user,
    error,
    isLoading,
    login,
  };
};

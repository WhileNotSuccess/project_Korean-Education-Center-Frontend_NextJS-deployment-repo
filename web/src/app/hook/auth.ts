"use client";
import { default as useSWR } from "swr";
import useCustomFetch from "../lib/customFetch";
import { LoginBody } from "../common/types";
import { useRouter } from "next/navigation";

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
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }

      return response.json();
    },
    {
      refreshInterval: 60000 * 5,
    }
  );
  const customFetch = useCustomFetch();
  const router = useRouter();
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
      setError("서버 오류가 발생했습니다.");
    }
  };

  return {
    user,
    error,
    isLoading,
    login,
  };
};

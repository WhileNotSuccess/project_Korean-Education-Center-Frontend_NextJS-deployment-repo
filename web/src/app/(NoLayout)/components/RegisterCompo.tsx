"use client";

import { useState, useEffect } from "react";
import useCustomFetch from "../../lib/customFetch";
import Cookies from "js-cookie"; // js-cookie import
import { useRouter } from "next/navigation";

export default function RegisterCompo() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const customFetch = useCustomFetch();

  const newUser = Cookies.get("new_user") === "true"; // 쿠키값이 "true"일 경우 newUser가 true가 됩니다.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // new_user 쿠키가 true일 경우에는 PATCH 요청을 사용해 이름만 업데이트
    if (newUser) {
      try {
        const data = await customFetch("/users/name", {
          method: "PATCH",
          body: JSON.stringify({ name }),
        });

        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
          router.push("/");
        }
      } catch (err) {
        setError("서버 오류가 발생했습니다.");
      }
    } else {
      // 일반 회원가입 로직 (new_user 쿠키가 없을 경우)
      const payload = { email, password, name };

      try {
        const data = await customFetch("/auth/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        setError("서버 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    console.log("New User:", newUser);
  }, [newUser]);

  return (
    <div>
      <h1>{newUser ? "구글 로그인" : "회원가입"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}

      {/* 구글 로그인일 경우 이름만 받는 폼 */}
      {newUser ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">이름 변경</button>
        </form>
      ) : (
        // 일반 회원가입 폼
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">회원가입</button>
        </form>
      )}
    </div>
  );
}

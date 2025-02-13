'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import useCustomFetch from "../../lib/customFetch"; 

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const customFetch = useCustomFetch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const data = await customFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (data.error) {
        setError(data.error);
      } else {
        router.push("/"); 
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/background.jpg')`, height: '100vh' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-transparent  rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-600">LOGIN</h1>
        <p className="text-xl mb-6 text-white">영진전문대 한국어교육센터 방문을 환영합니다.</p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="w-full flex justify-between space-x-4">
            <div className="w-96 flex  flex-col justify-center space-y-2">
          <input
            type="email"
            placeholder="Login ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-blue-500 rounded-lg text-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          </div>
          <div className="w-24 h-24 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer flex justify-center items-center" onClick={handleSubmit}>로그인</div>

{/*           <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold">로그인</button>
 */}          </div>
          
        </form>
        <div className="mt-4">
        <button type="button" onClick={handleGoogleLogin} className="w-full bg-[#F2F2F2] rounded-lg font-semibold mt-2 flex justify-center"><img src="/images/logintab.png" alt="" className=""/></button>
        <button type="button" onClick={() => router.push("/register")} className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold mt-2">회원가입</button>
        </div>
      </div>
    </div>
  );
}

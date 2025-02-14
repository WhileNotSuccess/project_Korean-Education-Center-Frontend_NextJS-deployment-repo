"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-screen">
      <a href="https://api.localhost.com/auth/google/link">구글 연동</a>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import DashboardCompo from "../components/DashboardCompo";


export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full">
      <DashboardCompo/>      
    </div>
  );
}

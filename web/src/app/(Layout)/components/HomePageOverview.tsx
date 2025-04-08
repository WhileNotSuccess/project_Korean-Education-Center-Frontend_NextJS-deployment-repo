"use client";

import useCustomFetch from "@/app/lib/customFetch";
import parser from "html-react-parser";
import { useEffect, useState } from "react";
export default function FormComponent() {
  const [overview, setOverview] = useState("");
  const fetch = useCustomFetch();
  const getData = async () => {
    const response = await fetch("/posts/main/overview");
    setOverview(response.content);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div className="w-2/3">{parser(overview)}</div>;
}

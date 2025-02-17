"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const SchoolMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 구글 맵 API 스크립트 로드
    const loadGoogleMapScript = () => {
      if (typeof window !== "undefined" && !window.google && !document.getElementById("google-maps-script")) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
        script.async = true;
        script.defer = true;
        script.id = "google-maps-script";
        document.body.appendChild(script);

        // 스크립트가 로드되면 isLoaded를 true로 설정
        script.onload = () => {
          setIsLoaded(true);
        };
      } else {
        // 이미 로드된 경우 바로 설정
        setIsLoaded(true);
      }
    };

    loadGoogleMapScript();
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && window.google && window.google.maps) {
      // 구글 맵 초기화
      const map = new window.google.maps.Map(mapRef.current as HTMLDivElement, {
        center: { lat: 35.89563, lng: 128.62243 },
        zoom: 15,
      });

      // 주소 영진전문대학교 본교 
      const location = { lat: 35.89563, lng: 128.62243 };

      // SVG 마커 아이콘 설정
      const svgIcon = {
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="8" stroke="black" stroke-width="2" fill="red" /></svg>',
        scaledSize: new window.google.maps.Size(20, 20),
      };

      new window.google.maps.Marker({
        position: location,
        map: map,
        icon: svgIcon,
      });
    }
  }, [isLoaded]);

  return (
    <div
      ref={mapRef}
      style={{ width: "70%", height: "160%" }} 
    />
  );
};

export default SchoolMap;

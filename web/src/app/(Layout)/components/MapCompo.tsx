import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapCompo() {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    // Kakao API 스크립트 추가
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            35.89624247445099,
            128.62269497391293
          ), // 기본 중심 좌표 설정
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);

        // 마커 위치 설정
        const markerPosition = new window.kakao.maps.LatLng(
          35.89624247445099,
          128.62269497391293
        ); // 마커 위치
        const markerInstance = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커를 지도에 추가
        markerInstance.setMap(mapInstance);

        setMap(mapInstance);
        setMarker(markerInstance);
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트가 언마운트될 때 스크립트 제거
    };
  }, []);

  return <section id="map" style={{ width: "70%", height: "160%" }}></section>;
}

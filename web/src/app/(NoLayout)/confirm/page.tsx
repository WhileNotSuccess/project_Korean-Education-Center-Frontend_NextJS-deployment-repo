import { useEffect, useState } from "react";
import Router from "next/router";
import useCustomFetch from "../../lib/customFetch"; // 커스텀 fetch 훅 임포트

export default function Confirm() {
  const [error, setError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  
  // 커스텀 fetch 훅 호출
  const customFetch = useCustomFetch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");

    if (!email) {
      setError("이메일이 유효하지 않습니다.");
      return;
    }

    const confirmEmail = async () => {
      try {
        // customFetch를 사용하여 이메일 확인 요청을 보냄
        const data = await customFetch(`/api/auth/confirm?email=${email}`);

        if (data.error) {
          setError(data.error); // 오류 처리
        } else {
          setIsConfirmed(true); // 확인 성공 시 상태 변경
        }
      } catch (err) {
        setError("서버 오류가 발생했습니다.");
      }
    };

    confirmEmail();
  }, []); // 페이지 로드 시 한 번 실행

  // 확인 완료 시 메인 페이지로 리디렉션
  if (isConfirmed) {
    Router.push("/"); // 메인 페이지로 이동
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>{isConfirmed ? "가입이 완료되었습니다." : "가입을 확인하는 중입니다..."}</p>
    </div>
  );
}

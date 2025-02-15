const useCustomFetch = () => {
  const customFetch = async (endpoint: string, options = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const defaultOptions: RequestInit = {
      headers: {
        // 헤더를 application/json 뿐 아니라 form-data로 보내는 경우에는 어떻게 할것인지 생각, 폼데이터전용 함수를 만들어야 하나
        "Content-Type": "application/json",
      },
      credentials: "include", // 이 옵션을 키면 cors에러가 발생해서 잠시 주석처리
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const response = await fetch(`${baseURL}${endpoint}`, mergedOptions);

    return response.json(); // 이 함수에서 응답을 json형태로 변환해주기 때문에 다른곳에서 다시 json형태로 변환 안해줘도 됨
    // response.json()함수를 다른곳에서 쓰면 not a function에러가 뜸
  };

  return customFetch;
};

export default useCustomFetch;

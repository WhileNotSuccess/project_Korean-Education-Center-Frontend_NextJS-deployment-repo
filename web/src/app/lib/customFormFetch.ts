const useCustomFormFetch = () => {
  const customFormFetch = async (endpoint: string, options = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const defaultOptions: RequestInit = {
      headers: {
        // "Content-Type": "multipart/form-data", 이 설정을 키면 에러가 발생함 원래 기본적으로 body에 form-data가 들어가면
        // 알아서 관련 옵션이 설정되지만 직접 헤더를 입력하면, 관련 옵션이 다 날라가고, 내가 입력한 multipart/form-data만 남음
        // 어차피 body가 form-data면 알아서 설정되니까 그냥 지워도 무방
      },
      credentials: "include", // 이 옵션을 키면 cors에러가 발생해서 잠시 주석처리
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const response = await fetch(`${baseURL}${endpoint}`, mergedOptions);

    return response; // 이 함수에서 응답을 json형태로 변환해주기 때문에 다른곳에서 다시 json형태로 변환 안해줘도 됨
    // response.json()함수를 다른곳에서 쓰면 not a function에러가 뜸
  };

  return customFormFetch;
};

export default useCustomFormFetch;

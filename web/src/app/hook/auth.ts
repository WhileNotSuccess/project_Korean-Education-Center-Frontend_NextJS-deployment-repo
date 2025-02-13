import useSWR from 'swr';
import cookie from 'js-cookie';

export const useAuth = () => {

      
    const { data: user, error, mutate, isLoading } = useSWR(
        '/user/info',  // 키 (baseURL은 환경변수에서 자동으로 붙음)
        async (endpoint) => {
            const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
            const response = await fetch(`${baseURL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('데이터를 불러오는데 실패했습니다.');
            }

            return response.json(); // 응답을 JSON으로 변환해서 반환
        },
        {
            refreshInterval: 60000 * 5 // 5분마다 요청
        }
    );

    const logout = async () => {
        cookie.remove('auth_token');
        window.location.href = '/';
    };

    return {
        user,
        error,
        logout,
        isLoading,
    };
};

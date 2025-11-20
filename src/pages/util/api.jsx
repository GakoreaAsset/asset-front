import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_API_URL, // URL주소
  // baseURL: import.meta.env.VITE_REAL_API_URL, // URL주소
  withCredentials: true,                   // 쿠키 포함 전송
});

// Axios 인터셉터
api.interceptors.response.use(
  res => res,
  async error => {
    const { config, response } = error;
    const url = config.url ?? '';
    const status = response?.status;
    const isRetry = config._retry === true;

    /* 1) 루프 방지용 화이트리스트 */
    const isLogin   = url.startsWith('/user/login');
    const isRefresh = url.startsWith('/user/refresh');

    /* 2) 로그인 요청은 재시도 X */
    if (isLogin) return Promise.reject(error);

    /* 3) refresh 요청 자체가 실패했으면 재시도 X */
    if (isRefresh) return Promise.reject(error);

    /* 4) 401 : accessToken 만료 → refresh 시도 (1회만) */
    if (status === 401 && !isRetry) {
      try {
        config._retry = true;
        await api.post('/user/refresh');        // 쿠키 기반 재발급
        return api(config);                     // 원요청 재시도
      } catch (refreshErr) {
        console.error('리프레시 실패', refreshErr);
        window.location.href = '/';             // 다시 로그인
      }
    }

    /* 5) 403 : 권한 부족 → 토큰 만료인지 권한 인지 확인  */
    if (status === 403 && !isRetry) {
      alert('권한이 없습니다.');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default api;

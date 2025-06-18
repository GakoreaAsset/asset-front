import axios from 'axios';
import { Navigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // URL주소
  withCredentials: true,                   // 쿠키 포함 전송
});

// Axios 인터셉터 (401 → 자동 리프레시 시도)
// 현재 무한루프를 해결해야함
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. refresh 요청 자체는 무한루프 방지 위해 예외 처리
    if (originalRequest.url === '/user/refresh') {
      console.log('무한루프방지 도달');
      return Promise.reject(error); // 무한루프 방지
    }

    // 2. 401 오류 발생 시 리프레시 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('리프레쉬 시도');
      originalRequest._retry = true;

      try {
        await api.post('/user/refresh');  // 서버가 쿠키 기반으로 자동 리프레쉬
        return api(originalRequest);      // 원래 요청 재시도
      } catch (refreshError) {
        console.error('리프레시 토큰 재요청 실패:', refreshError);  // 리프레쉬 토큰이 없거나 만료된 상황
        window.location.href = '/';
      }
    }

    // 3. 403 오류 발생 시 권한 부족인지 토큰이 없는 상태인지 확인하기
    if (error.response?.status === 403 && !originalRequest._retry) {
      try {
        await api.get('/user/check');  // 서버에서 인증 여부 확인
        return api(originalRequest);
        // 이방식에서 토큰만 이해하고 권한이 있는지 없는지 확인해서 나누는 if 문이 필요하다
        // console.log('토큰은 있으나 권한이 없는 상태');
        // window.location.href = '/';
      } catch {
        console.log('토큰이 없는상태');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

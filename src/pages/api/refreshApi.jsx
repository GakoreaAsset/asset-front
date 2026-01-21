import axios from 'axios';

/*
  refresh 전용 axios
  - interceptor를 태우지 않음
  - 자기 자신을 다시 호출하는 사고 방지
 */
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_REAL_API_URL,
  withCredentials: true,
});

export default refreshApi;
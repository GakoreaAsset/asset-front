import api from './api';
import refreshApi from './refreshApi';

/*
  refresh 진행 여부 플래그
  - 동시에 refresh 여러 번 호출되는 것을 막기 위함
 */
let isRefreshing = false;

/*
  refresh 완료를 기다리는 요청들의 큐
  - refresh 성공 시 한 번에 재시도
 */
let refreshSubscribers = [];

/*
  refresh 성공 후 대기 중이던 요청 실행
 */
function onRefreshed() {
  refreshSubscribers.forEach(callback => callback());
  refreshSubscribers = [];
}

/*
  refresh가 끝날 때까지 요청을 대기열에 추가
 */
function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

export function setupApiInterceptor() {
  api.interceptors.response.use(
    response => response,

    async error => {
      const { config, response } = error;

      // 네트워크 에러 등 response 자체가 없는 경우
      if (!response) {
        return Promise.reject(error);
      }

      const status = response.status;
      const url = config.url || '';
      const isRetry = config._retry === true;

      // 인증 관련 API는 interceptor 관여 X
      const isLogin   = url.startsWith('/user/login');
      const isRefresh = url.startsWith('/user/refresh');

      // 로그인 / refresh 요청은 interceptor에서 관여하지 않음
      if (isLogin || isRefresh) {
        return Promise.reject(error);
      }

      /*
        =========================
        401 : AccessToken 만료
        =========================
      */
      if (status === 401 && !isRetry) {
        console.log('401에러에 진입');
        config._retry = true;

        // 이미 refresh가 진행 중이면 → 끝날 때까지 대기
        if (isRefreshing) {
          return new Promise(resolve => {
            addRefreshSubscriber(() => {
              resolve(api(config));
            });
          });
        }

        // refresh 최초 진입
        isRefreshing = true;

        try {
          // refresh 전용 axios 사용
          await refreshApi.post('/user/refresh');

          isRefreshing = false;

          // 대기 중이던 요청 전부 재실행
          onRefreshed();

          // 현재 요청도 재시도
          return api(config);
        } catch (refreshError) {
          isRefreshing = false;

      /*
        =========================
        404 : 토큰이 없음
        =========================
      */
          console.error('Refresh Token 만료 또는 오류', refreshError);
          // window.location.href = '/';
          window.location.replace = '/';
          return Promise.reject(refreshError);
        }
      }

      /*
        =========================
        403 : 권한 부족
        =========================
      */
      if (status === 403) {
        alert('해당 작업을 수행할 권한이 없습니다.');
      }

      return Promise.reject(error);
    }
  );
}

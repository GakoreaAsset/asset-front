import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await api.get('/user/check');  // 서버에서 인증 여부 확인
      console.log('체크 성공');
      setIsAuth(true);
    } catch {
      console.log('체크 실패');
      setIsAuth(false);
    }
  };

  if (isAuth === null) return <div>로딩중...</div>;

  if (!isAuth) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;

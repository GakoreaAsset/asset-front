// node 22.4 버전과 tailwindcss의 최신버전의 대응하기 위해서는 기본 리액트로는 안되고 Vite로 설치해야 한다.

// 연결 사용 하는 라이브러리
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios';

// 연결된 페이지 및 CSS
import './App.css'
import MainHome from './pages/MainHome.jsx'
import Login from './pages/Login.jsx'


export default function App() {

  // 기본 axios url 설정
  axios.defaults.baseURL = 'http://localhost:8080/api/v1';
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainHome />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

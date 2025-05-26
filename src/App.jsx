// node 22.4 버전과 tailwindcss의 최신버전의 대응하기 위해서는 기본 리액트로는 안되고 Vite로 설치해야 한다.

// 연결 사용 하는 라이브러리
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// 연결된 페이지 및 CSS
import './App.css';
import Login from './pages/Login.jsx';

import MainHome from './pages/MainHome.jsx';
import AssetList from './pages/AssetList.jsx';
import AssetAdd from './pages/AssetAdd.jsx';
import AssetModify from './pages/AssetModify.jsx';


export default function App() {

  // 기본 axios url 설정
  axios.defaults.baseURL = 'http://localhost:8080/api/v1';
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* 메인을 기점으로 메인홈에서 공통된 내용을 보여줄 예정 */}
          <Route path="/main" element={<MainHome />} >
            <Route path="asset" element={<AssetList />} />
            <Route path="asset/add" element={<AssetAdd />} />
            <Route path="asset/modify/:num" element={<AssetModify />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

// node 22.4 버전과 tailwindcss의 최신버전의 대응하기 위해서는 기본 리액트로는 안되고 Vite로 설치해야 한다.

// 연결 사용 하는 라이브러리
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './pages/main/GlobalProvider.jsx';
import axios from 'axios';

// 연결된 페이지 및 CSS
import './App.css';
import './css/pagination.css';
import Login from './pages/login/Login.jsx';
import MainHome from './pages/main/MainHome.jsx';
import AssetAdd from './pages/assetmanage/AssetAdd.jsx';
import AssetModify from './pages/assetmanage/AssetModify.jsx';
import AssetMain from './pages/assetmanage/AssetMain.jsx';


export default function App() {
  // 스프링부트 vscode 실행방법 터미널 -> ./gradlew bootRun
  // 스윗얼럿2 사용방법 https://sweetalert2.github.io/#usage 설치 npm i sweetalert2
  // 기본 axios url 설정
  axios.defaults.baseURL = 'http://localhost:8080/api/v1';
  
  // 변수 선언

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* 메인을 기점으로 메인홈에서 공통된 내용을 보여줄 예정 */}
            <Route path="/main" element={<MainHome />} >
              <Route path="asset" element={<AssetMain />} >
                <Route path="add" element={<AssetAdd />} />
                <Route path="modify/:num" element={<AssetModify />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

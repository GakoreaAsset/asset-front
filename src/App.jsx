// node 22.4 버전과 tailwindcss의 최신버전의 대응하기 위해서는 기본 리액트로는 안되고 Vite로 설치해야 한다.

// 연결 사용 하는 라이브러리
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './pages/util/GlobalProvider.jsx';
import axios from 'axios';

// 연결된 페이지 및 CSS
import './App.css';
import './css/pagination.css';
import Login from './pages/login/Login.jsx';
import MainHome from './pages/main/MainHome.jsx';
import AssetAdd from './pages/assetmanage/AssetAdd.jsx';
import AssetModify from './pages/assetmanage/AssetModify.jsx';
import AssetMain from './pages/assetmanage/AssetMain.jsx';
import PrivateRoute from './pages/util/PrivateRoute.jsx';


export default function App() {
  // 스프링부트 vscode 실행방법 터미널 -> ./gradlew bootRun
  // 스윗얼럿2 사용방법 https://sweetalert2.github.io/#usage 설치 npm i sweetalert2
  // 토큰 저장방법 1)로컬스토리지 2)쿠키 중에 고민중  

  // 변수 선언

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* 메인을 기점으로 메인홈에서 공통된 내용을 보여줄 예정 */}
            {/* PrivateRoute를 통해 토큰이 없으면 해당페이지 주소로 접속불가능 하게 만듬 */}
            <Route path="/main" element={<PrivateRoute> <MainHome /> </PrivateRoute>} >
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

// node 22.4 버전과 tailwindcss의 최신버전의 대응하기 위해서는 기본 리액트로는 안되고 Vite로 설치해야 한다.

// 연결 사용 하는 라이브러리
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './pages/util/GlobalProvider.jsx';
import { setupApiInterceptor } from '@/pages/api/apiInterceptor.jsx';

// 연결된 페이지 및 CSS
import './App.css';
import './css/pagination.css';
import Login from './pages/login/Login.jsx';
import MainHome from './pages/main/MainHome.jsx';
import AssetAdd from './pages/assetmanage/assetsearch/AssetAdd.jsx';
import AssetModify from './pages/assetmanage/assetsearch/AssetModify.jsx';
import AssetMain from './pages/assetmanage/assetsearch/AssetMain.jsx';
import PrivateRoute from './pages/util/PrivateRoute.jsx';
import MealMain from './pages/meal/MealMain.jsx';
import MainGa from './pages/main/MainGa.jsx';
import EmpUse from './pages/meal/EmpUse.jsx';
import AssetHistoryMain from './pages/assetmanage/assethistory/AssetHistoryMain.jsx';
import IpMain from './pages/assetmanage/ipmanage/IpMain.jsx';
import SwMain from './pages/assetmanage/swlicense/swMain.jsx';
import IpModify from './pages/assetmanage/ipmanage/IpModify.jsx';
import SwModify from './pages/assetmanage/swlicense/SwModify.jsx';
import SwAdd from './pages/assetmanage/swlicense/SwAdd.jsx';

setupApiInterceptor();

export default function App() {
  // 스프링부트 vscode 실행방법 터미널 -> ./gradlew bootRun
  // 스윗얼럿2 사용방법 https://sweetalert2.github.io/#usage 설치 npm i sweetalert2
  
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* 메인을 기점으로 메인홈에서 공통된 내용을 보여줄 예정 */}
            {/* PrivateRoute를 통해 토큰이 없으면 해당페이지 주소로 접속불가능 하게 만듬 */}
            <Route path="/main" element={<PrivateRoute> <MainHome /> </PrivateRoute>} >
              <Route index element={<MainGa/>}/>
              <Route path="asset" element={<AssetMain />} >
                <Route path="add" element={<AssetAdd />} />
                <Route path="modify/:num" element={<AssetModify />} />
              </Route>
              <Route path="assethistory" element={<AssetHistoryMain />} >
                
              </Route>
              <Route path="ip" element={<IpMain />} >
                <Route path='modify/:num' element={<IpModify/>}/>
              </Route>
              <Route path="license" element={<SwMain />} >
                <Route path='modify/:num' element={<SwModify/>}/>
                <Route path='add' element={<SwAdd/>}/>
              </Route>
              <Route path="meal" element={<MealMain />} >
                <Route path="empuse" element={<EmpUse />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

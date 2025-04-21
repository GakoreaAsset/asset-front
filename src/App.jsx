// node 22.4 버전과 tailwindcss의 최신버전의 대응하기 위해서는 기본 리액트로는 안되고 Vite로 설치해야 한다.

// 연결 사용 하는 라이브러리
import { BrowserRouter, Route, Routes } from 'react-router-dom'


// 연결된 페이지 및 CSS
import './App.css'
import MainHome from './pages/MainHome.jsx'


export default function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainHome />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

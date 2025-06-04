// 기본 연결
import { Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import TopMenu from "./TopMenu";

// 메인페이지 연결고리
const MainHome = () => {
  // 변수 선언
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 렌더링 부분
  useEffect(function() {
    // 주소입력시 보이지 않도록 하기 (향후 전산 내용만 로그인없이 볼 수 있도록 개발)
  }, [])


  return (
    <>
        {/* 왼쪽 사이드바 및 위쪽 네브 고정 후 오른쪽만 화면이 변경되도록 하는 설계 */}
        <div className="w-screen">
          <div className="h-[94px]">
            <div>
              <TopMenu/>
            </div>
            <div className="w-screen">
              <Outlet/>
            </div>
          </div>
        </div>
    </>
  );
}

export default MainHome;
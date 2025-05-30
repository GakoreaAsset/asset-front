// 기본 연결
import { Outlet, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import logo from '../../assets/img/gakorealogo.png'
import LeftMenu from "./LeftMenu"; // 사이드바 구성
import { GlobalMenu } from "./GlobalMenu";

// 메인페이지 연결고리
const MainHome = () => {
  // 변수 선언
  const { globalMenuval, setGlobalMenuval } = useContext(GlobalMenu);
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
            <div id="main-ci" className="h-[47px]">
              <h1 className="items-center justify-center align-middle px-1 py-3">
                <img src={logo} alt="" className="w-[150px] h-[27.3px] ml-2"/>
              </h1>
            </div>
            <div id="headerTitle" className="flex bg-blue-500 text-white py-3 justify-between items-center shadow">
              <div className="flex items-center gap-2">
                <button className="h-full px-4">
                  <svg className="w-6 h-full" fill="none" stroke="currentColor"viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-lg font-semibold">{globalMenuval}</h1>
              </div>
            </div>
            <div className="flex w-screen pt-2">
              <div className="">
                <LeftMenu/>
              </div>
              <div className="pl-6">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default MainHome;
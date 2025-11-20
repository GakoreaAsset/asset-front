// 기본 연결
import { Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import TopMenu from "./TopMenu";
import TopMenuBak from "../backupPage/TopMenuBak";

// 메인페이지 연결고리
const MainHome = () => {
  // 변수 선언


  // 렌더링 부분
  useEffect(function() {

  }, [])

  return (
    <>
        {/* 위 메뉴바 고정 후 아래 화면이 변경되도록 하는 설계 */}
        <div className="w-screen h-full">
          <div className="h-[94px]">
            <div>
              <TopMenu/>
              {/* <TopMenuBak/> */}
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
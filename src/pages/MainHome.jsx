// 기본 연결
import { Outlet, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import logo from '../assets/gakorealogo.png'
import LeftMenu from "./LeftMenu"; // 사이드바 구성


import LeftMenuOther from "./LeftMenuOther";
import TopMenu from "./TopMenu";





// 메인페이지 연결고리
const MainHome = () => {

  // 로그인 안했을때는 못보게
  useEffect(function() {
      
  }, [])

  return (
    <>
        {/* 왼쪽 사이드바 및 위쪽 네브 고정 후 오른쪽만 화면이 변경되도록 하는 설계 */}
        <div className="w-screen">
          <div className="h-[94px]">
            <div id="main-ci" className="h-[47px]">
              <h1 className="items-center justify-center align-middle">
                <img src={logo} alt="" className="w-[150px] h-[27.3px] ml-2"/>
              </h1>
              
            </div>
            <div id="headerTitle" className="flex h-[47px]">
              <div>
                <button type="button">
                  {/* 햄버거 버튼 추가 */}
                </button>
              </div>
              <div>
                {/* 
                  메뉴를 통해 들어간 상황에 맞춰 글자 표기 예정 (전역변수설정을 통해 해당페이지에 진입시 변수 이름을 변경 시키기)
                 */}
                <h1>전산자산</h1>
              </div>
            </div>
            <div className="flex w-screen pt-2">
              <div className="h-20%">
                <LeftMenu/>
              </div>
              <div className="h-80% pl-6">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default MainHome;
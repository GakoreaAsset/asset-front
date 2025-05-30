// 기본 연결
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";


import LeftMenu from "./LeftMenu"; // 사이드바 구성
import AssetList from "./AssetList";
import AssetAdd from "./AssetAdd";

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
        <div className="w-screen h-full">
          <div className="">
            {/* <TopMenu/> */}
          </div>
          <div className="flex h-full">
            <div className="w-[20%]">
              <LeftMenu/>
              {/* <LeftMenuOther /> */}
            </div>
            <div className="w-[80%] pl-5">
              <Routes>
                <Route path="/" element={<AssetList />} />
                <Route path="/asset/add" element={<AssetAdd />} />
              </Routes>
            </div>
          </div>
          </div>
    </>
  );
}

export default MainHome;
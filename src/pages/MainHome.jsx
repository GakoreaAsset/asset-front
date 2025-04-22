
import { Route, Routes } from "react-router-dom";

import LeftMenu from "./LeftMenu"; // 사이드바 구성
import LeftMenuOther from "./LeftMenuOther";
import AssetList from "./AssetList";
import TopMenu from "./TopMenu";


// 메인페이지 연결고리
const MainHome = () => {


  return (
    <>
        {/* 왼쪽 사이드바 및 위쪽 네브 고정 후 오른쪽만 화면이 변경되도록 하는 설계 */}
        <div className="w-screen">
          <div className="">
            <TopMenu/>
          </div>
          <div className="flex">
            <div className="w-[20%]">
              <LeftMenu/>
              {/* <LeftMenuOther /> */}
            </div>
            <div className="w-[80%] pl-5">
              <Routes>
                <Route path="/" element={<AssetList />} />
              </Routes>
            </div>
          </div>
          </div>
    </>
  );
}

export default MainHome;
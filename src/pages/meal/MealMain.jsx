import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../util/GlobalContext";
import MealLeftMenu from "./MealLeftMenu";
import { Outlet } from "react-router-dom";

const MealMain = () => {
  // 변수 선언
  const { selectedMenu, setSelectedMenu } = useContext(GlobalContext);

  // 렌더링 부분
  useEffect(() => {
    setSelectedMenu('식수관리');
  }, []);

  // Axios 요청부분
  

  // 함수 부분
  

  const closeModal = () => {
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-screen pt-2 max-w-screen">
        {/* 데스크탑: 좌우 분할 */}
        <div className="w-full md:w-[20%] lg:w-[15%]">
          <MealLeftMenu/>
        </div>

        {/* 데스크탑: 우측에 Outlet 표시 */}
        <div className="w-full md:w-[80%] lg:w-[85%] pl-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MealMain
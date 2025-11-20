import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../util/GlobalContext";

const MealLeftMenu = () => {
  // 변수 선언
  const {selectedMenu, setSelectedMenu } = useContext(GlobalContext);

  // CSS 설정
  const topCss = 'text-sm text-gray-700 hover:bg-yellow-100 px-12 py-2';
  const subCss = 'left-0 top-full w-full cursor-pointer opacity-100 transition-all duration-200';
  const menudivCss = 'flex items-center px-6 py-2';



  return (
    <>
      <div className="h-full bg-white rounded shadow-md">
        <div className={menudivCss}>
          <span className="font-semibold">식수관리</span>
        </div>
        <ul className={subCss}>
          <li className={`${topCss} rounded-t`}>
            <Link to="/main/meal/empuse">
              월별사원사용내역
            </Link>
          </li>
          <li className={topCss}>
            <Link to="/main/meal/usesearch">
              식수사용내역검색
            </Link>
          </li>
          <li className={topCss}>
            <Link to="/main/meal/userstate">
              식수사용자현황
            </Link>
          </li>
          <li className={topCss}>
            <Link to="/main/meal/daytotal">
              일별식당누계(영업지원)
            </Link>
          </li>
          <li className={topCss}>
            <Link to="/main/meal/daymealtotal">
              기간별식수누계(영업지원)
            </Link>
          </li>
          <li className={topCss}>
            <Link to="/main/meal/daydepatotal">
              기간별부서누계(영업지원)
            </Link>
          </li>
          <li className={topCss}>
            <Link to="/main/meal/resdaytotal">
              일별식당누계(식당)
            </Link>
          </li>
          <li className={`${topCss} rounded-b`}>
            <Link to="/main/meal/resmonthtotal" >
              월별식당누계(식당)
            </Link>
          </li>
          {/* 
          <li className={`${topCss} rounded-b`}>
            <Link to="/main/meal/limitsetting">
              한도설정조회
            </Link>
          </li>
            */}
        </ul>
      </div>
    </>
  );
}

export default MealLeftMenu;
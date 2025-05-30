import { useState } from "react";
import { Link } from "react-router-dom";

const LeftMenu = () => {
  // 변수 선언
  const [isAssetOpen, setIsAssetOpen] = useState(false);

  // 렌더링 부분

  // 함수 부분
  // 버튼눌렀을때 관련 하위 메뉴 활성화
  const handleAsset = () => {
    setIsAssetOpen(!isAssetOpen);
  };

  return (
    <>
      <aside className="bg-white shadow-lg w-44 h-full p-4 fixed md:relative">
        <ul className="space-y-2">
          
          {/* 식수관리 메뉴 */}
          <li className="hover:bg-gray-200 rounded px-2 py-2 transition">
            <Link to="/main/food" className="flex items-center text-gray-700">
              <span>🥤</span>
              <span className="pl-2">식수관리</span>
            </Link>
          </li>

          {/* 전산관리 메뉴 */}
          <li className="hover:bg-gray-200 rounded px-2 py-2 transition">
            <div className="flex items-center  cursor-pointer">
              <button onClick={handleAsset} className={`transform transition-transform duration-300 ${isAssetOpen ? "rotate-90" : "pr-4"} text-gray-600 `}>▶</button>
              {/* 링크를 지워버리는거에대한 고민이 필요하다  */}
              <Link to="/main/asset" className="text-gray-700 flex-1">
                <span className={`${isAssetOpen ? "pl-4" : ""}`}>전산관리</span>
              </Link>
            </div>
            {/* 하위 메뉴  */}
            <ul className={`pl-1 mt-2 space-y-1 transition-all duration-300 overflow-hidden ${isAssetOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`} >
              <li className="text-gray-600 text-sm hover:text-blue-700 hover:t">
                <Link to="/main/asset">전산자산관리</Link>
              </li>
              <li className="text-gray-600 text-sm hover:text-blue-700">
                <Link to="/main/asset/history">자산이력조회</Link>
              </li>
              <li className="text-gray-600 text-sm hover:text-blue-700">
                <Link to="/main/asset/ip">IP관리</Link>
              </li>
              <li className="text-gray-600 text-sm hover:text-blue-700">
                <Link to="/main/asset/license">S/W라이선스관리</Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default LeftMenu;
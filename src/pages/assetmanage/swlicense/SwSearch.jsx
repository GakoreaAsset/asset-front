import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../util/GlobalContext";

const SwSearch = ({onSearch}) => {
  // 변수 선언
  const { swSearch, setSwSearch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const spanClass = 'font-bold pr-2 w-24 text-center text-sm';
  const inputClass = 'border border-gray-300 rounded w-52 h-6 md:h-8 text-sm';

  // 렌더링 부분

  // Axios 요청부분

  // 함수 부분
  // 검색 옵션 변경
  const handleSearch = (key, value) => {
    setSwSearch((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex justify-center align-middle h-full bg-gray-50 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-5 w-screen pl-3 gap-3 md:gap-0 mt-2 md:mt-0"> 
        <div className="flex items-center max-sm:hidden">
          <span className={spanClass}>자산분류</span>
          <select name="itemdcd" className={inputClass} onChange={(e) => handleSearch('itemdcd', e.target.value)} value={swSearch.itemdcd} >
            <option value="">전체</option>
            <option value="1">운영체제(OS)</option>
            <option value="2">데이터베이스(DBMS)</option>
            <option value="3">사무/문서(OA)</option>
            <option value="4">그래픽/CAD</option>
            <option value="5">백신/보안</option>
            <option value="6">개발툴</option>
            <option value="7">기타</option>
          </select>
        </div>

        <div className="flex items-center max-sm:hidden">
          <span className={spanClass}>라이선스종류</span>
            <select className={inputClass} onChange={(e) => handleSearch('lgubun', e.target.value)} value={swSearch.lgubun} >
              <option value="">전체</option>
              <option value="2">구독형</option>
              <option value="1">패키지/영구</option>
            </select>
        </div>

        <div className="flex items-center max-sm:hidden">
          <span className={spanClass}>회사</span>
          <select className={inputClass} onChange={(e) => handleSearch('acorpcd', e.target.value)} value={swSearch.acorpcd}>
            <option value="">전체</option>
            <option value="01021000">기흥관광개발(주)</option>
            <option value="01031000">뉴경기관광(주)</option>
            <option value="01041000">(주)지에이코리아</option>
            <option value="01071000">(주)강호개발</option>
            <option value="01091000">그린팜</option>
            {/* <option value="주식회사 지엠씨">주식회사 지엠씨</option> */}
            {/* <option value="(주)유성 본점">(주)유성 본점</option> */}
            {/* <option value="와이에스인베스트먼트(주)">와이에스인베스트먼트(주)</option> */}
          </select>
        </div>

        <div className="flex items-center">
          <span className={spanClass}>부서</span>
          <input type="text"className={inputClass} onChange={(e) => handleSearch('apart', e.target.value)} value={swSearch.apart} />
        </div>

      </div>
        <div className="text-center items-center justify-center align-middle py-1">
          <button className="bg-blue-600 hover:bg-blue-700 text-white w-14  px-3 py-1 mr-3 rounded" onClick={onSearch} >검색</button>
        </div>
    </div>
  )
}

export default SwSearch;
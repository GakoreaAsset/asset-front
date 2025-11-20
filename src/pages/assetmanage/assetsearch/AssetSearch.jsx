import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../util/GlobalContext";

const AssetSearch = ({onSearch}) => {
  // 변수 선언
  const { asSearch, setAsSearch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const spanClass = 'font-bold pr-2 w-22 text-center text-sm';
  const inputClass = 'border border-gray-300 rounded w-52 h-6 md:h-8 text-sm';

  // 렌더링 부분

  // Axios 요청부분

  // 함수 부분
  // 검색 옵션 변경
  const handleSearch = (key, value) => {
    setAsSearch((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex justify-center align-middle h-full bg-gray-50 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-5 w-screen pl-3 gap-3 md:gap-0 mt-2 md:mt-0"> 
        <div className="flex items-center max-sm:hidden">
          <span className={spanClass}>자산구분</span>
          <select name="itemdcd" className={inputClass} onChange={(e) => handleSearch('itemdcd', e.target.value)} value={asSearch.itemdcd} >
            <option value="">전체</option>
            <option value="02">PC</option>
            <option value="03">모니터</option>
            <option value="31">노트북</option>
            <option value="30">외장HDD</option>
            <option value="01">서버</option>
            <option value="05">키오스크</option>
            <option value="10">임대</option>
            <option value="04">프린터</option>
            <option value="18">랜카드</option>
            <option value="07">공유기</option>
            <option value="06">네트워크장비</option>
            <option value="32">렉</option>
            <option value="29">기타</option>
          </select>
        </div>

        <div className="flex items-center max-sm:hidden">
          <span className={spanClass}>회사</span>
          <select className={inputClass} onChange={(e) => handleSearch('acorpcd', e.target.value)} value={asSearch.acorpcd}>
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

        <div className="flex items-center max-sm:hidden">
          <span className={spanClass}>설치장소</span>
            <select className={inputClass} onChange={(e) => handleSearch('aplace', e.target.value)} value={asSearch.aplace} >
              <option value="">전체</option>
              <option value="골드CC">골드CC</option>
              <option value="코리아CC">코리아CC</option>
              <option value="퍼블릭CC">퍼블릭CC</option>
              <option value="콘도">콘도</option>
              <option value="3.5층">3.5층</option>
              <option value="전산실">전산실</option>
              <option value="그린팜">그린팜</option>
              <option value="서울">서울</option>
              <option value="강화도">강화도</option>
              <option value="예약실">예약실</option>
            </select>
        </div>

        <div className="flex items-center max-sm:hidden">
          <span className={spanClass}>상태</span>
          <select className={inputClass} onChange={(e) => handleSearch('astate', e.target.value)} value={asSearch.astate} >
            <option value="">전체</option>
            <option value="01">사용중</option>
            <option value="02">보유</option>
            <option value="06">폐기</option>
            <option value="04">분출</option>
            <option value="05">A/S</option>
            <option value="08">분실</option>
            <option value="09">만료</option>
          </select>
        </div>

        <div className="flex items-center">
          <span className="pr-2">
            <select className={spanClass} onChange={(e) => handleSearch('searchtitle', e.target.value)} value={asSearch.searchtitle}  >
              <option value="ano">자산번호</option>
              <option value="auser">사용자</option>
              <option value="anm">자산명</option>
            </select>
          </span>
          <input type="text"className={inputClass} onChange={(e) => handleSearch('searchbody', e.target.value)} value={asSearch.searchbody} />
        </div>

      </div>
        <div className="text-center items-center justify-center align-middle py-1">
          <button className="bg-blue-600 hover:bg-blue-700 text-white w-14  px-3 py-1 mr-3 rounded" onClick={onSearch} >검색</button>
        </div>
    </div>
  )
}

export default AssetSearch;
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../util/GlobalContext";

const IpSearch = ({onSearch}) => {
  // 변수 선언
  const { ipSearch, setIpSearch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const spanClass = 'font-bold pr-2 w-22 text-center text-sm';
  const inputClass = 'border border-gray-300 rounded w-58 h-6 md:h-8 text-sm';

  // 렌더링 부분

  // Axios 요청부분

  // 함수 부분
  // 검색 옵션 변경
  const handleSearch = (key, value) => {
    setIpSearch((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <div className="flex justify-center align-middle h-full bg-gray-50 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 w-screen pl-3 gap-3 md:gap-0 mt-2 md:mt-0"> 
            <div className="flex items-center max-sm:hidden">
              <span className={spanClass}>IP</span>
              <input type="text"className={inputClass} onChange={(e) => handleSearch('ipaddr', e.target.value)} value={ipSearch.ipaddr} />
            </div>

            <div className="flex items-center max-sm:hidden">
              <span className={spanClass}>사용자</span>
              <input type="text"className={inputClass} onChange={(e) => handleSearch('usernm', e.target.value)} value={ipSearch.usernm} />
            </div>

            <div className="flex items-center max-sm:hidden">
              <span className={spanClass}>위치</span>
                <select className={inputClass} onChange={(e) => handleSearch('deptnm', e.target.value)} value={ipSearch.deptnm} >
                  <option value="">전체</option>
                  <option value="3.5층">3.5층 [150.1.2.130 ~]</option>
                  {/* <option value="예약실">예약실 [150.1.2.130 ~]</option> */}
                  <option value="골드CC">골드CC [150.1.3.130 ~]</option>
                  <option value="코리아CC">코리아CC [150.1.4.130 ~]</option>
                  <option value="퍼블릭CC">퍼블릭CC [150.1.5.130 ~]</option>
                  <option value="콘도">콘도 [150.1.6.130 ~]</option>
                  <option value="강화도">강화도 [192.168.20.130 ~]</option>
                  <option value="전산실">전산실 [150.1.1.1 ~]</option>
                </select>
            </div>

            <div className="flex items-center max-sm:hidden">
              <span className={spanClass}>사용유무</span>
              <select className={inputClass} onChange={(e) => handleSearch('ipyn', e.target.value)} value={ipSearch.ipyn} >
                <option value="">전체</option>
                <option value="Y">사용중</option>
                <option value="N">사용가능</option>
              </select>
            </div>
          </div>

          <div className="text-center items-center justify-center align-middle py-1">
            <button className="bg-blue-600 hover:bg-blue-700 text-white w-14  px-3 py-1 mr-3 rounded" onClick={onSearch} >검색</button>
          </div>
        </div>
      </form>

      <div>
        
      </div>
    </>
  );
}
export default IpSearch;
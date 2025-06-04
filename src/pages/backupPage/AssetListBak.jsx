import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { useNavigate, Link } from 'react-router-dom';
import { GlobalMenu } from '../main/GlobalMenu';


const AssetList = () => {
  // 변수 선언
  const { globalMenuval, setGlobalMenuval } = useContext(GlobalMenu);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [aslist, setAslist] = useState();
  const [asdata, setAsdata] = useState();
  const [search, setSearch] = useState({gubun : "", company : "", place : "", state : "", searchdetail : "사용자"});

  // 렌더링 부분
  // 첫화면 등장시 숫자 카운트 및 화면 송출  
  useEffect(() => {
    setGlobalMenuval("전산관리 - 전산자산관리");
    assetNum();
    assetList();
    // console.log(asdata);
  }, []);

  // 페이지 변화에 따라 자산리스트 리렌더링
  useEffect(() => {
    assetList();
  }, [page]);

  // Axios 요청부분
  const assetNum = async () => {
    await axios
      .get("/asset/pagenum", {})
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setAslist(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const assetList  = async () => {
    // alert('요청page'+page);
    await axios
      .post("/asset/page", {
        pageNumber: (page-1)
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setAsdata(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  // 함수 부분
  // 자산페이지 변경 함수
  const handlePageChange = (page) => {
    setPage(page);
    // assetList();
  };

  // 검색 옵션 변경
  const handleSearch = (key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  };

  // 자산 신규 등록화면 이동
  const handleAddbutton = () => {
    navigate('add');
  };

  // 자산상세보기 이동
  const handledetail = (e) => {
    navigate(`modify/${e}`);
  };


  return (
    <>
      <div>
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-50">
              <th colSpan="2" className="p-2 font-bold  text-center">상세자산구분</th>
              <th colSpan="2">
                <select name="itemdcd" className="w-full border border-gray-300 rounded p-1 text-sm" onChange={(e) => handleSearch('gubun', e.target.value)} value={search.gubun}>
                <option value="">전체</option>
                <option value="PC">PC</option>
                <option value="모니터">모니터</option>
                <option value="노트북">노트북</option>
                <option value="외장HDD">외장HDD</option>
                <option value="키오스크">키오스크</option>
                <option value="임대">임대</option>
                <option value="프린터">프린터</option>
                <option value="랜카드">랜카드</option>
                <option value="공유기">공유기</option>
                <option value="네트워크장비">네트워크장비</option>
                <option value="렉">렉</option>
                <option value="기타">기타</option>
              </select>
              </th>
              <th className="font-bold text-center px-2">회사</th>
              <th colSpan="2">
                <input type="text" className="w-full border border-gray-300 rounded p-1 text-sm" />
              </th>
              <th className="font-bold text-center px-2">설치장소</th>
              <th>
                <input type="text" className="w-full border border-gray-300 rounded p-1 text-sm" />
              </th>
              <th className="font-bold text-center px-2">상태</th>
              <th>
                <input type="text" className="w-full border border-gray-300 rounded p-1 text-sm" />
              </th>
              <th rowSpan="2" className="px-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded">
                  검색
                </button>
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th colSpan="5" className="p-2">
                {/* <select name="search" onChange={(e) => handleSearch('searchdetail', e.target.value)} value={search.searchdetail} className="border border-gray-300 p-1 rounded text-sm w-full"> */}
                <select name="search" onChange={(e) => handleSearch('searchdetail', e.target.value)} value={search.searchdetail} className="w-full text-center">
                  <option value="사용자">사용자</option>
                  <option value="자산번호">자산번호</option>
                  <option value="자산명">자산명</option>
                </select>
              </th>
              <th colSpan="6">
                <input type="text" className="w-full border border-gray-300 rounded p-1 text-sm" />
              </th>
            </tr>

            <tr className="bg-gray-100 text-xs text-gray-700 border-t border-b">
              <th className="px-2 py-2 text-center">순번</th>
              <th className="px-2 py-2 text-center">상세자산구분</th>
              <th className="px-2 py-2 text-center">자산번호</th>
              <th className="px-2 py-2 text-center">제품코드</th>
              <th className="px-2 py-2 text-center">자산명칭</th>
              <th className="px-2 py-2 text-center">제조년월</th>
              <th className="px-2 py-2 text-center">회사</th>
              <th className="px-2 py-2 text-center">설치장소</th>
              <th className="px-2 py-2 text-center">부서</th>
              <th className="px-2 py-2 text-center">사용자</th>
              <th className="px-2 py-2 text-center">설치일자</th>
              <th className="px-2 py-2 text-center">상태</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {asdata && asdata.map((data, i) => (
              <tr key={data.ano} className="hover:bg-blue-50 border-b text-center cursor-pointer" onClick={() => handledetail(data.ano)} >
                <td className="px-2 py-2">{i + 1}</td>
                <td className="px-2 py-2">{data.item4nm}</td>
                <td className="px-2 py-2">{data.ano}</td>
                <td className="px-2 py-2">{data.acdid}</td>
                <td className="px-2 py-2">{data.anm}</td>
                <td className="px-2 py-2">{data.iyear}</td>
                <td className="px-2 py-2">{data.conm}</td>
                <td className="px-2 py-2">{data.aplace}</td>
                <td className="px-2 py-2">{data.apart}</td>
                <td className="px-2 py-2">{data.auser}</td>
                <td className="px-2 py-2">{data.myear}</td>
                <td className="px-2 py-2">{data.statenm}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 border-t">
              <td colSpan={2} className="font-medium p-2">
                전체건수: {aslist}
              </td>
              <td colSpan={9} className="text-center items-center justify-center">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={20}
                  totalItemsCount={aslist}
                  pageRangeDisplayed={5}
                  prevPageText={"‹"}
                  nextPageText={"›"}
                  onChange={handlePageChange}
                />
              </td>
              <td className='text-center'>
                <div>
                  <button onClick={handleAddbutton} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded">신규</button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </>
  );
}

export default AssetList;
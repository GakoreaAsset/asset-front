import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { useNavigate, Link } from 'react-router-dom';


const AssetList = () => {
  // 변수 선언
  const [page, setPage] = useState(1);
  const [aslist, setAslist] = useState();
  const [asdata, setAsdata] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("사용자");

  // 첫화면 등장시 숫자 카운트 및 화면 송출  
  useEffect(() => {
    assetNum();
    assetList();
    // console.log(asdata);
  }, []);

  // 페이지 변화에 따라 자산리스트 리렌더링
  useEffect(() => {
    assetList();
  }, [page]);

  // 로그인을 안하고 주소를 입력했을경우 허용하지 않는 함수 (기본 useEffect에 넣어줘야함)


  // 자산페이지 확인
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

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setPage(page);
    // assetList();
  };

  // 신규 등록 화면
  const handleAddbutton = () => {
    navigate('add');
  };

  // 검색 옵션 변경
  const handleSearch = (e) => {
    setSearch(e.value);
    console.log(search);
  };

  // 클릭시 싸이트 변경
  const handledetail = (e) => {
    navigate(`modify/${e}`);
  };
  
  return (

    <>
      {/* <div className=''>
        <h2 className='pb-4'>전산자산관리</h2>
      </div> */}

      <div>
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-50">
              <th colSpan="2" className="p-2 text-sm font-medium text-left">상세 구분</th>
              <th colSpan="2">
                <input type="text" className="w-full border border-gray-300 rounded p-1 text-sm" />
              </th>
              <th className="text-sm font-medium text-center px-2">회사</th>
              <th colSpan="2">
                <input type="text" className="w-full border border-gray-300 rounded p-1 text-sm" />
              </th>
              <th className="text-sm font-medium text-center px-2">설치장소</th>
              <th>
                <input type="text" className="w-full border border-gray-300 rounded p-1 text-sm" />
              </th>
              <th className="text font-medium text-center px-2">상태</th>
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
                <select
                  name="search"
                  onChange={handleSearch}
                  defaultValue="user"
                  className="border border-gray-300 p-1 rounded text-sm w-full"
                >
                  <option value="user">사용자</option>
                  <option value="number">자산번호</option>
                  <option value="pname">자산명</option>
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
              <tr
                key={data.ano}
                className="hover:bg-blue-50 border-b text-center cursor-pointer"
                onClick={() => handledetail(data.ano)}
              >
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
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { useNavigate, Link } from 'react-router-dom';
import {GlobalContext} from '../main/GlobalContext';



const AssetList = ({ aslist, asdata, page, setPage }) => {
  // 변수 선언
  const navigate = useNavigate();

  // 렌더링 부분

  // Axios 요청부분

  // 함수 부분
  // 자산페이지 변경 함수
  const handlePageChange = (page) => {
    setPage(page);
    // assetList();
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
            <tr className="bg-gray-100 text-xs text-gray-700 border-t border-b">
              {/* <th className="px-2 py-2 text-center">순번</th> */}
              {/* <th className="px-2 py-2 text-center">상세자산구분</th> */}
              <th className="px-2 py-2 text-center">자산번호</th>
              {/* <th className="px-2 py-2 text-center">제품코드</th> */}
              <th className="px-2 py-2 text-center">자산명칭</th>
              {/* <th className="px-2 py-2 text-center">제조년월</th> */}
              {/* <th className="px-2 py-2 text-center">회사</th> */}
              <th className="px-2 py-2 text-center">설치장소</th>
              {/* <th className="px-2 py-2 text-center">부서</th> */}
              <th className="px-2 py-2 text-center">사용자</th>
              {/* <th className="px-2 py-2 text-center">설치일자</th> */}
              <th className="px-2 py-2 text-center">상태</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {asdata && asdata.map((data, i) => (
              <tr key={data.ano} className="hover:bg-blue-50 border-b text-center cursor-pointer" onClick={() => handledetail(data.ano)} >
                {/* <td className="px-2 py-2">{i + 1}</td> */}
                {/* <td className="px-2 py-2">{data.item4nm}</td> */}
                <td className="px-2 py-2">{data.ano}</td>
                {/* <td className="px-2 py-2">{data.acdid}</td> */}
                <td className="px-2 py-2">{data.anm}</td>
                {/* <td className="px-2 py-2">{data.iyear}</td> */}
                {/* <td className="px-2 py-2">{data.conm}</td> */}
                <td className="px-2 py-2">{data.aplace}</td>
                {/* <td className="px-2 py-2">{data.apart}</td> */}
                <td className="px-2 py-2">{data.auser}</td>
                {/* <td className="px-2 py-2">{data.myear}</td> */}
                <td className="px-2 py-2">{data.statenm}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 border-t">
              <td colSpan={1} className="font-medium p-2">
                전체건수: {aslist}
              </td>
              <td colSpan={3} className="text-center items-center justify-center">
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
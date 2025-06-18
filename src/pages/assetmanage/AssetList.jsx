import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { useNavigate, Link } from 'react-router-dom';
import {GlobalContext} from '../util/GlobalContext';



const AssetList = ({ aslist, asdata, page, setPage }) => {
  // 변수 선언
  const navigate = useNavigate();

  // css 변수
  const theadClass = 'px-2 py-2 text-center';
  const tbodyClass = 'px-2 py-2';

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
          <thead className='text-sm max-sm:text-[10px]'>
            <tr className="bg-gray-100 text-gray-700 border-t border-b">
              {/* <th className={theadClass}>순번</th> */}
              {/* <th className={theadClass}>상세자산구분</th> */}
              <th className={theadClass}>자산번호</th>
              {/* <th className={theadClass}>제품코드</th> */}
              <th className={theadClass}>자산명칭</th>
              {/* <th className={theadClass}>제조년월</th> */}
              {/* <th className={theadClass}>회사</th> */}
              <th className={theadClass}>설치장소</th>
              {/* <th className={theadClass}>부서</th> */}
              <th className={theadClass}>사용자</th>
              {/* <th className={theadClass}>설치일자</th> */}
              <th className={theadClass}>상태</th>
            </tr>
          </thead>

          <tbody className="text-sm max-sm:text-[10px]">
            {asdata && asdata.map((data, i) => (
              <tr key={data.ano} className="hover:bg-blue-50 border-b text-center cursor-pointer" onClick={() => handledetail(data.ano)} >
                {/* <td className={tbodyClass}>{i + 1}</td> */}
                {/* <td className={tbodyClass}>{data.item4nm}</td> */}
                <td className={tbodyClass}>{data.ano}</td>
                {/* <td className={tbodyClass}>{data.acdid}</td> */}
                <td className={tbodyClass}>{data.anm}</td>
                {/* <td className={tbodyClass}>{data.iyear}</td> */}
                {/* <td className={tbodyClass}>{data.conm}</td> */}
                <td className={tbodyClass}>{data.aplace}</td>
                {/* <td className={tbodyClass}>{data.apart}</td> */}
                <td className={tbodyClass}>{data.auser}</td>
                {/* <td className={tbodyClass}>{data.myear}</td> */}
                <td className={tbodyClass}>{data.statenm}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 border-t">
              <td colSpan={1} className="font-medium p-2 text-sm max-sm:text-[10px]">
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
                  <button onClick={handleAddbutton} className="bg-blue-600 hover:bg-blue-700 text-white text-sm max-sm:text-[10px] px-4 py-1 rounded">신규</button>
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
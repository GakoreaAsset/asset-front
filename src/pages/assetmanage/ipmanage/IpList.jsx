import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";

const IpList = ({ iplist, ipdata, page, setPage, openModal }) => {
  // 변수 선언
  const navigate = useNavigate();

  // css 변수
  const theadClass = 'px-2 py-2 text-center';
  const theadhideClass = 'px-2 py-2 text-center max-sm:hidden';
  const tbodyClass = 'px-2 py-2';
  const tbodyhideClass = 'px-2 py-2 max-sm:hidden';

  // 렌더링 부분

  // Axios 요청부분

  // 함수 부분
  // 자산페이지 변경 함수
  const handlePageChange = (page) => {
    setPage(page);
  };

  // 자산 신규 등록화면 이동
  const handleAddbutton = () => {
    navigate('add');
    openModal();
  };

  // 자산상세보기 이동
  const handledetail = (e) => {
    navigate(`modify/${e}`);
    openModal();
  };



  return (
    <>
      <div>
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead className='text-sm max-sm:text-[10px]'>
            <tr className="bg-gray-100 text-gray-700 border-t border-b">
              <th className={theadClass}>IP</th>
              <th className={theadClass}>위치</th>
              <th className={theadClass}>사용자</th>
              <th className={theadhideClass}>공인/사내IP</th>
              <th className={theadhideClass}>기타</th>
              <th className={theadClass}>사용유무</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {ipdata && ipdata.map((data, i) => (
              <tr key={data.seq} className="hover:bg-blue-50 border-b text-center cursor-pointer" onClick={() => handledetail(data.seq)} >
                <td className={tbodyClass}>{data.ipaddr}</td>
                <td className={tbodyClass}>{data.deptnm}</td>
                <td className={tbodyClass}>{data.usernm}</td>
                <td className={tbodyhideClass}>{data.pubipaddr}</td>
                <td className={tbodyhideClass}>{data.etc}</td>
                <td className={tbodyClass}>{data.ipyn}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 border-t">
              <td className="font-medium p-2 text-sm max-sm:text-[10px]">
                전체건수: {iplist}
              </td>
              <td colSpan={4} className="text-center items-center justify-center lg:col-span-4">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={19}
                  totalItemsCount={iplist}
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
export default IpList;
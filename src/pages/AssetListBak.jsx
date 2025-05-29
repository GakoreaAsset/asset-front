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
      <div className=''>
        <h2 className='pb-4'>전산자산관리</h2>
      </div>

      <div>
        
        <table>
          <thead>
            <tr className='border-2'>
              <th colSpan='2'>상세 구분</th>
              <th colSpan='2'> <input type="text" /> </th>
              <th >회사</th>
              <th colSpan='2'> <input type="text" /> </th>
              <th>설치장소</th>
              <th> <input type="text" /> </th>
              <th>상태</th>
              <th> <input type="text" /> </th>
              <th rowSpan='2'><button>검색</button></th>
            </tr>
            <tr className='border-2'>
              <th colSpan='5'>
                {/* 기본선택은 사용자로 되어있게 */}
                <select name="search" onChange={handleSearch}>
                  <option value="user" selected>사용자</option>
                  <option value="number">자산번호</option>
                  <option value="pname">자산명</option>
                </select>
              </th>
              <th colSpan='6'> <input type="text" /> </th>
            </tr>

            <tr className='border-1 text-center'>
              <th className='min-w-10 '>순번</th>
              <th className='min-w-26 '>상세자산구분</th>
              <th className='min-w-20 '>자산번호</th>
              <th className='min-w-32 '>제품코드</th>
              <th className='min-w-44 '>자산명칭</th>
              <th className='min-w-26 '>제조년월</th>
              <th className='min-w-44 '>회사</th>
              <th className='min-w-26 '>설치장소</th>
              <th className='min-w-26 '>부서</th>
              <th className='min-w-32 '>사용자</th>
              <th className='min-w-26 '>설치일자</th>
              <th className='min-w-26 '>상태</th>
            </tr>
          </thead>
          <tbody>
            { asdata && asdata.map((data, i) => {
            
              return (
              <tr className='text-center' onClick={()=>{handledetail(data.ano)}}>
                <td className='min-w-10 '>{i+1}</td>
                <td className='min-w-26 '>{data.item4nm}</td>
                <td className='min-w-20 '>{data.ano}</td>
                <td className='min-w-32 '>{data.acdid}</td>
                <td className='min-w-44 '>{data.anm}</td>
                <td className='min-w-26 '>{data.iyear}</td>
                <td className='min-w-44 '>{data.conm}</td>
                <td className='min-w-26 '>{data.aplace}</td>
                <td className='min-w-26 '>{data.apart}</td>
                <td className='min-w-32 '>{data.auser}</td>
                <td className='min-w-26 '>{data.myear}</td>
                <td className='min-w-26 '>{data.statenm}</td>
              </tr>
              )
            })
          }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>전체건수:{aslist}</td>
              <td colSpan={10} className='text-center item-center'>
                <Pagination
                  activePage={page}       // 현재 페이지
                  itemsCountPerPage={20}  // 한 페이지랑 보여줄 아이템 갯수
                  totalItemsCount={aslist}// 총 아이템 갯수
                  pageRangeDisplayed={5}  // paginator의 페이지 범위
                  prevPageText={"‹"}      // "이전"을 나타낼 텍스트
                  nextPageText={"›"}      // "다음"을 나타낼 텍스트
                  onChange={handlePageChange}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div>
        <button onClick={handleAddbutton}>신규</button>
      </div>



    </>
  );
}

export default AssetList;
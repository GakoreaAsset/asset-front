import { Outlet, useNavigate } from "react-router-dom";
import AssetList from "./AssetList";
import AssetSearch from "./AssetSearch";
import { GlobalContext } from "../main/GlobalContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// 검색과 목록의 컴포넌트를 개별화 하기위해 상위 컴포넌트의 메인에 필요 변수, 렌더링, 함수를 끌어올려 하위 컴포넌트로 나눠주고 있음
const AssetMain = () => {
  // 변수 선언
  const { selectedMenu, setSelectedMenu, asSearch, setAsSearch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [aslist, setAslist] = useState();
  const [asdata, setAsdata] = useState();

  // 렌더링 부분
  useEffect(() => {
    setSelectedMenu("전산관리 - 전산자산관리");
    assetNum();
    assetList();
    // console.log(asSearch);
    // console.log(aslist);
  }, [page]);

  // Axios 요청부분
  const assetNum = async () => {
    await axios
      .post("/asset/pagenum", {
        itemdcd : asSearch.itemdcd, aplace : asSearch.aplace, astate : asSearch.astate, [asSearch.searchtitle] : asSearch.searchbody
      })
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
        pageNumber : (page-1), itemdcd : asSearch.itemdcd, aplace : asSearch.aplace, astate : asSearch.astate, [asSearch.searchtitle] : asSearch.searchbody
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
  // 검색 옵션 변경
    const handleSearchClick = () => {
    assetNum();
    assetList();
  };

  // 수정 또는 신규 창 닫기
  const closePage = () => {
    console.log('작동');
    navigate('/main/asset');
  }


  return (
    <>
      <div className="">
        <AssetSearch onSearch={handleSearchClick}/>
      </div>
      <div className="flex w-screen pt-2">
        <div className="">
          <AssetList             
            aslist={aslist} 
            asdata={asdata}
            setPage={setPage}
            page={page}/>
        </div>
        <div className="pl-5">
          <Outlet context={{ onClose: closePage }}/>
        </div>
      </div>
    
    </>
  );
}

export default AssetMain;
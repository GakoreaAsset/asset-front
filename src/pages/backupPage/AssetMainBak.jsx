import { Outlet, useNavigate } from "react-router-dom";
import AssetList from "./AssetList";
import AssetSearch from "./AssetSearch";
import { GlobalContext } from "../util/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../api/api";

Modal.setAppElement("#root");

// 검색과 목록의 컴포넌트를 개별화 하기위해 상위 컴포넌트의 메인에 필요 변수, 렌더링, 함수를 끌어올려 하위 컴포넌트로 나눠주고 있음
const AssetMain = () => {
  // 변수 선언
  const { selectedMenu, setSelectedMenu, asSearch, setAsSearch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [aslist, setAslist] = useState();
  const [asdata, setAsdata] = useState();
  const isMobile = useIsMobile();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
    await api
      .post("/asset/pagenum", {
        itemdcd : asSearch.itemdcd, aplace : asSearch.aplace, astate : asSearch.astate, [asSearch.searchtitle] : asSearch.searchbody
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setAslist(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const assetList  = async () => {
    // alert('요청page'+page);
    await api
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

  // 모달 여닫기
  // const handleSearchClick = () => {
  //   if (isMobile) {
  //     setIsDetailOpen(true); // 모바일이면 모달로 오픈
  //   }
  // };

  // const closePage = () => {
  //   setIsDetailOpen(false); // 상세 모달 닫기
  // };


  return (
    <>
      {/* <div className="h-52 lg:h-[40px]"> */}
      <div className="h-9 lg:h-[40px]">
        <AssetSearch onSearch={handleSearchClick}/>
      </div>
      <div className="flex w-screen pt-2">
        <div className="lg:w-[35%] md:w-[45%]">
          <AssetList             
            aslist={aslist} 
            asdata={asdata}
            setPage={setPage}
            page={page}/>
        </div>
        <div className="lg:w-[65%] md:w-[55%] pl-5">
          <Outlet context={{ onClose: closePage }}/>
        </div>
      </div>
    
    </>
  );
}

export default AssetMain;
import { Outlet, useNavigate } from "react-router-dom";
import AssetList from "./AssetList";
import AssetSearch from "./AssetSearch";
import { GlobalContext } from "../../util/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useIsMobile } from "../../util/useIsMobile";

Modal.setAppElement("#root");

// 페이지 진입시 초기화 해주는 방법
const basic_search = {itemdcd : "", acorpcd : "", aplace : "", astate : "01", searchtitle : "ano", searchbody: ""}

// 검색과 목록의 컴포넌트를 개별화 하기위해 상위 컴포넌트의 메인에 필요 변수, 렌더링, 함수를 끌어올려 하위 컴포넌트로 나눠주고 있음
const AssetMain = () => {
  // 변수 선언
  // const { selectedMenu, setSelectedMenu, asSearch, setAsSearch } = useContext(GlobalContext);
  const { selectedMenu, setSelectedMenu} = useContext(GlobalContext);
  const [ asSearch, setAsSearch ] = useState(basic_search);     // 검색바에서 변경될 옵션
  const [ realSearch, setRealSearch ] = useState(basic_search); // 검색시 변경되고 고정될 옵션
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [aslist, setAslist] = useState();
  const [asdata, setAsdata] = useState();
  const isMobile = useIsMobile();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 렌더링 부분 //
  // 검색을 했을때 | 기존검색에서 페이지만 변경할때
  useEffect(() => {
    setSelectedMenu("전산관리 - 전산자산관리");
    assetNum();
    assetList();
    
  }, [realSearch, page]);

  // Axios 요청부분 //
  const assetNum = async () => {
    
    
    await api
      .post("/asset/pagenum", {
        itemdcd : realSearch.itemdcd, aplace : realSearch.aplace, astate : realSearch.astate, [realSearch.searchtitle] : realSearch.searchbody
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setAslist(response.data);
      })
      .catch((err) => {
        // alert(err);
      });
  }

  const assetList  = async () => {
    // alert('요청page'+page);
    await api
      .post("/asset/page", {
        pageNumber : (page-1), itemdcd : realSearch.itemdcd, aplace : realSearch.aplace, astate : realSearch.astate, [realSearch.searchtitle] : realSearch.searchbody
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setAsdata(response.data);
      })
      .catch((err) => {
        // alert(err);
      });
  }

  // 검색
  // const assetSearchList  = async () => {
  // await api
  //   .post("/asset/page", {
  //     pageNumber : '0', itemdcd : asSearch.itemdcd, aplace : asSearch.aplace, astate : asSearch.astate, [asSearch.searchtitle] : asSearch.searchbody
  //   })
  //   .then((response) => {
  //     // console.log(JSON.stringify(response.data));
  //     // console.log(response.data);
  //     setAsdata(response.data);
  //   })
  //   .catch((err) => {
  //     // alert(err);
  //   });
  // }
  
  // 함수 부분 //
  // 검색 옵션 변경
    const handleSearchClick = (e) => {
    e.preventDefault();
    setPage((prev) => ({ ...prev, page: 1 }));
    setRealSearch(asSearch);
    // setPage(1);
    // assetNum();
    // assetSearchList();
  };

  // 수정 또는 신규 창 닫기
  const closePage = () => {
    console.log('작동');
    navigate('/main/asset');
    assetNum();
    assetList();
        if (isMobile) {
      setIsDetailOpen(false);
    }
  }

  const openModal = () => {
    if (isMobile) {
      setIsDetailOpen(true);
    }
  };

  const closeModal = () => {
    setIsDetailOpen(false); // 상세 모달 닫기
  };

  if (!asdata || !aslist) {
    return <div>로딩 중입니다...</div>
  }

  return (
    <>
      {/* 검색바 영역 */}
      <div className="h-9 lg:h-[40px]">
        <AssetSearch onSearch={handleSearchClick} asSearch={asSearch} setAsSearch={setAsSearch} />
      </div>

      {/* 데스크탑: 좌우 분할 / 모바일: 리스트만 */}
      <div className="flex flex-col md:flex-row w-screen pt-2 max-w-screen">
        <div className="w-full md:w-[45%] lg:w-[35%]">
          <AssetList
            aslist={aslist}
            asdata={asdata}
            setPage={setPage}
            page={page}
            openModal={openModal}
          />
        </div>

        {/* 데스크탑: 우측에 Outlet 표시 */}
        {!isMobile && (
          <div className="w-full md:w-[55%] lg:w-[65%] pl-5">
            <Outlet context={{ onClose: closePage }} />
          </div>
        )}
      </div>

      {/* 모바일 전용 상세 모달 */}
      {isMobile && (
        <Modal
          isOpen={isDetailOpen}
          onRequestClose={closeModal}
          overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
          className="fixed top-0 left-0 w-full h-full bg-white p-4 z-50 overflow-y-auto"
        >
          {/* 모달 닫기 버튼 */}
          {/* <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500"
          >
            &times;
          </button> */}

          {/* 상세 내용 표시 (Outlet 사용) */}
          <Outlet context={{ onClose: closePage}} />
        </Modal>
      )}
    </>
  );
}

export default AssetMain;
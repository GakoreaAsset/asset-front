import { Outlet, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../util/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../util/api";
import { useIsMobile } from "../../util/useIsMobile";
import SwSearch from "./SwSearch";
import SwList from "./SwList";

Modal.setAppElement("#root");

// 검색과 목록의 컴포넌트를 개별화 하기위해 상위 컴포넌트의 메인에 필요 변수, 렌더링, 함수를 끌어올려 하위 컴포넌트로 나눠주고 있음
const SwMain = () => {
  // 변수 선언
  const { selectedMenu, setSelectedMenu, swSearch, setSwSearch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [swlist, setSwlist] = useState();
  const [swdata, setSwdata] = useState();
  const isMobile = useIsMobile();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 렌더링 부분
  useEffect(() => {
    setSelectedMenu("S/W라이선스관리");
    swNum();
    swList();
    // console.log(swSearch);
    // console.log(swlist);
  }, [page]);

  // Axios 요청부분
  // pageNumber : (page-1), itemdcd : swSearch.itemdcd, aplace : swSearch.aplace, astate : swSearch.astate, [swSearch.searchtitle] : swSearch.searchbody
  const swNum = async () => {
    await api
      .post("/sw/pagenum", {
        itemdcd : swSearch.itemdcd, apart : swSearch.apart, acorpcd : swSearch.acorpcd, astate : "", lgubun : swSearch.lgubun, swno : "", pageNumber : (page-1)
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setSwlist(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const swList  = async () => {
    // alert('요청page'+page);
    await api
      .post("/sw/page", {
        itemdcd : swSearch.itemdcd, apart : swSearch.apart, acorpcd : swSearch.acorpcd, astate : "", lgubun : swSearch.lgubun, swno : "", pageNumber : (page-1)
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        console.log(response.data);
        setSwdata(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  // 함수 부분
  // 검색 옵션 변경
    const handleSearchClick = () => {
    swNum();
    swList();
  };

  // 수정 또는 신규 창 닫기
  const closePage = () => {
    console.log('작동');
    navigate('/main/license');
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

  return (
    <>
      {/* 검색바 영역 */}
      <div className="h-9 lg:h-[40px]">
        <SwSearch onSearch={handleSearchClick} />
      </div>

      {/* 데스크탑: 좌우 분할 / 모바일: 리스트만 */}
      <div className="flex flex-col md:flex-row w-screen pt-2 max-w-screen">
        <div className="w-full md:w-[50%] lg:w-[60%]">
          <SwList
            swlist={swlist}
            swdata={swdata}
            setPage={setPage}
            page={page}
            openModal={openModal}
          />
        </div>

        {/* 데스크탑: 우측에 Outlet 표시 */}
        {!isMobile && (
          <div className="w-full md:w-[50%] lg:w-[40%] pl-5">
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

export default SwMain;
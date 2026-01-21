import { Outlet, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../util/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useIsMobile } from "../../util/useIsMobile";
import IpList from "./IpList";
import IpSearch from "./IpSearch";

Modal.setAppElement("#root");

// 검색과 목록의 컴포넌트를 개별화 하기위해 상위 컴포넌트의 메인에 필요 변수, 렌더링, 함수를 끌어올려 하위 컴포넌트로 나눠주고 있음
const IpMain = () => {
  // 변수 선언
  const { selectedMenu, setSelectedMenu, ipSearch, setIpSearch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [iplist, setIplist] = useState();
  const [ipdata, setIpdata] = useState();
  const isMobile = useIsMobile();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 렌더링 부분
  useEffect(() => {
    setSelectedMenu("전산관리 - IP관리");
    ipNum();
    ipList();
  }, [page]);

  // Axios 요청부분
  const ipNum = async () => {
    await api
      .post("/ip/pagenum", {
        ipaddr : ipSearch.ipaddr, usernm : ipSearch.usernm, deptnm : ipSearch.deptnm, ipyn : ipSearch.ipyn
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setIplist(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const ipList  = async () => {
    // alert('요청page'+page);)
    await api
      .post("/ip/page", {
        pageNumber : (page-1), ipaddr : ipSearch.ipaddr, usernm : ipSearch.usernm, deptnm : ipSearch.deptnm, ipyn : ipSearch.ipyn
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setIpdata(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }
  
  // 함수 부분
  // 검색 옵션 변경
  const handleSearchClick = (e) => {
    e.preventDefault();
    ipNum();
    ipList();
  };

  // 수정 또는 신규 창 닫기
  const closePage = () => {
    console.log('작동');
    navigate('/main/ip');
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
        <IpSearch onSearch={handleSearchClick} />
      </div>
      <div className="py-1 pl-2">
        <span>PC : 150.1.*.130 ~ 199 / 인터넷 제한 : 150.1.*.200 ~ 219 / 장비 : 150.1.*.220 ~ 254</span>
      </div>

      {/* 데스크탑: 좌우 분할 / 모바일: 리스트만 */}
      <div className="flex flex-col md:flex-row w-screen max-w-screen">
        <div className="w-full md:w-[55%] lg:w-[65%]">
          <IpList
            iplist={iplist}
            ipdata={ipdata}
            setPage={setPage}
            page={page}
            openModal={openModal}
          />
        </div>

        {/* 데스크탑: 우측에 Outlet 표시 */}
        {!isMobile && (
          <div className="w-full md:w-[45%] lg:w-[35%] pl-5">
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

export default IpMain;
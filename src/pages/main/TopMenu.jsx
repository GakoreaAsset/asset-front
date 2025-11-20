import { useContext, useEffect, useState } from 'react';
import Modal from "react-modal";
import logo from '../../assets/img/gakorealogo.png'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../util/GlobalContext';

// React Modal 접근성 설정 (App 루트 id)
Modal.setAppElement('#root');

const TopMenu = () => {
  // 변수 선언
  const {selectedMenu, setSelectedMenu } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // CSS 설정
  const topCss = 'text-sm text-gray-700 hover:bg-yellow-100 px-4 py-2';
  const mobilemenuCss = 'block px-4 py-2 hover:bg-yellow-100';
  const subCss = 'absolute left-0 top-full bg-white rounded shadow-md w-52 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50';
  const menudivCss = 'flex items-center cursor-pointer px-3 py-2 rounded hover:bg-yellow-300 transition';

  // 렌더링 부분
  useEffect(function() {

  }, [])

  // 함수 부분
  const openMobileMenu = () => setIsModalOpen(true);
  const closeMobileMenu = () => setIsModalOpen(false);

  return (
    <div className="">
      {/* 로고 영역 */}
      <div id="main-ci" className="h-[47px] bg-white shadow">
        <h1 className="items-center justify-center align-middle px-1 py-3">
          <img src={logo} alt="logo" className="w-[150px] h-[27.3px] ml-2" />
        </h1>
      </div>

      {/* 상단 네비게이션 */}
      <div id="headerTitle" className="flex bg-[#f9e79f] text-gray-800 justify-between items-center shadow">
        {/* 좌측: 선택한 메뉴 이름 */}
        <div className="flex items-center gap-4 lg:ml-4">
          <h1 className="text-lg font-bold text-blue-500">{selectedMenu}</h1>

          {/* 데스크탑 전용 메뉴 */}
          <ul className="hidden sm:flex gap-4 ml-6">
            <li className="relative group">
              <div className={menudivCss}>
                <span className="font-semibold">식수관리</span>
              </div>
              <ul className={subCss}>
                <li className={`${topCss} rounded-t`}>
                  <Link to="/main/meal/empuse">
                    월별사원사용내역
                  </Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/meal/usesearch">
                    식수사용내역검색
                  </Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/meal/userstate">
                    식수사용자현황
                  </Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/meal/daytotal">
                    일별식당누계(영업지원)
                  </Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/meal/daymealtotal">
                    기간별식수누계(영업지원)
                  </Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/meal/daydepatotal">
                    기간별부서누계(영업지원)
                  </Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/meal/resdaytotal">
                    일별식당누계(식당)
                  </Link>
                </li>
                <li className={`${topCss} rounded-b`}>
                  <Link to="/main/meal/resmonthtotal" >
                    월별식당누계(식당)
                  </Link>
                </li>
                {/* 
                <li className={`${topCss} rounded-b`}>
                  <Link to="/main/meal/limitsetting">
                    한도설정조회
                  </Link>
                </li>
                 */}
              </ul>
            </li>
            <li className="relative group">
              <div className={menudivCss}>
                <span className='font-semibold'>전산관리</span>
              </div>
              <ul className={subCss}>
                <li className={`${topCss} rounded-t`}>
                  <Link to="/main/asset">전산자산관리</Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/asset/history">자산이력조회</Link>
                </li>
                <li className={topCss}>
                  <Link to="/main/ip">IP관리</Link>
                </li>
                <li className={`${topCss} rounded-b`}>
                  <Link to="/main/license">S/W라이선스관리</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* 우측 햄버거 버튼 (모바일 전용) */}
        <div className="sm:hidden">
          <button onClick={openMobileMenu} className="px-2 py-1 hover:bg-yellow-300 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* react-modal 오버레이 + 메뉴 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeMobileMenu}
        contentLabel="모바일 메뉴"
        closeTimeoutMS={200} // 애니메이션 타이밍
        overlayClassName="fixed inset-0 bg-transparent z-40"
        className={{
          base: "fixed top-0 right-0 w-full max-w-[16rem] h-full bg-white shadow-lg p-6 z-50 transform transition-transform duration-300",
          afterOpen: "translate-x-0",
          beforeClose: "translate-x-full"
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4 text-blue-600">메뉴</h2>
        <ul className="flex flex-col gap-3">
          <li className="font-semibold">식수관리</li>
            <ul className='ml-4 text-sm text-gray-700'>
              <li>
                <Link to="/main/meal/empuse" className={mobilemenuCss} onClick={closeMobileMenu}>
                  월별사원사용내역
                </Link>
              </li>
              <li>
                <Link to="/main/meal/usesearch" className={mobilemenuCss} onClick={closeMobileMenu}>
                  식수사용내역검색
                </Link>
              </li>
              <li>
                <Link to="/main/meal/userstate" className={mobilemenuCss} onClick={closeMobileMenu}>
                  식수사용자현황
                </Link>
              </li>
              <li>
                <Link to="/main/meal/daytotal" className={mobilemenuCss} onClick={closeMobileMenu}>
                  일별식당누계(영업지원팀)
                </Link>
              </li>
              <li>
                <Link to="/main/meal/daymealtotal" className={mobilemenuCss} onClick={closeMobileMenu}>
                  기간별식수누계(영업지원팀)
                </Link>
              </li>
              <li>
                <Link to="/main/meal/daydepatotal" className={mobilemenuCss} onClick={closeMobileMenu}>
                  기간별부서누계(영업지원팀)
                </Link>
              </li>
              <li>
                <Link to="/main/meal/resdaytotal" className={mobilemenuCss} onClick={closeMobileMenu}>
                  일별식당누계(식당)
                </Link>
              </li>
              <li>
                <Link to="/main/meal/resmonthtotal" className={mobilemenuCss} onClick={closeMobileMenu}>
                  월별식당누계(식당)
                </Link>
              </li>
              {/* 
              <li>
                <Link to="/main/meal/limitsetting" className={mobilemenuCss} onClick={closeMobileMenu}>
                  한도설정조회
                </Link>
              </li>
                */}
            </ul>
          <li className="font-semibold">전산관리</li>
            <ul className="ml-4 text-sm text-gray-700">
              <li>
                <Link to="/main/asset" className={mobilemenuCss} onClick={closeMobileMenu}>
                  전산자산관리
                </Link>
              </li>
              <li>
                <Link to="/main/asset/history" className={mobilemenuCss} onClick={closeMobileMenu}>
                  자산이력조회
                </Link>
              </li>
              <li>
                <Link to="/main/ip" className={mobilemenuCss} onClick={closeMobileMenu}>
                  IP관리
                </Link>
              </li>
              <li>
                <Link to="/main/license" className={mobilemenuCss} onClick={closeMobileMenu}>
                  S/W라이선스관리
                </Link>
              </li>
            </ul>
        </ul>
      </Modal>
    </div>
  );
}

export default TopMenu;
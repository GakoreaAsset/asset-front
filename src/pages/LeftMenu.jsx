import { Link } from "react-router-dom";

const LeftMenu = () => {
    

  // 버튼눌렀을때 관련 하위 메뉴 활성화
  const handleAsset = () => {
    // 버튼을 눌렀을때 히든속성과 자리차지를 안하는 속성을 변경하여 바꾸기
  };

  return (
    <>
      {/* <aside
        className={`bg-white shadow-md w-64 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative z-50 h-full`}
      >
        <div className="p-4 font-bold border-b">결재 HOME</div>
        <nav className="p-4 space-y-2 text-sm">
          <div className="font-semibold">결재수신함</div>
          <ul className="ml-2 space-y-1">
            <li className="text-blue-600 font-bold">미결문서</li>
            <li>기결문서</li>
            <li>수신참조문서</li>
          </ul>
          <div className="mt-4 font-semibold">결재설정</div>
          <div className="mt-2 font-semibold">인수인계</div>
        </nav>
      </aside> */}
      <div className="min-w-20%">
        <ul>
          {/* <li>
            <Link>
            <span>식수관리</span>
            </Link>
          </li> */}
          <li>
            <Link to='/main/food'>
              <span>식수관리</span>
            </Link>
          </li>
          <li>
            <span>
              <button onClick={handleAsset}>▼</button>
            </span>
            <Link to='/main/asset'>
              <span>전산관리</span>
            </Link>
              <ul id="assetmenu" className="hidden absolute opacity-0" >
                <li>전산자산관리</li>
                <li>자산이력조회</li>
                <li>IP관리</li>
                <li>S/W라이선스관리</li>
              </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LeftMenu;
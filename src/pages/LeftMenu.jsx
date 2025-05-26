import { Link } from "react-router-dom";

const LeftMenu = () => {
    

  // 버튼눌렀을때 관련 하위 메뉴 활성화
  const handleAsset = () => {
    // 버튼을 눌렀을때 히든속성과 자리차지를 안하는 속성을 변경하여 바꾸기
  };

  return (
    <>
      <div>
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
            <Link to='/main/asset'>
              <span>전산관리</span>
            </Link>
              <span>
                <button onClick={handleAsset}>▼</button>
              </span>
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
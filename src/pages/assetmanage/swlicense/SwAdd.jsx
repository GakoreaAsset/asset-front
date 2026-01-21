import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../util/GlobalContext";
import Swal from "sweetalert2";
import api from "../../api/api";

const SwAdd = () => {
  // 변수 선언
  const { selectedMenu, setSelectedMenu } = useContext(GlobalContext);
  const { onClose } = useOutletContext();
  const navigate = useNavigate();
  const [swdetail, setSwdetail] = useState({swno : "02", itemdcd : "1",  swnm : "",  anm : "", mcorp : "", myear : "", ugubun :  "PC", lgubun : "01", lqty : "", rqty : "", aplace : "", lsdate : "", ledate : "", astate : "01", acorpcd : "01021000", apart : "", auser : "", spec : "", attr1 : "", attr2 : "", price : '0', iyear : "", regip : '', regid : ''});
  const price = swdetail ? parseInt(swdetail.price, 10).toLocaleString() : '';

  // 공통 CSS 클래스
  const flexClass = 'flex items-center mb-2 text-sm';
  const labelClass = "w-28 text-center pr-4 font-semibold";
  const inputClass = "flex-1 px-2 py-1 border rounded w-full";
  const sinputClass = "flex-2 border rounded ";
  const selectClass = 'px-2 py-1 w-full';

  // 렌더링 부분
  useEffect(() => {
    setSelectedMenu('S/W라이선스등록');
    ipcheck();
  }, []);

  // Axios 요청부분
  // 공인 IP확인
  const ipcheck = async () => {
  await axios
      .get("https://api.ipify.org?format=json")
      .then(response => {
        const userIp = response.data.ip;
        // console.log(userIp);
        handleswdetail('regip', userIp);
      })
      .catch(error => {
        console.error("IP 가져오기 실패:", error);
      });
  }

  // 신규등록
  const swaddCheck  = async () => {
    // 자산명, 귀속부서, 사용자 필수값3개 없으면 리턴되게 설정
    if (swdetail.acdid === null || swdetail.swnm === "" || swdetail.swnm === undefined ) {
      Swal.fire({ title: "자산명을 채워주세요", icon: "error", draggable: true, timer: 2000 });
      return;
    }
    if (swdetail.apart === null || swdetail.apart === "" || swdetail.apart === undefined ) {
      Swal.fire({ title: "귀속부서를 채워주세요", icon: "error", draggable: true, timer: 2000 });
      return;
    }
    if (swdetail.auser === null || swdetail.auser === "" || swdetail.auser === undefined ) {
      Swal.fire({ title: "사용자를 채워주세요", icon: "error", draggable: true, timer: 2000 });
      return;
    }

    await api
      .post("/sw/add",
        swdetail
      )
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        Swal.fire({ title: "신규등록 하였습니다.", icon: "success", draggable: true, timer: 2000 });
        navigate('/main/license');
      })
      .catch((err) => {
        Swal.fire({ title: "잠시후 다시 등록해주세요", icon: "warning", draggable: true, timer: 2000 });
      });
  }
  
  // 함수 부분
  const handleswdetail = (key, value) =>{
    // console.log('1/2 도달');
    if (key === 'price' || key === 'iyear' || key === 'myear') {
      let rawValue = '';
      // console.log('value값 : ' + value);
      if (key === 'price') {
        rawValue = value.replace(/[^\d]/g, '');
        // console.log('2/2 도달');
        // console.log('rawValue값 : ' + rawValue);
        setSwdetail((prev) => ({ ...prev, [key]: rawValue }));
      }
      if (/^\d*$/.test(value)) {
        setSwdetail((prev) => ({ ...prev, [key]: value }));
      }
    } else {
      setSwdetail((prev) => ({ ...prev, [key]: value }));
    }

    // console.log(value);
  }

    return (
      <>
        <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-7xl mx-auto">
          <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-2">

            <div className="items-center align-middle text-center lg:hidden">전산-신규등록</div>

            <div className={flexClass}>
              <label className={labelClass}>자산분류코드</label>
              <div className={sinputClass}>
                <select className={selectClass} onChange={(e) => handleswdetail('itemdcd', e.target.value)} value={swdetail.itemdcd}>
                  <option value="1">운영체제(OS)</option>
                  <option value="2">데이터베이스(DBMS)</option>
                  <option value="3">사무/문서(OA)</option>
                  <option value="4">그래픽/CAD</option>
                  <option value="5">백신/보안</option>
                  <option value="6">개발툴</option>
                  <option value="7">기타</option>
                </select>
              </div>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>자산명</label>
              <input name="swnm" maxLength="50" className={inputClass} onChange={(e) => handleswdetail('swnm', e.target.value)} value={swdetail.swnm} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>제조사</label>
              <input name="mcorp" maxLength="20" className={inputClass} onChange={(e) => handleswdetail('mcorp', e.target.value)} value={swdetail.mcorp}/>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>취득일자</label>
              <input maxLength="50" className={inputClass} onChange={(e) => handleswdetail('myear', e.target.value)} value={swdetail.myear}/>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>사용구분</label>
              <select name="ugubun" className={inputClass} onChange={(e) => handleswdetail('ugubun', e.target.value)} value={swdetail.ugubun} >
                {/* <option value="01">PC</option>
                <option value="02">서버</option> */}
                <option value="PC">PC</option>
                <option value="서버">서버</option>
              </select>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>라이선스종류</label>
              <select name="lgubun" className={inputClass} onChange={(e) => handleswdetail('lgubun', e.target.value)} value={swdetail.lgubun} >
                <option value="01">패키지/영구</option>
                <option value="02">구독형</option>
              </select>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>총수량</label>
              <input name="lqty" maxLength="30" className={inputClass} onChange={(e) => handleswdetail('lqty', e.target.value)} value={swdetail.lqty} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>잔여수량</label>
              <input name="rqty" maxLength="30" className={inputClass} onChange={(e) => handleswdetail('rqty', e.target.value)} value={swdetail.rqty} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>라이선스 기간</label>
              <input name="lsdate" maxLength="30" className={inputClass} onChange={(e) => handleswdetail('lsdate', e.target.value)} value={swdetail.lsdate} />
              <span> ~ </span>
              <input name="ledate" maxLength="30" className={inputClass} onChange={(e) => handleswdetail('ledate', e.target.value)} value={swdetail.ledate} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>자산상태</label>
              <select name="astate" className={inputClass} onChange={(e) => handleswdetail('astate', e.target.value)} value={swdetail.astate} >
                <option value="01">사용중</option>
                <option value="02">보유</option>
                <option value="06">폐기</option>
                <option value="04">분출</option>
                <option value="05">A/S</option>
                <option value="08">분실</option>
                <option value="09">만료</option>
              </select>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>회사</label>
              <select className={inputClass} onChange={(e) => handleswdetail('acorpcd', e.target.value)} value={swdetail.acorpcd}>
                <option value="01021000">기흥관광개발(주)</option>
                <option value="01031000">뉴경기관광(주)</option>
                <option value="01041000">(주)지에이코리아</option>
                <option value="01071000">(주)강호개발</option>
                <option value="01091000">그린팜</option>
                {/* <option value="주식회사 지엠씨">주식회사 지엠씨</option> */}
                {/* <option value="(주)유성 본점">(주)유성 본점</option> */}
                {/* <option value="와이에스인베스트먼트(주)">와이에스인베스트먼트(주)</option> */}
              </select>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>귀속부서</label>
              <input name="apart" maxLength="30" className={inputClass} onChange={(e) => handleswdetail('apart', e.target.value)} value={swdetail.apart} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>사용자</label>
              <input name="auser" maxLength="30" className={inputClass} onChange={(e) => handleswdetail('auser', e.target.value)} value={swdetail.auser} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>세부사항</label>
              <input name="spec" maxLength="200" className={inputClass} onChange={(e) => handleswdetail('spec', e.target.value)} value={swdetail.spec} />
            </div>

            {[1, 2].map((numb) => (
              <div key={numb} className='flex md:col-span-2 items-center mb-2 text-sm'>
                <label className={labelClass}>비고{numb}</label>
                <input name={`attr${numb}`} maxLength="200" className={inputClass} onChange={(e) => handleswdetail(`attr${numb}`, e.target.value)} value={swdetail[`attr${numb}`]} />
              </div>
            ))}

            <div className={flexClass}>
              <label className={labelClass}>취득가액</label>
              <input name="price" maxLength="8" className={inputClass} onChange={(e) => handleswdetail('price', e.target.value)} value={swdetail.price}/>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>설치일자</label>
              <input name="iyear" maxLength="8" className={inputClass} onChange={(e) => handleswdetail('iyear', e.target.value)} value={swdetail.iyear}/>
              {/* <span className="text-sm text-gray-500">예: 20250525</span> */}
            </div>

            {/* <div className={flexClass}>
              <label className={labelClass}>등록일</label>
              <input name="iyear" maxLength="8" className={inputClass} onChange={(e) => handleswdetail('iyear', e.target.value)} value={swdetail.iyear}/>
            </div> */}

          </div>

          <div className="flex flex-wrap justify-between mt-8 gap-4">
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={swaddCheck} >저장</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600" onClick={onClose}>닫기</button>
            </div>
          </div>

        </div>
      </>
    );
}

export default SwAdd;
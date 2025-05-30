import { useContext, useEffect, useState } from "react";
import { GlobalMenu } from "../main/GlobalMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AssetAdd = () => {
  // 변수 선언
  const { globalMenuval, setGlobalMenuval } = useContext(GlobalMenu);
  const navigate = useNavigate();
  const [asitem, setAsitem] = useState({itemdcd : "02",  acdid : "",  anm : "", mcorp : "", myear : "", astate :  "01", acorpcd : "01021000", aplace : "골드CC", apart : "", auser : "", spec : "CPU: / RAM: / VGA: / SSD: / HDD:", attr1 : "", attr2 : "", attr3 : "", attr4 : "", attr5 : "", price : "", iyear : "", regip : '""', regid : ''});


  // 렌더링 부분
  useEffect(() => {
    setGlobalMenuval('전산관리 - 전산자산등록');
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
        handleAsitem('regip', userIp);
      })
      .catch(error => {
        console.error("IP 가져오기 실패:", error);
      });
  }

  // 신규등록
  const assetadd  = async () => {
  await axios
    .post("/asset/add",
      asitem
    )
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      // console.log(response.data);

      navigate('/main/asset');
    })
    .catch((err) => {
      alert(err);
    });
  }
  
  // 함수 부분
  const handleAsitem = (key, value) =>{
    setAsitem((prev) => ({ ...prev, [key]: value }));
    console.log(value);
  }

    return (
        <>
          <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">

            <div>
              <label className="block font-semibold mb-1">자산분류코드</label>
              <select className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('item4nm', e.target.value)} value={asitem.item4nm}>
                <option value="02">PC</option>
                <option value="03">모니터</option>
                <option value="31">노트북</option>
                <option value="30">외장HDD</option>
                <option value="01">서버</option>
                <option value="05">키오스크</option>
                <option value="10">임대</option>
                <option value="04">프린터</option>
                <option value="18">랜카드</option>
                <option value="07">공유기</option>
                <option value="06">네트워크장비</option>
                <option value="32">렉</option>
                <option value="29">기타</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">자산코드</label>
              <input name="acdid" maxLength="50" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('acdid', e.target.value)} value={asitem.acdid}/>
            </div>

            <div>
              <label className="block font-semibold mb-1">자산명</label>
              <input name="anm" maxLength="50" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('anm', e.target.value)} value={asitem.anm} />
            </div>

            <div>
              <label className="block font-semibold mb-1">제조사</label>
              <input name="mcorp" maxLength="20" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('mcorp', e.target.value)} value={asitem.mcorp}/>
            </div>

            <div>
              <label className="block font-semibold mb-1">제조년월</label>
              <input name="myear" maxLength="8" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('myear', e.target.value)} value={asitem.myear} />
            </div>

            <div>
              <label className="block font-semibold mb-1">자산상태</label>
              <select name="astate" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('statenm', e.target.value)} value={asitem.statenm} >
                <option value="01">사용중</option>
                <option value="02">보유</option>
                <option value="06">폐기</option>
                <option value="04">분출</option>
                <option value="05">A/S</option>
                <option value="08">분실</option>
                <option value="09">만료</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">회사</label>
              <select className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('acorpcd', e.target.value)} value={asitem.acorpcd}>
                <option value="01021000">기흥관광개발(주)</option>
                <option value="01031000">뉴경기관광(주)</option>
                <option value="01041000">(주)지에이코리아</option>
                <option value="01071000">(주)강호개발</option>
                <option value="01091000">영농회사법인 그린팜주식회사</option>
                {/* <option value="주식회사 지엠씨">주식회사 지엠씨</option> */}
                {/* <option value="(주)유성 본점">(주)유성 본점</option> */}
                {/* <option value="와이에스인베스트먼트(주)">와이에스인베스트먼트(주)</option> */}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">설치장소</label>
              <select name="aplace" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('aplace', e.target.value)} value={asitem.aplace} >
                <option>전체</option>
                <option value="골드CC">골드CC</option>
                <option value="코리아CC">코리아CC</option>
                <option value="퍼블릭CC">퍼블릭CC</option>
                <option value="콘도">콘도</option>
                <option value="3.5층">3.5층</option>
                <option value="전산실">전산실</option>
                <option value="그린팜">그린팜</option>
                <option value="서울">서울</option>
                <option value="강화도">강화도</option>
                <option value="예약실">예약실</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">귀속부서</label>
              <input name="apart" maxLength="20" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('apart', e.target.value)} value={asitem.apart} />
            </div>

            <div>
              <label className="block font-semibold mb-1">사용자</label>
              <input name="auser" maxLength="20" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('auser', e.target.value)} value={asitem.auser} />
            </div>

            <div>
              <label className="block font-semibold mb-1">성능</label>
              <input name="spec" maxLength="100" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('spec', e.target.value)} value={asitem.spec} />
            </div>

            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num}>
                <label className="block font-semibold mb-1">속성{num}</label>
                <input name={`attr${num}`} maxLength="100" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem(`attr${num}`, e.target.value)} value={asitem[`attr${num}`]} />
              </div>
            ))}

            <div>
              <label className="block font-semibold mb-1">취득가액</label>
              <div className="flex items-center bg-gray-50">
                <input name="price" maxLength="8" className="w-full border rounded px-3 py-2 text-right" onChange={(e) => handleAsitem('price', e.target.value)} value={asitem.price}/>
                <span className="ml-2 text-gray-500">원</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">설치일자</label>
              <input name="iyear" maxLength="8" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('iyear', e.target.value)} value={asitem.iyear}/>
              <span className="text-sm text-gray-500">예: 20250525</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between mt-8 gap-4">
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={assetadd} >저장</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600" >목록</button>
            </div>
          </div>
        </div>
        </>
    );
}

export default AssetAdd;
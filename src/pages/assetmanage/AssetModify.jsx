import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalMenu } from "../main/GlobalMenu";
import Swal from "sweetalert2";


const AssetModify = () => {
  // 변수 선언
  const { globalMenuval, setGlobalMenuval } = useContext(GlobalMenu);
  const navigate = useNavigate();
  const {num} = useParams();
  const [asdetail, setAsdetail] = useState();

  // 렌더링 부분
  useEffect(() => {
    setGlobalMenuval("전산관리 - 전산자산상세보기(수정)");
    assetdetail();
    ipcheck();
    // console.log(asdetail);
  }, []);

  useEffect(() => {

  }, [asdetail]);

  // Axios 요청부분
  const assetdetail  = async () => {
    // alert('요청page'+page);
    await axios
      .get("/asset/detail", {
        params: {ano: num}
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        console.log(response.data);
        setAsdetail(response.data);
        // setItemdcd(response.data.item4nm);
        // setAstate(response.data.statenm);
      })
      .catch((err) => {
        alert(err);
      });
  }

  // 공인 IP확인
  const ipcheck = async () => {
  await axios
      .get("https://api.ipify.org?format=json")
      .then(response => {
        const userIp = response.data.ip;
        // console.log(userIp);
        handleAsdetail('regip', userIp);
      })
      .catch(error => {
        console.error("IP 가져오기 실패:", error);
      });
  }

  // 업데이트등록
  const assetmodify  = async () => {
  await axios
    .post("/asset/modify",
      asdetail
    )
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      // console.log(response.data);
      Swal.fire({ title: "수정완료 되었습니다", icon: "success", draggable: true });
      navigate('/main/asset');
    })
    .catch((err) => {
      alert(err);
    });
  }


  // 함수 부분
  const handleAsdetail = (key, value) =>{
    setAsdetail((prev) => ({ ...prev, [key]: value }));
    console.log(value);
  }

  return (
    <>
      {asdetail && (
        <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">

            <div>
              <label className="block font-semibold mb-1">자산번호</label>
              <div className="border px-3 py-2 rounded bg-gray-50">{num}</div>
            </div>

            <div>
              <label className="block font-semibold mb-1">자산분류코드</label>
              <div className="flex align-middle justify-center items-center border rounded">
                <select name="itemdcd" className="w-full px-3 py-2" onChange={(e) => handleAsdetail('itemdcd', e.target.value)} value={asdetail.itemdcd}>
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
                <span className="align-middle justify-center items-center px-2 text-2xl text-gray-500">{asdetail.item4cd}</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">자산코드</label>
              <input name="acdid" maxLength="50" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('acdid', e.target.value)} value={asdetail.acdid}/>
            </div>

            <div>
              <label className="block font-semibold mb-1">자산명</label>
              <input name="anm" maxLength="50" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('anm', e.target.value)} value={asdetail.anm} />
            </div>

            <div>
              <label className="block font-semibold mb-1">제조사</label>
              <input name="mcorp" maxLength="20" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('mcorp', e.target.value)} value={asdetail.mcorp}/>
            </div>

            <div>
              <label className="block font-semibold mb-1">제조년월</label>
              <input name="myear" maxLength="8" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('myear', e.target.value)} value={asdetail.myear} />
            </div>

            <div>
              <label className="block font-semibold mb-1">자산상태</label>
              <select name="astate" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('astate', e.target.value)} value={asdetail.astate} >
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
              <select className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('acorpcd', e.target.value)} value={asdetail.acorpcd}>
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
              <select name="aplace" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('aplace', e.target.value)} value={asdetail.aplace} >
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
              <input name="apart" maxLength="20" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('apart', e.target.value)} value={asdetail.apart} />
            </div>

            <div>
              <label className="block font-semibold mb-1">사용자</label>
              <input name="auser" maxLength="20" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('auser', e.target.value)} value={asdetail.auser} />
            </div>

            <div>
              <label className="block font-semibold mb-1">성능</label>
              <input name="spec" maxLength="100" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('spec', e.target.value)} value={asdetail.spec} />
            </div>

            {[1, 2, 3, 4, 5].map((numb) => (
              <div key={numb}>
                <label className="block font-semibold mb-1">속성{numb}</label>
                <input name={`attr${numb}`} maxLength="100" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail(`attr${numb}`, e.target.value)} value={asdetail[`attr${numb}`]} />
              </div>
            ))}

            <div>
              <label className="block font-semibold mb-1">취득가액</label>
              <div className="flex items-center border px-3 py-2 rounded bg-gray-50">
                <input maxLength="100" className="" onChange={(e) => handleAsdetail('price', e.target.value)} value={asdetail.price} />
                <span className="ml-2 text-gray-500 text-right">원</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">설치일자</label>
              <input name="iyear" maxLength="8" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsdetail('iyear', e.target.value)} value={asdetail.iyear}/>
              <span className="text-sm text-gray-500">예: 20250525</span>
            </div>

            <div className="col-span-1 md:col-span-3">
              <label className="inline-flex items-center">
                <input type="checkbox" className="mr-2" onChange={(e) => handleAsdetail('update', e.target.checked)}/>
                체크 시 자산이력 등록
              </label>
            </div>
          </div>

          <div className="flex flex-wrap justify-between mt-8 gap-4">
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={assetmodify} >저장</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">목록</button>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">이력조회</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AssetModify;
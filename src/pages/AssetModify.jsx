import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const AssetModify = () => {
  // 변수 선언
  const {num} = useParams();
  const [asdetail, setAsdetail] = useState();

  // 렌더링 부분
  useEffect(() => {
    assetdetail();
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

  // 함수 부분
  const handleItemdcd = (e) =>{
    setAsdetail.item4nm(e);
    // console.log(e);
  }



  return (
    <>
{asdetail && (
  <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6">
      {/* 자산분류코드 */}
      <div>
        <label className="block font-semibold mb-1">자산분류코드</label>
        <select
          name="itemdcd"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setAsdetail.item4nm(e.target.value)}
          value={asdetail.item4nm}
        >
          <option value="PC">PC</option>
          <option value="모니터">모니터</option>
          <option value="노트북">노트북</option>
          <option value="외장HDD">외장HDD</option>
          <option value="키오스크">키오스크</option>
          <option value="임대">임대</option>
          <option value="프린터">프린터</option>
          <option value="랜카드">랜카드</option>
          <option value="공유기">공유기</option>
          <option value="네트워크장비">네트워크장비</option>
          <option value="렉">렉</option>
          <option value="기타">기타</option>
        </select>
        <span className="text-sm text-gray-500">해당하는 번호 출력</span>
      </div>

      {/* 자산번호 */}
      <div>
        <label className="block font-semibold mb-1">자산번호</label>
        <div className="border px-3 py-2 rounded bg-gray-50">{num}</div>
      </div>

      {/* 자산코드 */}
      <div>
        <label className="block font-semibold mb-1">자산코드</label>
        <input
          name="acdid"
          maxLength="50"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setAsdetail.acdid(e.target.value)}
          value={asdetail.acdid}
        />
      </div>

      {/* 자산명 */}
      <div>
        <label className="block font-semibold mb-1">자산명</label>
        <input
          name="anm"
          maxLength="25"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setAsdetail.anm(e.target.value)}
          value={asdetail.anm}
        />
      </div>

      {/* 제조사 */}
      <div>
        <label className="block font-semibold mb-1">제조사</label>
        <input
          name="mcorp"
          maxLength="10"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAplace(e.target.value)}
          value={asdetail.mcorp}
        />
      </div>

      {/* 제조년월 */}
      <div>
        <label className="block font-semibold mb-1">제조년월</label>
        <input
          name="myear"
          maxLength="8"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAplace(e.target.value)}
          value={asdetail.iyear}
        />
      </div>

      {/* 자산상태 */}
      <div>
        <label className="block font-semibold mb-1">자산상태</label>
        <select
          name="astate"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAstate(e.target.value)}
          value={asdetail.statenm}
        >
          <option value="사용중">사용중</option>
          <option value="보유">보유</option>
          <option value="폐기">폐기</option>
          <option value="분출">분출</option>
          <option value="A/S">A/S</option>
          <option value="분실">분실</option>
          <option value="만료">만료</option>
        </select>
      </div>

      {/* 회사 */}
      <div>
        <label className="block font-semibold mb-1">회사</label>
        <select
          name="acorpcd"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAcorpcd(e.target.value)}
          value={asdetail.conm}
        >
          <option value="(주)유성 본점">(주)유성 본점</option>
          <option value="기흥관광개발(주)">기흥관광개발(주)</option>
          <option value="뉴경기관광(주)">뉴경기관광(주)</option>
          <option value="(주)지에이코리아">(주)지에이코리아</option>
          <option value="주식회사 지엠씨">주식회사 지엠씨</option>
          <option value="(주)강호개발">(주)강호개발</option>
          <option value="와이에스인베스트먼트(주)">와이에스인베스트먼트(주)</option>
          <option value="영농회사법인 그린팜주식회사">영농회사법인 그린팜주식회사</option>
        </select>
      </div>

      {/* 설치장소 */}
      <div>
        <label className="block font-semibold mb-1">설치장소</label>
        <select
          name="aplace"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAplace(e.target.value)}
          value={asdetail.aplace}
        >
          <option>전체</option>
          <option value="골드CC">골드CC</option>
          <option value="코리아CC">코리아CC</option>
          <option value="퍼블릭CC">퍼블릭CC</option>
          <option value="콘도">콘도</option>
          <option value="3.5층">3.5층</option>
          <option value="예약실">예약실</option>
          <option value="전산실">전산실</option>
          <option value="그린팜">그린팜</option>
          <option value="서울">서울</option>
          <option value="강화도">강화도</option>
        </select>
      </div>

      {/* 귀속부서 */}
      <div>
        <label className="block font-semibold mb-1">귀속부서</label>
        <input
          name="apart"
          maxLength="15"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAplace(e.target.value)}
          value={asdetail.apart}
        />
      </div>

      {/* 사용자 */}
      <div>
        <label className="block font-semibold mb-1">사용자</label>
        <input
          name="auser"
          maxLength="15"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAplace(e.target.value)}
          value={asdetail.auser}
        />
      </div>

      {/* 성능 */}
      <div>
        <label className="block font-semibold mb-1">성능</label>
        <input
          name="spec"
          maxLength="100"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleAplace(e.target.value)}
          value={asdetail.spec}
        />
      </div>

      {/* 속성1~5 */}
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num}>
          <label className="block font-semibold mb-1">속성{num}</label>
          <input
            name={`attr${num}`}
            maxLength="50"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => handleAplace(e.target.value)}
            value={asdetail[`attr${num}`]}
          />
        </div>
      ))}

      {/* 취득가액 */}
      <div>
        <label className="block font-semibold mb-1">취득가액</label>
        <div className="flex items-center border px-3 py-2 rounded bg-gray-50">
          {asdetail.price} <span className="ml-2 text-gray-500">원</span>
        </div>
      </div>

      {/* 설치일자 */}
      <div>
        <label className="block font-semibold mb-1">설치일자</label>
        <div className="flex items-center gap-2">
          <input
            name="iyear"
            maxLength="8"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => handleAplace(e.target.value)}
            value={asdetail.myear}
          />
          <span className="text-sm text-gray-500">예: 20250525</span>
        </div>
      </div>

      {/* 이력 체크 */}
      <div className="col-span-1 md:col-span-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" />
          체크 시 자산이력 등록
        </label>
      </div>
    </div>

    {/* 버튼 영역 */}
    <div className="flex flex-wrap justify-between mt-8 gap-4">
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">저장</button>
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
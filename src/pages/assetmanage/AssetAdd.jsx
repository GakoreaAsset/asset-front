import { useEffect, useState } from "react";


const AssetAdd = () => {
  // 변수 선언
  const [asitem, setAsitem] = useState({itemdcd : "PC",  acdid : "",  anm : "", mcorp : "", myear : "", astate :  "사용중", acorpcd : "기흥관광개발(주)", aplace : "골드CC", apart : "", auser : "", spec : "CPU: / RAM: / VGA: / SSD: / HDD:", attr1 : "", attr2 : "", attr3 : "", attr4 : "", attr5 : "", price : "", iyear : ""});

  // 렌더링 부분
  useEffect(() => {

  }, []);

  // Axios 요청부분

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
              <select name="itemdcd" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('item4nm', e.target.value)} value={asitem.item4nm}>
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
                <option value="사용중">사용중</option>
                <option value="보유">보유</option>
                <option value="폐기">폐기</option>
                <option value="분출">분출</option>
                <option value="A/S">A/S</option>
                <option value="분실">분실</option>
                <option value="만료">만료</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">회사</label>
              <select name="acorpcd" className="w-full border rounded px-3 py-2" onChange={(e) => handleAsitem('conm', e.target.value)} value={asitem.conm}>
                <option value="기흥관광개발(주)">기흥관광개발(주)</option>
                <option value="뉴경기관광(주)">뉴경기관광(주)</option>
                <option value="(주)지에이코리아">(주)지에이코리아</option>
                <option value="(주)강호개발">(주)강호개발</option>
                <option value="영농회사법인 그린팜주식회사">영농회사법인 그린팜주식회사</option>
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
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">저장</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">목록</button>
            </div>
          </div>
        </div>
        </>
    );
}

export default AssetAdd;
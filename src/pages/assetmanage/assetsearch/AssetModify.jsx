import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AssetHistorymodal from './AssetHistorymodal';
import Modal from 'react-modal';
import api from "../../api/api";

const AssetModify = () => {
  // 변수 선언
  const { onClose } = useOutletContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {num} = useParams();
  const [asdetail, setAsdetail] = useState();
  const [asdetailhistory, setAsdetailhistory] = useState();
  const price = asdetail ? parseInt(asdetail.price, 10).toLocaleString() : '0`';

  // 공통 CSS 클래스
  const flexClass = 'flex items-center mb-2 text-sm';
  const labelClass = "w-28 text-center pr-4 font-semibold";
  const inputClass = "flex-1 px-2 py-1 border rounded w-full";
  const sinputClass = "flex-1 border rounded ";
  const selectClass = 'px-2 py-1 w-full';

  // 렌더링 부분
  useEffect(() => {
    // setSelectedMenu("전산상세보기");
    ipcheck();
    // console.log(asdetail);
  }, []);

  useEffect(() => {
    assetdetail();
    ashistory();
  }, [num]);

  useEffect(() => {
    // if (asdetail.price && !isNaN(Number(asdetail.price))) {
    //   setPrice(asdetail.price.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    // }
  }, [asdetail]);

  // Axios 요청부분
  const assetdetail  = async () => {
    // alert('요청page'+page);
    await api
      .get("/asset/detail", {
        params: {ano: num}
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setAsdetail(response.data);
        // 원단위 표현
        // setPrice(response.data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      })
      .catch((err) => {
        alert(err);
      });
  }

  // 자산 히스토리도 같이요청
  const ashistory  = async () => {
    // alert('요청page'+page);
    await api
      .get("/asset/detailhistory", {
        params: {ano: num}
      })
      .then((response) => {
        // console.log(response.data);
        // object 에서 array로 만들기
        let data = response.data;
        // console.log(response.data);
        // console.log(data);

        if (data === null || data === undefined || data === '') {
          data = null;
          console.log('변환안하는곳도달');
        } else if (data !== null && data !== undefined && !Array.isArray(data)) {
          data = [data];
          console.log('변환도달');
        }

        // console.log(data);

        setAsdetailhistory(data);
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
  await api
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
    // console.log('1/2 도달');
    if (key === 'price' || key === 'iyear' || key === 'myear') {
      let rawValue = '';
      // console.log('value값 : ' + value);
      if (key === 'price') {
        rawValue = value.replace(/[^\d]/g, '');
        // console.log('2/2 도달');
        // console.log('rawValue값 : ' + rawValue);
        setAsdetail((prev) => ({ ...prev, [key]: rawValue }));
      }
      if (/^\d*$/.test(value)) {
        setAsdetail((prev) => ({ ...prev, [key]: value }));
      }
    } else {
      setAsdetail((prev) => ({ ...prev, [key]: value }));
    }

    // console.log(value);
  }

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  return (
    <>
      {asdetail && 
      (
        <div className="max-sm:p-1 p-6 bg-white shadow-md rounded-lg">
          <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-2">

            <div className={flexClass}>
              <label className={labelClass}>자산번호</label>
              <div className={inputClass}>{num}</div>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>자산분류코드</label>
              <div className={sinputClass}>
                <select className={selectClass} onChange={(e) => handleAsdetail('itemdcd', e.target.value)} value={asdetail.itemdcd}>
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
                {/* <span className="align-middle justify-center items-center px-2 text-2xl text-gray-500">{asdetail.item4cd}</span> */}
              </div>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>자산명</label>
              <input name="anm" maxLength="50" className={inputClass} onChange={(e) => handleAsdetail('anm', e.target.value)} value={asdetail.anm} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>제품코드</label>
              <input maxLength="50" className={inputClass} onChange={(e) => handleAsdetail('acdid', e.target.value)} value={asdetail.acdid}/>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>제조사</label>
              <input name="mcorp" maxLength="20" className={inputClass} onChange={(e) => handleAsdetail('mcorp', e.target.value)} value={asdetail.mcorp}/>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>제조년월</label>
              <input name="myear" maxLength="8" className={inputClass} onChange={(e) => handleAsdetail('myear', e.target.value)} value={asdetail.myear} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>자산상태</label>
              <select name="astate" className={inputClass} onChange={(e) => handleAsdetail('astate', e.target.value)} value={asdetail.astate} >
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
              <select className={inputClass} onChange={(e) => handleAsdetail('acorpcd', e.target.value)} value={asdetail.acorpcd}>
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
              <label className={labelClass}>설치장소</label>
              <select name="aplace" className={inputClass} onChange={(e) => handleAsdetail('aplace', e.target.value)} value={asdetail.aplace} >
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

            <div className={flexClass}>
              <label className={labelClass}>귀속부서</label>
              <input name="apart" maxLength="20" className={inputClass} onChange={(e) => handleAsdetail('apart', e.target.value)} value={asdetail.apart} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>사용자</label>
              <input name="auser" maxLength="20" className={inputClass} onChange={(e) => handleAsdetail('auser', e.target.value)} value={asdetail.auser} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>성능</label>
              <input name="spec" maxLength="200" className={inputClass} onChange={(e) => handleAsdetail('spec', e.target.value)} value={asdetail.spec} />
            </div>

            {[1, 2, 3].map((numb) => (
              <div key={numb} className='flex md:col-span-2 items-center mb-2 text-sm'>
                <label className={labelClass}>속성{numb}</label>
                <input name={`attr${numb}`} maxLength="200" className={inputClass} onChange={(e) => handleAsdetail(`attr${numb}`, e.target.value)} value={asdetail[`attr${numb}`]} />
              </div>
            ))}

            {[4, 5].map((numb) => (
              <div key={numb} className={flexClass}>
                <label className={labelClass}>속성{numb}</label>
                <input name={`attr${numb}`} maxLength="200" className={inputClass} onChange={(e) => handleAsdetail(`attr${numb}`, e.target.value)} value={asdetail[`attr${numb}`]} />
              </div>
            ))}

            <div className={flexClass}>
              <label className={labelClass}>취득가액</label>
              <div className={sinputClass}>
                <input maxLength="20" className={selectClass} onChange={(e) => handleAsdetail('price', e.target.value)} value={price} />
                {/* <span className="ml-2 text-gray-500 text-right">원</span> */}
              </div>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>설치일자</label>
              <input name="iyear" maxLength="8" className={inputClass} onChange={(e) => handleAsdetail('iyear', e.target.value)} value={asdetail.iyear}/>
              {/* <span className="text-sm text-gray-500">예: 20250525</span> */}
            </div>
          </div>

          <div className={flexClass}>
              <label className="w-full pt-10 inline-flex items-center text-center align-middle ">
                <input type="checkbox" className="mr-2" onChange={(e) => handleAsdetail('update', e.target.checked)}/>
                <span>체크 시 자산이력 등록</span>
              </label>
            </div>

          <div className="flex flex-wrap justify-between mt-8 gap-4">
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={assetmodify} >저장</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600" onClick={onClose}>닫기</button>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" onClick={handleModal}>이력조회</button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={handleModal}
            contentLabel="Example Modal"
          >
            <AssetHistorymodal detailhistory={asdetailhistory} modalclose={handleModal} />
          </Modal>
        </div>
      )}
    </>
  );
}

export default AssetModify;
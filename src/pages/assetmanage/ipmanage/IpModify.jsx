import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/api";
import { GlobalContext } from "../../util/GlobalContext";

const IpModify = () => {
  // 변수 선언
  const { selectedMenu, setSelectedMenu, ipSearch, setIpSearch } = useContext(GlobalContext);
  const { onClose } = useOutletContext();
  const navigate = useNavigate();
  const {num} = useParams();
  const [ipdetail, setipdetail] = useState();

  // 공통 CSS 클래스
  const flexClass = 'flex items-center mb-2 text-sm';
  const labelClass = "w-28 text-center pr-4 font-semibold";
  const inputClass = "flex-1 px-2 py-1 border rounded w-full";
  const sinputClass = "flex-1 border rounded ";
  const selectClass = 'px-2 py-1 w-full';

  // 렌더링 부분
  useEffect(() => {
    setSelectedMenu("IP상세보기");
    ipcheck();
  }, []);

  useEffect(() => {
    ipmodifyDetail();
  }, [num]);

  useEffect(() => {
  }, [ipdetail]);

  // Axios 요청부분
  const ipmodifyDetail  = async () => {
    // alert('요청page'+page);
    await api
      .get("/ip/detail", {
        params: {seq: num}
      })
      .then((response) => {
        setipdetail(response.data);
        // console.log(response.data);
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
        handleIpdetail('regip', userIp);
      })
      .catch(error => {
        console.error("IP 가져오기 실패:", error);
      });
  }

  // 업데이트등록
  const ipmodify  = async () => {
  await api
    .post("/ip/modify",
      ipdetail
    )
    .then((response) => {
      // console.log(response.data);
      Swal.fire({ title: "수정완료 되었습니다", icon: "success", draggable: true });
      navigate('/main/ip');
    })
    .catch((err) => {
      alert(err);
    });
  }

  // 함수 부분
  const handleIpdetail = (key, value) =>{
    // console.log(key);
    // console.log(value);
    setipdetail((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
    {ipdetail && 
      (
        <div className="max-sm:p-1 p-6 bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-1 gap-2">

            <div className={flexClass}>
              <label className={labelClass}>IP</label>
              <div className={inputClass}>{ipdetail.ipaddr}</div>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>사용유무</label>
              <select className={inputClass} onChange={(e) => handleIpdetail('ipyn', e.target.value)} value={ipdetail.ipyn} >
                <option value="">전체</option>
                <option value="Y">사용중</option>
                <option value="N">사용가능</option>
              </select>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>위치</label>
              <select name="aplace" className={inputClass} onChange={(e) => handleIpdetail('deptnm', e.target.value)} value={ipdetail.deptnm} >
                <option value="">전체</option>
                <option value="3.5층">3.5층 [150.1.2.130 ~]</option>
                {/* <option value="예약실">예약실 [150.1.2.130 ~]</option> */}
                <option value="골드CC">골드CC [150.1.3.130 ~]</option>
                <option value="코리아CC">코리아CC [150.1.4.130 ~]</option>
                <option value="퍼블릭CC">퍼블릭CC [150.1.5.130 ~]</option>
                <option value="콘도">콘도 [150.1.6.130 ~]</option>
                <option value="강화도">강화도 [192.168.20.130 ~]</option>
                <option value="전산실">전산실 [150.1.1.1 ~]</option>
              </select>
            </div>

            <div className={flexClass}>
              <label className={labelClass}>사용자</label>
              <input name="auser" maxLength="20" className={inputClass} onChange={(e) => handleIpdetail('usernm', e.target.value)} value={ipdetail.usernm} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>공인/사내IP</label>
              <input name="apart" maxLength="20" className={inputClass} onChange={(e) => handleIpdetail('pubipaddr', e.target.value)} value={ipdetail.pubipaddr} />
            </div>

            <div className={flexClass}>
              <label className={labelClass}>기타</label>
              <input name="spec" maxLength="200" className={inputClass} onChange={(e) => handleIpdetail('etc', e.target.value)} value={ipdetail.etc} />
            </div>

            <div className="flex flex-wrap justify-between mt-8 gap-4">
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={ipmodify} >저장</button>
                <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600" onClick={onClose}>닫기</button>
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">삭제</button>
            </div>
          </div>
        </div>
      )
    }

    </>
  );
}

export default IpModify;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const AssetModify = () => {
  const {num} = useParams();

  useEffect(() => {
    console.log(num);
  }, []);

  return (
    <>
      <table>
        <tbody>
        <tr>
          <td>자산분류코드</td>
          <td>
            <select name="itemdcd">
              <option value="PC" selected>PC</option>
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
            <span>
              해당하는번호 출력
            </span>
          </td>
        </tr>
        <tr>
          <td>자산번호</td>
          <td>
            {num}
          </td>
        </tr>
        <tr>
          <td>
            자산코드
          </td>
          <td>
            <input name="acdid" value="" maxLength="50" size="30" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            자산명
          </td>
          <td>
            <input name="anm" value="" maxLength="25" size="25" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            제조사
          </td>
          <td>
            <input name="mcorp" value="" maxLength="10" size="10" id="inputfont"/>
          </td>
        </tr>
        <tr>
          <td>
            제조년월
          </td>
          <td>
            <input name="myear" value="" maxLength="8" size="8" id="inputfont" /> 
          </td>
        </tr>
        <tr>
          <td>
            자산상태
          </td>
          <td>
            <select name="astate">
              <option value="사용중">사용중</option>
              <option value="보유">보유</option>
              <option value="폐기">폐기</option>
              <option value="분출">분출</option>
              <option value="A/S">A/S</option>
              <option value="분실">분실</option>                   
              <option value="만료">만료</option>
            </select>
          </td> 
        </tr>
        <tr>
          <td>
            회사
          </td>
          <td>
            <select name="acorpcd">
              <option value="(주)유성 본점">(주)유성 본점</option>
              <option value="기흥관광개발(주)">기흥관광개발(주)</option>
              <option value="뉴경기관광(주)">뉴경기관광(주)</option>
              <option value="(주)지에이코리아">(주)지에이코리아</option>
              <option value="주식회사 지엠씨">주식회사 지엠씨</option>
              <option value="(주)강호개발">(주)강호개발</option>
              <option value="와이에스인베스트먼트(주)">와이에스인베스트먼트(주)</option>
              <option value="영농회사법인 그린팜주식회사">영농회사법인 그린팜주식회사</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            설치장소
          </td>
          <td>
            <select name="aplace">
              <option value="">전체</option>
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
          </td>
        </tr>
        <tr>
          <td>
            귀속부서
          </td>
          <td>
            <input name="apart" value="" maxLength="15" size="15" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            사용자
          </td>
          <td>
            <input name="auser" value="" maxLength="15" size="15" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            성능
          </td>
          <td>
            <input name="spec" value="CPU: / RAM: / VGA: / SSD: / HDD:" maxLength="100" size="75" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            속성1
          </td>
          <td>
            <input name="attr1" value="" maxLength="50" size="50" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            속성2
          </td>
          <td>
            <input name="attr2" value="" maxLength="50" size="50" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            속성3
          </td>
          <td>
            <input name="attr3" value="" maxLength="50" size="50" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            속성4
          </td>
          <td>
            <input name="attr4" value="" maxLength="50" size="50" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            속성5
          </td>
          <td>
            <input name="attr5" value="" maxLength="50" size="50" id="inputfont" />
          </td>
        </tr>
        <tr>
          <td>
            취득가액
          </td>
          <td>
            취득가액 고정된값으로 출력 변경시 DB 변경
          </td>
        </tr>
        <tr>
          <td>
            설치일자
          </td>
          <td>
            <input name="iyear" value="" maxLength="8" size="8" id="inputfont" /> 
            <span>ex)20250525</span> 
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" /> 체크 시 자산이력 등록
          </td>
        </tr>
        </tbody>
      </table>

      <div>
        <div>
          <button>저장</button>
          <button>목록</button>
        </div>
        <button>이력조회</button>
      </div>
    </>
  );
}

export default AssetModify;
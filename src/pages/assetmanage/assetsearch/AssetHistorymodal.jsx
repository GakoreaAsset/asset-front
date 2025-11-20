import { useEffect } from "react";

const AssetHistoryModal = ({detailhistory, modalclose}) => {
  // 변수 선언

  // 렌더링 부분
  useEffect(() => {
  }, []);


  // 함수 부분

  return (
    <div>
      {detailhistory !== "[]" ?
        <table className="min-w-full border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-xs text-gray-700 border-t border-b">
              <th className="px-2 py-2 text-center">순번</th>
              <th className="px-2 py-2 text-center">제품코드</th>
              {/* <th className="px-2 py-2 text-center">자산명칭</th> */}
              <th className="px-2 py-2 text-center">제조년월</th>
              <th className="px-2 py-2 text-center">회사</th>
              <th className="px-2 py-2 text-center">설치장소</th>
              <th className="px-2 py-2 text-center">부서</th>
              <th className="px-2 py-2 text-center">사용자</th>
              <th className="px-2 py-2 text-center">설치일자</th>
              <th className="px-2 py-2 text-center">상태</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {detailhistory.map((data, i) => (
              <tr key={i} className="hover:bg-blue-50 border-b text-center">
                <td className="px-2 py-2">{data.seq}</td>
                <td className="px-2 py-2">{data.item4nm}</td>
                {/* <td className="px-2 py-2">{data.anm}</td> */}
                <td className="px-2 py-2">{data.iyear}</td>
                <td className="px-2 py-2">{data.conm}</td>
                <td className="px-2 py-2">{data.aplace}</td>
                <td className="px-2 py-2">{data.apart}</td>
                <td className="px-2 py-2">{data.auser}</td>
                <td className="px-2 py-2">{data.myear}</td>
                <td className="px-2 py-2">{data.statnm}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 border-t">
              <td colSpan='9' className='text-center py-5'>
                <div>
                  <button onClick={modalclose} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded">닫기</button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        :
        <div>자산이력이 없습니다.</div>
      }
    </div>
  );
}

export default AssetHistoryModal;
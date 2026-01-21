import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../util/GlobalContext";
import api from "../api/api";

const EmpUse = () => {
  // 변수 선언
  const {selectedMenu, setSelectedMenu } = useContext(GlobalContext);
  const [mealSearch, setMealSearch] = useState({searchDay : "", eName : "", eId : "", eGroup : ""});

  // 렌더링 부분
  useEffect(() => {
    setSelectedMenu('식수관리-월별사원사용내역');
  }, []);

  // Axios 요청
  const checkempuse = async () => {
    await api
      .post("/meal/checkempuse", {
        itemdcd : mealSearch.itemdcd, 
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div>

    </div>
  );
}

export default EmpUse;
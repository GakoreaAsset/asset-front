import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";

// 실제 context 값을 제공하는 Provider 컴포넌트
export const GlobalProvider = ({ children }) => {

  // 여러 개의 전역 상태 선언
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [asSearch, setAsSearch] = useState({itemdcd : "", acorpcd : "", aplace : "", astate : "01", searchtitle : "auser", searchbody: ""});
  
  return (
    <GlobalContext.Provider
      value={{
        selectedMenu,
        setSelectedMenu,
        asSearch,
        setAsSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

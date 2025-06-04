import { createContext } from "react";

export const GlobalContext = createContext({
  selectedMenu: "",
  setSelectedMenu: () => {},

  asSearch: {},
  setAsSearch: () => {},


});

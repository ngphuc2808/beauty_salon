import { FC, ReactNode, createContext, useContext, useState } from "react";

export type GlobalContent = {
  selectMainComponent: string;
  setSelectMainComponent: (component: string) => void;
  selectTable: string;
  setSelectTable: (component: string) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  selectMainComponent: "",
  setSelectMainComponent: () => {},
  selectTable: "",
  setSelectTable: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selectMainComponent, setSelectMainComponent] =
    useState<string>("table");
  const [selectTable, setSelectTable] = useState<string>("tableCategoryLevel1");

  return (
    <GlobalContext.Provider
      value={{
        selectMainComponent,
        setSelectMainComponent,
        selectTable,
        setSelectTable,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

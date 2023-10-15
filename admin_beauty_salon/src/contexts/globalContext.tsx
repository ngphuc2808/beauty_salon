import { FC, ReactNode, createContext, useContext, useState } from "react";

export type GlobalContent = {
  selectMainComponent: string;
  setSelectMainComponent: (component: string) => void;
  selectChildComponent: string;
  setSelectChildComponent: (component: string) => void;
  selectTable: string;
  setSelectTable: (component: string) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  selectMainComponent: "",
  setSelectMainComponent: () => {},
  selectChildComponent: "",
  setSelectChildComponent: () => {},
  selectTable: "",
  setSelectTable: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selectMainComponent, setSelectMainComponent] = useState<string>(
    "navigationComponent"
  );
  const [selectChildComponent, setSelectChildComponent] =
    useState<string>("table");
  const [selectTable, setSelectTable] = useState<string>("tableCategoryLevel1");

  return (
    <GlobalContext.Provider
      value={{
        selectMainComponent,
        setSelectMainComponent,
        selectChildComponent,
        setSelectChildComponent,
        selectTable,
        setSelectTable,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

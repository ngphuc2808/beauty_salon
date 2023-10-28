import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

export type GlobalContent = {
  projectData: iContentInPosts;
  setProjectData: (ProjectData: iContentInPosts) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  projectData: {
    projectData: "",
    html: "",
    css: "",
  },
  setProjectData: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: Props) => {
  const [projectData, setProjectData] = useState<iContentInPosts>({
    projectData: "",
    html: "",
    css: "",
  });
  return (
    <GlobalContext.Provider
      value={{
        projectData,
        setProjectData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

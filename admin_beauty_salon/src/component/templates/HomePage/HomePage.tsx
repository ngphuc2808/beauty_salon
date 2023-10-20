import { useContext, useEffect } from "react";

import MainLayout from "@/component/layouts/MainLayout";
import { GlobalContext } from "@/contexts/globalContext";
import { listComponent } from "@/helpers/listComponent";

type Props = {
  path: string;
};

const HomePage = ({ path }: Props) => {
  const { selectMainComponent, setSelectMainComponent } =
    useContext(GlobalContext);

  useEffect(() => {
    if (path) {
      setSelectMainComponent(path);
      return;
    }
  }, []);

  return (
    <MainLayout>
      {selectMainComponent && listComponent[path || selectMainComponent]}
    </MainLayout>
  );
};

export default HomePage;

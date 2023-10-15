import { Fragment, useContext } from "react";

import { GlobalContext } from "@/contexts/globalContext";
import { listComponent } from "@/helpers/listComponent";

const Auth = () => {
  const { selectChildComponent } = useContext(GlobalContext);
  return (
    <Fragment>
      {selectChildComponent && listComponent[selectChildComponent]}
    </Fragment>
  );
};

export default Auth;

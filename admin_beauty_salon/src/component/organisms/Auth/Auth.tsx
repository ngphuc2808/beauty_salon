import { Fragment, useContext } from "react";

import { GlobalContext } from "@/contexts/globalContext";
import { listComponent } from "@/helpers/listComponent";
import EditUserAccount from "@/component/molecules/EditUserAccount";

const Auth = () => {
  const { selectChildComponent } = useContext(GlobalContext);
  return (
    <Fragment>
      <EditUserAccount />
      {/* {selectChildComponent && listComponent[selectChildComponent]} */}
    </Fragment>
  );
};

export default Auth;

import { Fragment } from "react";
import { useSelector } from "react-redux";

import ListAccount from "@/component/molecules/ListAccount";
import AddAccount from "@/component/molecules/AddAccount";
import EditUserAccount from "@/component/molecules/EditUserAccount";
import EditMyAccount from "@/component/molecules/EditMyAccount";

const Auth = () => {
  const result = useSelector(
    (state: {
      authComponent: {
        addAccount: boolean;
        listAccount: boolean;
        editUserAccount: boolean;
        editMyAccount: boolean;
      };
    }) => state.authComponent
  );

  return (
    <Fragment>
      {result.addAccount && <AddAccount />}
      {result.listAccount && <ListAccount />}
      {result.editUserAccount && <EditUserAccount />}
      {result.editMyAccount && <EditMyAccount />}
    </Fragment>
  );
};

export default Auth;

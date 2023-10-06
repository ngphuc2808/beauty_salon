import { Fragment, useState } from "react";

import styles from "./Auth.module.css";

import Search from "@/component/molecules/Search";
import ListAccount from "@/component/molecules/ListAccount";
import EditAccount from "@/component/molecules/EditAccount";
import AddAccount from "@/component/molecules/AddAccount";

const Auth = () => {
  const [addAccount, setAddAccount] = useState(false);
  const [listAccount, setListAccount] = useState(false);
  const [editAccount, setEditAccount] = useState(false);

  const [editMyAccount, setEditMyAccount] = useState(true);

  const handleAddAccount = () => {
    setAddAccount(true);
    setListAccount(false);
    setEditAccount(false);
  };

  const handleListAccount = () => {
    setAddAccount(false);
    setListAccount(true);
    setEditAccount(false);
  };

  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        {!editAccount ||
          (!editMyAccount && (
            <h1 className="lg:text-xl md:text-base ml-5 text-textHeadingColor">
              Xác thực và ủy quyền
            </h1>
          ))}
        {(editAccount || editMyAccount) && (
          <div className="flex items-center gap-3">
            {!editMyAccount && (
              <i
                className={`${styles.customIconBack} ri-arrow-left-line`}
                onClick={() => setEditAccount(false)}
              ></i>
            )}
            <h1
              className={`lg:text-xl md:text-base text-textHeadingColor ${
                editMyAccount ? "ml-5" : "ml-0"
              }`}
            >
              Chỉnh sửa {editMyAccount ? "thông tin cá nhân" : "Nguyễn Văn A"}
            </h1>
          </div>
        )}
        {!addAccount && !editAccount && !editMyAccount && (
          <Search category={""} />
        )}
        {!editAccount && !editMyAccount && (
          <div className="w-full lg:w-auto flex items-center gap-3 mr-5 ml-5 lg:ml-0 mt-4 lg:mt-0 flex-col lg:flex-row">
            <button
              className={`${styles.buttonAddAccount}`}
              onClick={handleAddAccount}
            >
              Thêm tài khoản
            </button>
            <button
              className={`${styles.buttonAddAccount}`}
              onClick={handleListAccount}
            >
              Danh sách tài khoản
            </button>
          </div>
        )}
        {(editAccount || editMyAccount) && (
          <button className={`${styles.buttonSaveAccount}`}>Lưu cài đặt</button>
        )}{" "}
      </div>
      {listAccount && !editAccount && (
        <ListAccount
          editAccount={editAccount}
          setEditAccount={setEditAccount}
        />
      )}
      {addAccount && <AddAccount />}
      {editAccount && <EditAccount superAdmin={false} />}
      {editMyAccount && <EditAccount superAdmin={true} />}
    </Fragment>
  );
};

export default Auth;

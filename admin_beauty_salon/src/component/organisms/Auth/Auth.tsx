import { Fragment } from "react";

import styles from "./Auth.module.css";

import Search from "@/component/molecules/Search";
import ListAccount from "@/component/molecules/ListAccount";
import EditAccount from "@/component/molecules/EditAccount";

const Auth = () => {
  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <h1 className="lg:text-xl md:text-base lg:ml-5 md:ml-3 ml-5 text-textHeadingColor">
          Xác thực và ủy quyền
        </h1>
        {/* <div className="flex items-center gap-3">
          <i className={`${styles.customIconBack} ri-arrow-left-line`}></i>
          <h1 className="lg:text-xl md:text-base text-textHeadingColor">
            Chỉnh sửa Nguyễn Văn A
          </h1>
        </div> */}
        <Search category={""} />
        <button className={`${styles.buttonAddAccount}`}>Thêm tài khoản</button>
        {/* <button className={`${styles.buttonSaveAccount}`}>Lưu cài đặt</button> */}
      </div>
      {/* <ListAccount /> */}
      <EditAccount />
    </Fragment>
  );
};

export default Auth;

import { Fragment } from "react";

import styles from "./CreatePost.module.css";

const CreatePost = () => {
  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <div className={`${styles.descriptionDashBoard}`}>
          <i className={`${styles.customIconBack} ri-arrow-left-line`}></i>
          <h1 className={`${styles.titleDashBoard}`}>Đăng bài</h1>
        </div>
      </div>
      <div className={`${styles.content}`}></div>
    </Fragment>
  );
};

export default CreatePost;

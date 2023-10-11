import { Fragment } from "react";

import CreatePost from "@/component/molecules/CreatePost";
import DetailCategory from "@/component/molecules/DetailCategory";
import Table from "@/component/molecules/Table";

const Navigation = ({ category }: iCategory) => {
  return (
    <Fragment>
      {/* <DetailCategory /> */}
      {/* <Table category={category} /> */}
      <CreatePost />
    </Fragment>
  );
};

export default Navigation;

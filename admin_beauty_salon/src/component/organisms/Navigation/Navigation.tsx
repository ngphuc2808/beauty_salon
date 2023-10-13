import { Fragment } from "react";
import { useSelector } from "react-redux";

import CreatePost from "@/component/molecules/CreatePost";
import DetailCategory from "@/component/molecules/DetailCategory";
import Table from "@/component/molecules/Table";

const Navigation = ({ category }: iCategory) => {
  const result = useSelector(
    (state: {
      navComponent: {
        table: boolean;
        detailCategory: boolean;
        createPost: boolean;
      };
    }) => state.navComponent
  );
  return (
    <Fragment>
      {result.detailCategory && <DetailCategory />}
      {result.table && <Table category={category} />}
      {result.createPost && <CreatePost />}
    </Fragment>
  );
};

export default Navigation;

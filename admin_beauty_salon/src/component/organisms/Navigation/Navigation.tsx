import { useState, Fragment } from "react";

import Modal from "@/component/molecules/Modal";
import CreatePost from "@/component/molecules/CreatePost";
import DetailCategory from "@/component/molecules/DetailCategory";
import Table from "@/component/molecules/Table";

const Navigation = ({ category }: iCategory) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Fragment>
      {/* <DetailCategory /> */}
      {/* <Table category={category} /> */}
      <CreatePost />
      {openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} />}
    </Fragment>
  );
};

export default Navigation;

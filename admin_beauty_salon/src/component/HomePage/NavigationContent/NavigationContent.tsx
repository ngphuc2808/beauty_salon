import { useState, Fragment } from "react";
import Modal from "../Modal";
import DetailCategory from "./DetailCategory";

const NavigationContent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Fragment>
      <DetailCategory />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </Fragment>
  );
};

export default NavigationContent;

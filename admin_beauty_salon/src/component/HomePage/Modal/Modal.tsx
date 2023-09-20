import { Fragment } from "react";
const Modal = ({ openModal, setOpenModal }: any) => {
  return (
    <Fragment>
      <div
        className={`${
          openModal ? "block" : "hidden"
        } fixed inset-0 bg-gray-500 bg-opacity-40 z-50`}
      ></div>
      <div
        className={`${
          openModal ? "scale-100" : "scale-0"
        } flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50 transition ease-in duration-200`}
      >
        <div
          className={`relative w-full max-w-[90%] sm:max-w-md max-h-full z-20`}
        >
          <div className="relative bg-white rounded-md shadow">
            <i
              className="ri-close-line absolute right-4 top-2 text-2xl hover:text-red-500 cursor-pointer ease-in duration-200"
              onClick={() => setOpenModal(!openModal)}
            ></i>
            <div className="p-8 text-center">
              <div className="mb-5">
                <h3 className="mb-1 font-normal text-textHeadingColor">
                  Xóa danh mục này?
                </h3>
                <p className="text-sm text-textPrimaryColor">
                  Danh mục bị xóa không thể hoàn tác
                </p>
              </div>
              <hr />
              <div className="mt-5">
                <button
                  type="button"
                  className="min-w-[105px] text-white bg-red-500 hover:bg-red-600 font-medium rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 ease-in duration-200"
                >
                  Xác nhận
                </button>
                <button
                  type="button"
                  className="min-w-[105px] text-gray-500 bg-white hover:bg-gray-100 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ease-in duration-200"
                  onClick={() => setOpenModal(!openModal)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;

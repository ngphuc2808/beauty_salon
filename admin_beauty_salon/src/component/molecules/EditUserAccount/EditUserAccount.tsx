import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./EditUserAccount.module.css";
import { setListAccount } from "@/features/redux/slices/componentUI/authComponentSlice";
import CropImage from "../CropImage";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const EditUserAccount = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: { editUser: { info: iUserInfo } }) => state.editUser
  );

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>(data.info.avatar || "");
  const [file, setFile] = useState<File>();
  const [fileImage, setFileImage] = useState<any>();

  const handleCrop = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget;
    if (input.files?.length) {
      const file = input.files[0];
      if (!file.type.match(imageMimeType)) {
        toast.error("Vui lòng chọn đúng định dạng hình ảnh!");
        return;
      }
      setFile(file);
    }
    e.currentTarget.value = "";
  };
  useEffect(() => {
    let reader: FileReader,
      isCancel: boolean = false;
    if (file) {
      reader = new FileReader();
      reader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setCropImage(result);
          setModalCrop(true);
        }
      };
      reader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (reader && reader.readyState === 2) {
        reader.abort();
        reader.onload = null;
      }
    };
  }, [file]);

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    oldPassword: "",
    fullName: data.info.fullName,
    email: data.info.email,
    phone: data.info.phone,
    avatar: "",
    role: data.info.role,
    status: data.info.status,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleUpdateInfo = async () => {
    const data = formValue;
    data.status = Boolean(Number(formValue.status));

    console.log(data);
  };

  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <div className="flex items-center gap-3">
          <i
            className={`${styles.customIconBack} ri-arrow-left-line`}
            onClick={() => dispatch(setListAccount())}
          ></i>
          <h1 className={`lg:text-xl md:text-base text-textHeadingColor`}>
            Chỉnh sửa {data.info.fullName}
          </h1>
        </div>

        <button
          className={`${styles.buttonSaveAccount}`}
          onClick={handleUpdateInfo}
        >
          Lưu cài đặt
        </button>
      </div>
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-12 lg:col-span-8 order-2 lg:order-none">
          <div className="bg-white shadow rounded-lg p-5">
            <form>
              <div className="mb-5">
                <label htmlFor="username" className={`${styles.label}`}>
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formValue.username}
                  onChange={handleInput}
                  className={`${styles.input}`}
                  placeholder="Tài khoản"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="name" className={`${styles.label}`}>
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  value={formValue.fullName}
                  onChange={handleInput}
                  className={`${styles.input}`}
                  placeholder="Họ và tên"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className={`${styles.label}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleInput}
                  className={`${styles.input}`}
                  placeholder="Email"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="phone" className={`${styles.label}`}>
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formValue.phone}
                  onChange={handleInput}
                  className={`${styles.input}`}
                  placeholder="Số điện thoại"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className={`${styles.label}`}>
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formValue.password}
                  autoComplete="on"
                  onChange={handleInput}
                  className={`${styles.input}`}
                  placeholder="Mật khẩu"
                />
              </div>
              <div className="mb-5">
                <h1 className="text-sm text-textHeadingColor mb-2">
                  Trạng thái
                </h1>
                <div className="flex gap-10 items-center">
                  <label
                    htmlFor="statusOn"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      checked={formValue.status ? true : false}
                      id="statusOn"
                      name="status"
                      value={1}
                      onChange={handleInput}
                      className={`${styles.customRadio}`}
                    />
                    Bật
                  </label>
                  <label
                    htmlFor="statusOff"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      checked={!formValue.status ? true : false}
                      id="statusOff"
                      name="status"
                      value={0}
                      onChange={handleInput}
                      className={`${styles.customRadio}`}
                    />
                    Tắt
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <h1 className="text-sm text-textHeadingColor mb-2">
                  Phân quyền
                </h1>
                <div className="flex gap-10 items-center">
                  <label
                    htmlFor="roleAdmin"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      checked={formValue.role === "admin" ? true : false}
                      id="roleAdmin"
                      name="role"
                      value="admin"
                      onChange={handleInput}
                      className={`${styles.customRadio}`}
                    />
                    Quản trị viên
                  </label>
                  <label
                    htmlFor="roleEmployee"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      checked={formValue.role === "employee" ? true : false}
                      id="roleEmployee"
                      name="role"
                      value="employee"
                      onChange={handleInput}
                      className={`${styles.customRadio}`}
                    />
                    Nhân viên
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 [&>*]:mb-5">
          <div className="bg-white shadow rounded-lg p-5 mt-0">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-textHeadingColor">Ảnh đại diện</h1>
              <div className="flex items-center gap-3 text-sm">
                <label
                  htmlFor="dropZone"
                  className="cursor-pointer text-blue-500"
                >
                  Thay thế ảnh
                </label>
                <span
                  className="cursor-pointer text-red-500"
                  onClick={() => setPreviewImg("")}
                >
                  Xóa
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropZone" className={`${styles.labelDropZone}`}>
                <div className={`${styles.dropZone}`}>
                  {previewImg ? (
                    <figure className="w-full h-full">
                      <img
                        className="max-h-full max-w-full"
                        src={previewImg}
                        alt="image"
                      />
                    </figure>
                  ) : (
                    <>
                      <i className="ri-upload-cloud-2-line mb-1 text-4xl text-textPrimaryColor"></i>
                      <p className="mb-2 text-sm text-textPrimaryColor">
                        <span className="font-semibold">
                          Bấm hoặc kéo thả để chọn ảnh của bạn
                        </span>
                      </p>
                      <p className="text-xs text-textPrimaryColor">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="dropZone"
                  type="file"
                  onChange={handleCrop}
                  accept=".png, .jpg, .jpeg"
                  hidden
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      {modalCrop && (
        <CropImage
          image={cropImage}
          setModalCrop={setModalCrop}
          setFileImage={setFileImage}
          setPreviewImg={setPreviewImg}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        bodyClassName={`${styles.toastBody}`}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default EditUserAccount;

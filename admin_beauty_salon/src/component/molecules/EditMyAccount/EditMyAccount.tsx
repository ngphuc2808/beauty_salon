import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./EditMyAccount.module.css";
import CropImage from "../CropImage";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const EditMyAccount = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: { user: { info: iUserInfo } }) => state.user
  );

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>(data.info.avatar || "");
  const [file, setFile] = useState<File>();
  const [fileImage, setFileImage] = useState<any>();
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

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImg);
    };
  }, [previewImg]);

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
          <h1 className={`lg:text-xl md:text-base text-textHeadingColor ml-5`}>
            Chỉnh sửa thông tin cá nhân
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
                <label htmlFor="oldPassword" className={`${styles.label}`}>
                  Mật khẩu cũ
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formValue.oldPassword}
                  autoComplete="on"
                  onChange={handleInput}
                  className={`${styles.input}`}
                  placeholder="Mật khẩu"
                />
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

export default EditMyAccount;

import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CropImage from "../CropImage";

import { AuthApi } from "@/services/api/auth";

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

  const [emptyOldPassword, setEmptyOldPassword] = useState<boolean>(true);

  useEffect(() => {
    if (formValue.oldPassword.trim().length > 0) setEmptyOldPassword(true);
  }, [formValue]);

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
    if (formValue.oldPassword.trim().length === 0) setEmptyOldPassword(false);
    else setEmptyOldPassword(true);

    try {
      if (formValue.oldPassword.trim().length > 0) {
        const result = await AuthApi.updateAccount(data.info.slug, formValue);
        if (result) {
          console.log(result);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap lg:flex-nowrap">
        <div className="flex items-center gap-3">
          <h1 className="lg:text-xl md:text-base text-textHeadingColor ml-5">
            Chỉnh sửa thông tin cá nhân
          </h1>
        </div>

        <button
          className="lg:text-base md:text-sm w-full sm:w-max mx-5 mt-4 sm:mt-0 bg-red-500 rounded-md hover:bg-red-600 text-white px-3 py-2"
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
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-normal"
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formValue.username}
                  onChange={handleInput}
                  className="border text-sm outline-none rounded-md block w-full p-2.5"
                  placeholder="Tài khoản"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-normal"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  value={formValue.fullName}
                  onChange={handleInput}
                  className="border text-sm outline-none rounded-md block w-full p-2.5"
                  placeholder="Họ và tên"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-normal"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleInput}
                  className="border text-sm outline-none rounded-md block w-full p-2.5"
                  placeholder="Email"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-normal"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formValue.phone}
                  onChange={handleInput}
                  className="border text-sm outline-none rounded-md block w-full p-2.5"
                  placeholder="Số điện thoại"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="oldPassword"
                  className={`block mb-2 text-sm font-normal ${
                    !emptyOldPassword ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formValue.oldPassword}
                  autoComplete="on"
                  onChange={handleInput}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    !emptyOldPassword
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Mật khẩu"
                />
                {!emptyOldPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập mật khẩu!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-normal"
                >
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formValue.password}
                  autoComplete="on"
                  onChange={handleInput}
                  className="border text-sm outline-none rounded-md block w-full p-2.5"
                  placeholder="Mật khẩu mới"
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
              <label
                htmlFor="dropZone"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden rounded-lg">
                  {previewImg ? (
                    <figure className="w-full h-full">
                      <img
                        className="max-h-full max-w-full"
                        crossOrigin="anonymous"
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
        bodyClassName="font-beVietnam text-sm"
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

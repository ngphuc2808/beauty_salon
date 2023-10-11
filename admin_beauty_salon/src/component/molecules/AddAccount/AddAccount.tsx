import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./AddAccount.module.css";
import { setListAccount } from "@/features/redux/slices/componentUI/authComponentSlice";
import CropImage from "../CropImage";
import { AuthApi } from "@/services/api/auth";
import { ImageApi } from "@/services/api/image";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const AddAccount = () => {
  const dispatch = useDispatch();

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [fileImage, setFileImage] = useState<any>();
  const [formValue, setFormValue] = useState<iAddAccount>({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    avatar: "",
    role: "employee",
    status: false,
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
          setModalCrop(true);
          setCropImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (reader && reader.readyState === 2) {
        setCropImage("");
        reader.abort();
        reader.onload = null;
      }
    };
  }, [file]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

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

  const uploadFile = async () => {
    const fileAvt = new File([fileImage], "image", {
      type: fileImage,
    });

    const form = new FormData();
    form.append("image", fileAvt);

    const upload = await ImageApi.uploadImage(form);

    return upload;
  };

  const handleAddAccount = async () => {
    const data = formValue;
    data.status = Boolean(Number(formValue.status));

    // try {
    //   const result = await AuthApi.createAccount(data);
    //   if (result) {
    //     toast.success("Thêm tài khoản thành công!");
    //     return;
    //   }
    // } catch (error: any) {
    //   if (error.message === "email đã tồn tại.") {
    //     toast.warning("Email đã tồn tại trong hệ thống!");
    //     return;
    //   }
    //   if (error.message === "phone đã tồn tại.") {
    //     toast.warning("Số điện thoại đã tồn tại trong hệ thống!");
    //     return;
    //   }
    //   if (error.message === "users validation failed: email: Invalid email") {
    //     toast.warning("Sai định dạng email!");
    //     return;
    //   }
    //   if (
    //     error.message === "users validation failed: phone: Invalid phone number"
    //   ) {
    //     toast.warning("Sai định dạng số điện thoại!");
    //     return;
    //   }
    //   if (
    //     error.message ===
    //     "users validation failed: email: Invalid email, phone: Invalid phone number"
    //   ) {
    //     toast.warning("Sai định dạng email và số điện thoại!");
    //     return;
    //   }
    // }
  };

  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <h1 className="lg:text-xl md:text-base ml-5 text-textHeadingColor">
          Xác thực và ủy quyền
        </h1>
        <div className="w-full lg:w-auto flex items-center gap-3 mr-5 ml-5 lg:ml-0 mt-4 lg:mt-0 flex-col lg:flex-row">
          <button
            className={`${styles.buttonListAccount}`}
            onClick={() => {
              dispatch(setListAccount());
            }}
          >
            Danh sách tài khoản
          </button>
        </div>
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
          <div className="mt-5">
            <div className={`${styles.itemLeftContent}`}>
              <div className="flex items-center justify-between">
                <button
                  className={`${styles.customButton} w-[48%] lg:w-[200px] `}
                  onClick={handleAddAccount}
                >
                  Lưu
                </button>
                <button
                  className={`${styles.customButton} w-[48%] lg:w-[200px]`}
                >
                  Thoát
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.rightContent}`}>
          <div className={`${styles.banner}`}>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-textHeadingColor">Ảnh bài viết</h1>
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

export default AddAccount;

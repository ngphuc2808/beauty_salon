import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CropImage from "../CropImage";

import { GlobalContext } from "@/contexts/globalContext";
import { AuthApi } from "@/services/api/auth";
import { ImageApi } from "@/services/api/image";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const AddAccount = () => {
  const { setSelectChildComponent } = useContext(GlobalContext);

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [fileImage, setFileImage] = useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddAccountType>({
    defaultValues: {
      username: "",
      password: "",
      avatar: "",
      fullName: "",
      email: "",
      phone: "",
      role: "",
      status: false,
    },
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

  const uploadFile = async (value: AddAccountType) => {
    const fileAvt = new File(
      [fileImage],
      `image-${value.username}-${Math.floor(Math.random() * 1000)}.${
        fileImage.type.split("/")[1]
      }`,
      {
        type: fileImage.type,
      }
    );
    const formData = new FormData();
    formData.append("image", fileAvt);

    let upload;
    try {
      upload = await ImageApi.uploadImage(formData);
    } catch (error: any) {
      console.log(error);
    }
    return upload;
  };

  const handleAddAccount = async (data: AddAccountType) => {
    try {
      if (fileImage) {
        const avatar = await uploadFile(data);
        setValue("avatar", avatar.results);
      } else {
        setValue("avatar", "");
      }

      const newData = data;
      newData.status = Boolean(Number(data.status));
      await AuthApi.createAccount(newData);
      setPreviewImg("");
      reset();
      toast.success("Thêm tài khoản thành công!");
    } catch (error: any) {
      if (
        error.message ===
        "Tên đăng nhập chỉ chứa các ký tự chữ cái, chữ số, dấu gạch dưới và có độ dài từ 3 đến 30 kí tự."
      ) {
        toast.warning(
          "Tạo account thất bại, vui lòng kiểm tra lại định dạng tài khoản!"
        );
        return;
      }
      if (error.message === "email đã tồn tại.") {
        toast.warning("Email đã tồn tại trong hệ thống!");
        return;
      }
      if (error.message === "phone đã tồn tại.") {
        toast.warning("Số điện thoại đã tồn tại trong hệ thống!");
        return;
      }
      if (error.message === "users validation failed: email: Invalid email") {
        toast.warning("Sai định dạng email!");
        return;
      }
      if (
        error.message === "users validation failed: phone: Invalid phone number"
      ) {
        toast.warning("Sai định dạng số điện thoại!");
        return;
      }
      if (
        error.message ===
        "users validation failed: email: Invalid email, phone: Invalid phone number"
      ) {
        toast.warning("Sai định dạng email và số điện thoại!");
        return;
      }
    }
  };

  return (
    <Fragment>
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap lg:flex-nowrap">
        <h1 className="lg:text-xl md:text-base ml-5 text-textHeadingColor">
          Xác thực và ủy quyền
        </h1>
        <div className="w-full lg:w-auto flex items-center gap-3 mr-5 ml-5 lg:ml-0 mt-4 lg:mt-0 flex-col lg:flex-row">
          <button
            className="w-full lg:w-auto lg:text-base md:text-sm bg-red-500 rounded-md hover:bg-red-600 text-white px-3 py-2"
            onClick={() => {
              setSelectChildComponent("listAccount");
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
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-normal ${
                    errors.username ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: true,
                    minLength: 5,
                    maxLength: 80,
                  })}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.username
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Tài khoản"
                />
                {errors.username?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập tài khoản!
                  </p>
                )}
                {errors.username?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập tối thiểu 5 ký tự!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-normal ${
                    errors.password ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                    maxLength: 80,
                  })}
                  autoComplete="on"
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.password
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập mật khẩu!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className={`block mb-2 text-sm font-normal ${
                    errors.fullName ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("fullName", {
                    required: true,
                    maxLength: 80,
                  })}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.fullName
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Họ và tên"
                />
                {errors.fullName?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập họ và tên!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-normal ${
                    errors.email ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    maxLength: 80,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.email
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white"
                  }`}
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập email!
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập đúng định dạng email!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className={`block mb-2 text-sm font-normal ${
                    errors.phone ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: true,
                    maxLength: 80,
                    pattern:
                      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  })}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.phone
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white"
                  }`}
                  placeholder="Số điện thoại"
                />
                {errors.phone?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập số điện thoại!
                  </p>
                )}
                {errors.phone?.type === "pattern" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập đúng định dạng số điện thoại!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <h1
                  className={`text-sm mb-2 ${
                    errors.status ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Trạng thái
                </h1>
                <div className="flex gap-10 items-center">
                  <label
                    htmlFor="statusOn"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      id="statusOn"
                      {...register("status", {
                        required: true,
                      })}
                      value={1}
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    Bật
                  </label>
                  <label
                    htmlFor="statusOff"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      id="statusOff"
                      {...register("status", {
                        required: true,
                      })}
                      value={0}
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    Tắt
                  </label>
                </div>
                {errors.status?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng chọn trạng thái!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <h1
                  className={`text-sm mb-2 ${
                    errors.role ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Phân quyền
                </h1>
                <div className="flex gap-10 items-center">
                  <label
                    htmlFor="roleAdmin"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      id="roleAdmin"
                      {...register("role", {
                        required: true,
                      })}
                      value="admin"
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    Quản trị viên
                  </label>
                  <label
                    htmlFor="roleEmployee"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      id="roleEmployee"
                      {...register("role", {
                        required: true,
                      })}
                      value="employee"
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    Nhân viên
                  </label>
                </div>
                {errors.role?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng chọn quyền hạn!
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="mt-5">
            <div className="bg-white shadow rounded-lg p-5">
              <div className="flex items-center justify-between">
                <button
                  className="text-textPrimaryColor text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md w-[48%] lg:w-[200px]"
                  onClick={handleSubmit(handleAddAccount)}
                >
                  {isSubmitting ? (
                    <i className="ri-loader-4-line text-2xl animate-spin"></i>
                  ) : (
                    <span>Lưu</span>
                  )}
                </button>
                <button className="text-textPrimaryColor text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md w-[48%] lg:w-[200px]">
                  Thoát
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 [&>*]:mb-5">
          <div className="bg-white shadow rounded-lg p-5 mt-0">
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
              <label
                htmlFor="dropZone"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden rounded-lg">
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
                  {...register("avatar")}
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

export default AddAccount;

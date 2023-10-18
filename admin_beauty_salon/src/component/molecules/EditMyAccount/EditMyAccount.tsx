import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CropImage from "../CropImage";

import { AuthApi } from "@/services/api/auth";
import { ImageApi } from "@/services/api/image";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "@/queries/useQueries";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const EditMyAccount = () => {
  const router = useNavigate();

  const isLogin = JSON.parse(localStorage.getItem("userLogin")!);

  const userInfo = useGetUserInfo(isLogin.session);

  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [fileImage, setFileImage] = useState<Blob>(new Blob());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditAccountType>({});

  useEffect(() => {
    if (!userInfo.isLoading) {
      reset({
        fullName: userInfo.data.results.fullName,
        email: userInfo.data.results.email,
        phone: userInfo.data.results.phone,
        avatar: userInfo.data.results.avatar,
      });
      setPreviewImg(userInfo.data.results.avatar);
    }
  }, [userInfo.isLoading]);

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

  const uploadFile = async (value: EditAccountType) => {
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
    } catch (error) {
      console.log(error);
    }
    return upload;
  };

  const handleUpdateInfo = async (value: EditAccountType) => {
    try {
      const newValue = value;
      if (fileImage.size !== 0) {
        const avatar = await uploadFile(value);
        newValue.avatar = avatar.results;
      } else {
        newValue.avatar = "";
      }
      await AuthApi.updateAccount(userInfo.data.results.slug, newValue);

      toast.success("Cập nhật thông tin thành công, vui lòng đăng nhập lại!", {
        autoClose: 1000,
      });

      setTimeout(() => {
        localStorage.removeItem("userLogin");
        router("/login");
      }, 1000);
    } catch (err) {
      const error = err as ErrorType;
      if (error.message === "Mật khẩu cũ không đúng.") {
        toast.error("Sai mật khẩu cũ, vui lòng nhập lại!");
        return;
      }
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
          className="flex items-center justify-center max-h-[40px] lg:text-base md:text-sm w-full sm:w-max mx-5 mt-4 sm:mt-0 bg-red-500 rounded-md hover:bg-red-600 text-white px-3 py-2"
          onClick={handleSubmit(handleUpdateInfo)}
        >
          {isSubmitting ? (
            <i className="ri-loader-4-line text-2xl animate-spin"></i>
          ) : (
            <span>Lưu cài đặt</span>
          )}
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
                  {...register("username", {
                    maxLength: 80,
                  })}
                  className="border text-sm outline-none rounded-md block w-full p-2.5"
                  placeholder="Tài khoản"
                />
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
                    maxLength: 80,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/,
                  })}
                  autoComplete="on"
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.password
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white"
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password?.type === "pattern" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập đúng định dạng mật khẩu!
                    <br />
                    Bao gồm ít nhất 8 ký tự, 1 chữ cái viết thường, 1 chữ cái
                    viết hoa và 1 chữ số!
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-normal ${
                    errors.oldPassword ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Mật khẩu cũ
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  {...register("oldPassword", {
                    required: true,
                    maxLength: 80,
                  })}
                  autoComplete="on"
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.oldPassword
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white"
                  }`}
                  placeholder="Mật khẩu cũ"
                />
                {errors.oldPassword?.type === "required" && (
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
                      : "bg-white"
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
                  onClick={() => {
                    setPreviewImg("");
                  }}
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
    </Fragment>
  );
};

export default EditMyAccount;

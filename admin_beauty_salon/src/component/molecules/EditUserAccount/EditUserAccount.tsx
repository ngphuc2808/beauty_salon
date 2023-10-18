import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CropImage from "../CropImage";
import { ImageApi } from "@/services/api/image";
import { AuthApi } from "@/services/api/auth";
import { useGetEditUserInfo } from "@/queries/useQueries";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const EditUserAccount = () => {
  const { id } = useParams();
  const userInfo = useGetEditUserInfo(id!);

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
        role: userInfo.data.results.role,
        status: userInfo.data.results.status.toString(),
      });
      setPreviewImg(userInfo.data.results.avatar);
    }
  }, [userInfo.isLoading]);

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
      await AuthApi.updateAccount(userInfo.data?.results.slug, newValue);
      setPreviewImg("");
      reset();
      toast.success("Sửa thông tin tài khoản thành công!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap lg:flex-nowrap">
        <div className="flex items-center gap-3">
          <Link to={"/list-user"}>
            <i className="lg:text-2xl text-xl ml-5 w-10 h-10 flex items-center justify-center text-white bg-red-400 hover:bg-red-500 cursor-pointer rounded-md ri-arrow-left-line"></i>
          </Link>
          <h1 className="lg:text-xl md:text-base text-textHeadingColor">
            Chỉnh sửa {userInfo.data?.results.fullName}
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
                    minLength: 5,
                    maxLength: 80,
                  })}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.username
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white"
                  }`}
                  placeholder="Tài khoản"
                />
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
                    minLength: 5,
                    maxLength: 80,
                  })}
                  autoComplete="on"
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.password
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white"
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập tối thiểu 5 ký tự!
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
                    minLength: 5,
                    maxLength: 80,
                  })}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.fullName
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white"
                  }`}
                  placeholder="Họ và tên"
                />
                {errors.fullName?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập tối thiểu 5 ký tự!
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
                      {...register("status", {})}
                      value="true"
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    <span
                      className={`${
                        errors.status ? "text-red-700" : "text-[#666]"
                      }`}
                    >
                      Bật
                    </span>
                  </label>
                  <label
                    htmlFor="statusOff"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      id="statusOff"
                      {...register("status", {})}
                      value="false"
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    <span
                      className={`${
                        errors.status ? "text-red-700" : "text-[#666]"
                      }`}
                    >
                      Tắt
                    </span>
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
                      {...register("role", {})}
                      value="admin"
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    <span
                      className={`${
                        errors.role ? "text-red-700" : "text-[#666]"
                      }`}
                    >
                      Quản trị viên
                    </span>
                  </label>
                  <label
                    htmlFor="roleEmployee"
                    className="flex gap-4 items-center text-sm"
                  >
                    <input
                      type="radio"
                      id="roleEmployee"
                      {...register("role", {})}
                      value="employee"
                      className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
                    />
                    <span
                      className={`${
                        errors.role ? "text-red-700" : "text-[#666]"
                      }`}
                    >
                      Nhân viên
                    </span>
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

export default EditUserAccount;

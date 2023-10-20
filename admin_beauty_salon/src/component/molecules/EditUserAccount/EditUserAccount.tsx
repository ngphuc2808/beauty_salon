import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useGetEditUserInfo,
  usePostImage,
  usePutEditUserInfo,
} from "@/queries/useQueries";

import CropImage from "../CropImage";
import { useQueryClient } from "react-query";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const EditUserAccount = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useGetEditUserInfo(id!, {
    onSuccess(data) {
      reset({
        fullName: data.results.fullName,
        email: data.results.email,
        phone: data.results.phone,
        role: data.results.role,
        status: data.results.status.toString(),
      });
      setPreviewImg(data?.results.avatar as string);
    },
  });

  const { mutateAsync } = usePostImage();

  const { mutate } = usePutEditUserInfo(id! as string);

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
  } = useForm<EditAccountType>({
    defaultValues: {
      fullName: data?.results.fullName,
      email: data?.results.email,
      phone: data?.results.phone,
      role: data?.results.role,
      status: data?.results.status.toString(),
    },
  });

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

  const uploadFile = async () => {
    const fileAvt = new File(
      [fileImage],
      `image-${Math.floor(Math.random() * 100000)}.${
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
      upload = await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
    return upload;
  };

  const handleUpdateInfo = async (value: EditAccountType) => {
    const newValue = value;
    if (fileImage.size !== 0) {
      const avatar = await uploadFile();
      newValue.avatar = avatar?.data.results as string;
    } else {
      newValue.avatar = "";
    }

    mutate(newValue, {
      onSuccess(data) {
        toast.success("Cập nhật thông tin tài khoản thành công!");
        queryClient.setQueryData(["EditUserInfo", { slug: id }], data.data);
        queryClient.invalidateQueries({ queryKey: ["ListUser"] });
      },
      onError(error) {
        const err = error as ResponseErrorType;
        if (err.message === "Mật khẩu cũ không đúng.") {
          toast.error("Sai mật khẩu cũ, vui lòng nhập lại!");
          return;
        }
        if (err.message === "email đã tồn tại.") {
          toast.error("Email đã tồn tại, vui lòng kiểm tra lại!");
          return;
        }
        if (err.message === "phone đã tồn tại.") {
          toast.error("Số điện thoại đã tồn tại, vui lòng kiểm tra lại!");
          return;
        }
      },
    });
  };

  return (
    <Fragment>
      <div
        className={`w-full py-4 mb-5 flex items-center justify-between shadow rounded-lg flex-wrap lg:flex-nowrap min-h-[72px] ${
          isLoading ? "bg-gray-300 animate-pulse" : "bg-white"
        }`}
      >
        {!isLoading && (
          <>
            <div className="flex items-center gap-3">
              <Link to={"/list-user"}>
                <i className="lg:text-2xl text-xl ml-5 w-10 h-10 flex items-center justify-center text-white bg-red-400 hover:bg-red-500 cursor-pointer rounded-md ri-arrow-left-line"></i>
              </Link>
              <h1 className="lg:text-xl md:text-base text-textHeadingColor">
                {error
                  ? "Người dùng không tồn tại"
                  : `Chỉnh sửa ${data?.results.fullName}`}
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
          </>
        )}
      </div>
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-12 lg:col-span-8 order-2 lg:order-none">
          <div
            className={` shadow rounded-lg p-5 min-h-[536px] ${
              isLoading ? "bg-gray-300 animate-pulse" : "bg-white"
            }`}
          >
            <form>
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
                  disabled={error || isLoading ? true : false}
                  type="password"
                  id="password"
                  {...register("password", {
                    minLength: 5,
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
                {errors.password?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập tối thiểu 5 ký tự!
                  </p>
                )}
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
                  htmlFor="name"
                  className={`block mb-2 text-sm font-normal ${
                    errors.fullName ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Họ và tên
                </label>
                <input
                  disabled={error || isLoading ? true : false}
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
                  disabled={error || isLoading ? true : false}
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
                  disabled={error || isLoading ? true : false}
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
                      disabled={error || isLoading ? true : false}
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
                      disabled={error || isLoading ? true : false}
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
                      disabled={error || isLoading ? true : false}
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
                      disabled={error || isLoading ? true : false}
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
          <div
            className={`shadow rounded-lg p-5 mt-0 ${
              isLoading ? "bg-gray-300 animate-pulse" : "bg-white"
            }`}
          >
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
                {isLoading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-24 h-24 mr-2 text-gray-200 animate-spin fill-red-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden rounded-lg">
                    {previewImg || data?.results.avatar ? (
                      <figure className="w-full h-full">
                        <img
                          className="max-h-full max-w-full"
                          crossOrigin="anonymous"
                          src={previewImg || data?.results.avatar}
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
                )}
                <input
                  id="dropZone"
                  type="file"
                  disabled={error || isLoading ? true : false}
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

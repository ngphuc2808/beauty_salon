import { useState, useEffect, useContext, Fragment, ChangeEvent } from "react";
import { useIsFetching, useIsMutating, useQueryClient } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";

import {
  useGetUserInfo,
  usePostImage,
  usePostLogout,
  usePutEditUserInfo,
} from "@/queries/useQueries";

import { GlobalContext } from "@/contexts/globalContext";
import { dataNavigation } from "@/utils/data";

import images from "@/assets/images";
import CropImage from "../molecules/CropImage";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

interface Props {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const router = useNavigate();

  const queryClient = useQueryClient();

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const logout = usePostLogout();
  const { mutateAsync } = usePostImage();

  const isLogin = JSON.parse(localStorage.getItem("userLogin")!);

  useEffect(() => {
    if (!isLogin) {
      router("/login");
      return;
    }
  }, []);

  const userInfo = useGetUserInfo(isLogin?.session);
  const { mutate } = usePutEditUserInfo(isLogin?.session);

  const {
    selectTable,
    selectMainComponent,
    setSelectMainComponent,
    setSelectTable,
  } = useContext(GlobalContext);

  const [navMobile, setNavMobile] = useState<boolean>(true);
  const [cropImage, setCropImage] = useState<string | ArrayBuffer | null>(null);
  const [modalCrop, setModalCrop] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [fileImage, setFileImage] = useState<Blob>(new Blob());
  const [modalUpdateAvatar, setModalUpdateAvatar] = useState(true);

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

  const handleUploadAvatar = async () => {
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

    const newValue: EditAccountType = {
      email: "",
      password: "",
      oldPassword: "",
      avatar: upload?.data.results as string,
      fullName: "",
      phone: "",
      role: "",
      status: "",
    };

    mutate(newValue, {
      onSuccess(data) {
        setModalUpdateAvatar(false);
        toast.success("Cập nhật ảnh đại diện thành công!");
        queryClient.setQueryData(
          ["EditUserInfo", { slug: isLogin?.session }],
          data.data
        );
        queryClient.invalidateQueries({ queryKey: ["ListUser"] });
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  const handleLogout = async () => {
    logout.mutate();
    localStorage.removeItem("userLogin");
    router("/login");
  };

  return (
    <Fragment>
      <section>
        {/* Header */}
        <header className="fixed w-full h-16 bg-white inset-0 px-[10px] py-2 flex items-center justify-between shadow-headerBox z-50">
          <div className="flex items-center gap-1">
            <Link to={"/"} className="w-[90px] h-full">
              <figure>
                <img src="../../logoText.png" />
              </figure>
            </Link>
            <i
              className="ri-menu-line text-2xl p-4 sm:hidden"
              onClick={() => setNavMobile(!navMobile)}
            ></i>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col sm:flex-row text-sm text-textPrimaryColor">
              <p>Xin chào,&nbsp;</p>
              <p>{userInfo.data?.results.fullName}</p>
            </div>
            <div className="relative group">
              <figure className="w-[35px] h-[35px] bg-red-100 rounded-full hover:cursor-pointer">
                <img
                  crossOrigin="anonymous"
                  src={
                    previewImg || userInfo.data?.results.avatar || images.avatar
                  }
                  className="rounded-full"
                />
              </figure>
              <div className="bg-white p-3 absolute w-max shadow-menuBox rounded-md top-[44px] right-0 items-center gap-2 hidden before:content-[''] before:absolute before:top-[-13px] before:right-0 before:w-[50px] before:h-[20px] before:bg-transparent group-hover:flex">
                <div className="relative">
                  <figure className="w-[75px] h-[75px]">
                    <img
                      crossOrigin="anonymous"
                      src={userInfo.data?.results.avatar || images.avatar}
                      className="rounded-full"
                    />
                  </figure>
                  <div className="flex items-center justify-center absolute bottom-0 right-[-5px] bg-[#e4e6eb] w-6 h-6 rounded-full cursor-pointer">
                    <label htmlFor="dropZone">
                      <i className="ri-camera-fill cursor-pointer"></i>
                    </label>
                    <input
                      id="dropZone"
                      type="file"
                      onChange={handleCrop}
                      accept=".png, .jpg, .jpeg"
                      hidden
                    />
                  </div>
                </div>
                <ul className="text-sm text-textPrimaryColor [&>:hover]:text-red-600 [&>:hover]:bg-red-50">
                  {userInfo.data?.results.role === "admin" && (
                    <li>
                      <Link
                        to={"/auth"}
                        className="block py-2 px-3 w-full h-full cursor-pointer"
                        onClick={() => {
                          setSelectMainComponent("addAccount");
                        }}
                      >
                        Xác thực và ủy quyền
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to={`/edit-account`}
                      className="block py-2 px-3 w-full h-full cursor-pointer"
                      onClick={() => {
                        setSelectMainComponent("editMyAccount");
                      }}
                    >
                      Sửa thông tin
                    </Link>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="min-h-screen max-h-full mt-16 bg-[#f6f6f7] grid grid-cols-12 gap-y-0">
          <div className="min-h-full col-span-3 lg:col-span-2 border-r-4 border-solid border-red-500 overflow-y-auto hidden sm:block">
            <ul className="bg-white sm:bg-inherit [&>*:first-child]:mt-5 [&>*:last-child]:mb-5 pr-[10px]">
              <li>
                <div className="uppercase font-semibold pl-2 lg:ml-2 text-sm">
                  <span className="leading-8 text-textHeadingColor">
                    Mục lục
                  </span>
                </div>
                <ul className="text-sm [&>li]:cursor-pointer [&>:hover]:text-red-600 text-textPrimaryColor">
                  {dataNavigation.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectMainComponent("table");
                        setSelectTable(item.id);
                      }}
                    >
                      <Link
                        to={"/"}
                        className="flex gap-2 items-center group mb-[3px]"
                      >
                        {selectMainComponent === "table" &&
                        selectTable === item.id ? (
                          <span className="border-2 bg-red-500 h-11 w-1.5 rounded-full border-red-500"></span>
                        ) : (
                          <span className="h-11 w-1.5 rounded-full "></span>
                        )}
                        <div
                          className={`w-full flex items-center gap-2 p-2 hover:bg-red-100 ${
                            selectMainComponent === "table" &&
                            selectTable === item.id &&
                            "text-red-600 bg-red-100 rounded"
                          }`}
                        >
                          {
                            <span
                              className="text-xl"
                              dangerouslySetInnerHTML={{
                                __html: `${item.icon}`,
                              }}
                            ></span>
                          }
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="uppercase font-semibold pl-2 lg:ml-2 text-sm">
                  <span className="leading-8 text-textHeadingColor">
                    Liên kết nhanh
                  </span>
                </div>
                <ul className="max-h-[800px] overflow-auto text-sm text-textPrimaryColor pl-4 relative">
                  <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative">
                    <p className="my-2 hover:text-red-500 cursor-pointer">
                      Danh sách sản phẩm
                    </p>
                    <ul className="ml-6">
                      <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative">
                        <p className="my-2 hover:text-red-500 cursor-pointer">
                          Danh sách sản phẩm 1
                        </p>
                        <ul className="ml-8">
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                        </ul>
                        <ul className="ml-8">
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                        </ul>
                        <ul className="ml-8">
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                        </ul>
                      </li>
                      <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative my-2">
                        <p className="my-2 hover:text-red-500 cursor-pointer">
                          Danh sách sản phẩm 1
                        </p>
                        <ul className="ml-8">
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                          <li className="cursor-pointer hover:text-red-600 p-1">
                            Danh sách sản phẩm 2
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div
            className={`fixed inset-0 bg-white z-[100] sm:hidden transition-all overflow-y-auto ${
              navMobile
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <i
              className="ri-close-fill absolute right-7 top-7 text-3xl w-[30px] h-[30px] flex items-center justify-center rounded-full hover:text-red-500"
              onClick={() => setNavMobile(!navMobile)}
            ></i>
            <ul className="[&>li]:px-5 [&>*:first-child]:mt-12 [&>*:last-child]:mb-12 [&>*:last-child]:mt-2 overflow-y-auto">
              <li>
                <div className="uppercase font-semibold pl-2 lg:ml-2 text-base">
                  <span className="leading-8 text-textHeadingColor text-base">
                    Mục lục
                  </span>
                </div>
                <ul className="text-sm [&>li]:cursor-pointer [&>:hover]:text-red-600 text-textPrimaryColor [&>li]:text-lg">
                  {dataNavigation.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectMainComponent("table");
                        setSelectTable(item.id);
                      }}
                    >
                      <Link to={"/"} className="flex gap-2 items-center group">
                        <div
                          className={`w-full flex items-center gap-2 p-2 hover:bg-red-100 ${
                            selectMainComponent === "table" &&
                            selectTable === item.id &&
                            "text-red-600 bg-red-100 rounded"
                          }`}
                        >
                          {
                            <span
                              className="text-xl"
                              dangerouslySetInnerHTML={{
                                __html: `${item.icon}`,
                              }}
                            ></span>
                          }
                          <span className="group-hover:before:scale-x-100">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="uppercase font-semibold pl-2 lg:ml-2 text-base">
                  <span className="leading-8 text-textHeadingColor">
                    Liên kết nhanh
                  </span>
                </div>
                <ul className="max-h-[800px] overflow-auto text-textPrimaryColor pl-4 relative text-lg">
                  <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative">
                    <p className="my-2">Danh sách sản phẩm</p>
                    <ul className="ml-6">
                      <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative my-2">
                        <p className="my-2">Danh sách sản phẩm 1</p>
                        <ul className="ml-8">
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                        </ul>
                      </li>
                      <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative my-2">
                        <p className="my-2">Danh sách sản phẩm 1</p>
                        <ul className="ml-8">
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                        </ul>
                      </li>
                    </ul>
                    <ul className="ml-6">
                      <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative my-2">
                        <p className="my-2">Danh sách sản phẩm 1</p>
                        <ul className="ml-8">
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                        </ul>
                      </li>
                      <li className="after:content-[''] after:absolute after:top-2 after:left-[1px] after:h-full after:border-l after:border-dashed after:border-gray-500 relative my-2">
                        <p className="my-2">Danh sách sản phẩm 1</p>
                        <ul className="ml-8">
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                          <li className="p-1">Danh sách sản phẩm 2</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10 p-5">
            {children}
            <footer className="mt-10">
              <hr className="my-3 border-gray-300 sm:mx-auto lg:my-4" />
              <span className="block text-sm text-gray-400 sm:text-center ">
                © 2023 Bản quyền thuộc sở hữu của Công ty Pando.
              </span>
            </footer>
          </div>
          {isFetching + isMutating !== 0 && (
            <div role="status" className="fixed bottom-10 right-10">
              <svg
                aria-hidden="true"
                className="w-14 h-14 mr-2 text-gray-200 animate-spin fill-red-500"
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
          )}
        </div>
      </section>
      {previewImg && modalUpdateAvatar && (
        <>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-40 z-50"></div>
          <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50 transition">
            <div className="relative w-full max-w-[90%] sm:max-w-md max-h-full z-20">
              <div className="relative bg-white rounded-md shadow">
                <i
                  className="ri-close-line absolute right-4 top-2 text-2xl hover:text-red-500 cursor-pointer"
                  onClick={() => {
                    setModalUpdateAvatar(false);
                    setPreviewImg("");
                  }}
                ></i>
                <div className="p-8 text-center">
                  <div className="mb-5">
                    <h3 className="mb-1 font-normal text-textHeadingColor">
                      Bạn muốn cập nhật ảnh đại diện?
                    </h3>
                  </div>
                  <hr />
                  <div className="mt-5">
                    <button
                      type="button"
                      className="min-w-[105px] text-white bg-red-500 hover:bg-red-600 font-medium rounded-md text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={handleUploadAvatar}
                    >
                      Xác nhận
                    </button>
                    <button
                      type="button"
                      className="min-w-[105px] text-gray-500 bg-white hover:bg-gray-100 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                      onClick={() => {
                        setModalUpdateAvatar(false);
                        setPreviewImg("");
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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

export default MainLayout;

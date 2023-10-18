import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

import { GlobalContext } from "@/contexts/globalContext";
import { dataNavigation } from "@/utils/data";
import { AuthApi } from "@/services/api/auth";
import images from "@/assets/images";
import { useGetUserInfo } from "@/queries/useQueries";

const MainLayout = ({ children }: Props) => {
  const router = useNavigate();

  const isLogin = JSON.parse(localStorage.getItem("userLogin")!);

  console.log(isLogin);

  useEffect(() => {
    if (!isLogin) {
      router("/login");
      return;
    }
  }, []);

  const userInfo = useGetUserInfo(isLogin?.session);

  const [navMobile, setNavMobile] = useState<boolean>(true);

  const {
    selectTable,
    selectMainComponent,
    setSelectMainComponent,
    setSelectTable,
  } = useContext(GlobalContext);

  const handleLogout = async () => {
    await AuthApi.logout();
    localStorage.removeItem("userLogin");
    router("/login");
  };

  return (
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
            <p>Xin chào, </p>
            <p>{userInfo.data?.results.fullName}</p>
          </div>
          <div className="relative group">
            <figure className="w-[35px] h-[35px] bg-red-100 rounded-full hover:cursor-pointer">
              <img
                crossOrigin="anonymous"
                src={userInfo.data?.results.avatar || images.avatar}
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
                  <i className="ri-camera-fill"></i>
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
                <li onClick={handleLogout} className="py-2 px-3 cursor-pointer">
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
                <span className="leading-8 text-textHeadingColor">Mục lục</span>
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
        </div>
      </div>
    </section>
  );
};

export default MainLayout;

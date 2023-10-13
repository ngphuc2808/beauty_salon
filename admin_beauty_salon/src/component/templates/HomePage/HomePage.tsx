import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "remixicon/fonts/remixicon.css";

import { dataNavigation } from "@/utils/data";

import Navigation from "@/component/organisms/Navigation";
import Auth from "@/component/organisms/Auth";

import { AuthApi } from "@/services/api/auth";

import { setLoggedIn } from "@/features/redux/slices/dataUI/loginSlice";
import {
  setAddAccount,
  setEditMyAccount,
} from "@/features/redux/slices/componentUI/authComponentSlice";
import { setInfoUser } from "@/features/redux/slices/dataUI/userSlice";
import {
  setAuthComponent,
  setNavComponent,
} from "@/features/redux/slices/componentUI/componentSlice";
import { setTable } from "@/features/redux/slices/componentUI/navComponentSlice";

import images from "@/assets/images";

const HomePage = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!login.info.isLoggedIn) {
      router("/login");
    } else {
      handleGetInfo();
    }
  }, []);

  const data = useSelector(
    (state: { user: { info: iUserInfo } }) => state.user
  );

  const component = useSelector(
    (state: {
      component: {
        navigationComponent: boolean;
        authComponent: boolean;
      };
    }) => state.component
  );

  const login = useSelector(
    (state: { login: { info: { isLoggedIn: boolean; session: string } } }) =>
      state.login
  );

  const [roleAdmin, setRoleAdmin] = useState<string>("");
  const [category, setCategory] = useState<string>(dataNavigation[0].id);
  const [navMobile, setNavMobile] = useState<boolean>(true);

  const handleGetInfo = async () => {
    try {
      const result: any = await AuthApi.getInfo(login.info.session);
      if (result) {
        setRoleAdmin(result.results.role);
        dispatch(setInfoUser(result.results));
        return;
      }
    } catch (error: any) {
      if (error) {
        await AuthApi.logout();
        dispatch(
          setLoggedIn({
            isLoggedIn: false,
            session: "",
          })
        );
        router("/login");
      }
    }
  };

  const handleLogout = async () => {
    await AuthApi.logout();
    dispatch(
      setLoggedIn({
        isLoggedIn: false,
        session: "",
      })
    );
    router("/login");
  };

  return (
    <section>
      {/* Header */}
      <header className="fixed w-full h-16 bg-white inset-0 px-[10px] py-2 flex items-center justify-between shadow-headerBox z-50">
        <div className="flex items-center gap-1">
          <div className="w-[90px] h-full">
            <figure>
              <img src="../../logoText.png" />
            </figure>
          </div>
          <i
            className="ri-menu-line text-2xl p-4 sm:hidden"
            onClick={() => setNavMobile(!navMobile)}
          ></i>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col sm:flex-row text-sm text-textPrimaryColor">
            <p>Xin chào, </p>
            <p>{data.info.fullName}</p>
          </div>
          <div className="relative group">
            <figure className="w-[35px] h-[35px] bg-red-100 rounded-full hover:cursor-pointer">
              <img
                crossOrigin="anonymous"
                src={data.info.avatar || images.avatar}
                className="rounded-full"
              />
            </figure>
            <div className="bg-white p-3 absolute w-max shadow-menuBox rounded-md top-[44px] right-0 items-center gap-2 hidden before:content-[''] before:absolute before:top-[-13px] before:right-0 before:w-[50px] before:h-[20px] before:bg-transparent group-hover:flex">
              <div className="relative">
                <figure className="w-[75px] h-[75px]">
                  <img
                    crossOrigin="anonymous"
                    src={data.info.avatar || images.avatar}
                    className="rounded-full"
                  />
                </figure>
                <div className="flex items-center justify-center absolute bottom-0 right-[-5px] bg-[#e4e6eb] w-6 h-6 rounded-full cursor-pointer">
                  <i className="ri-camera-fill"></i>
                </div>
              </div>
              <ul className="[&>li]:py-2 [&>li]:px-3 [&>li]:cursor-pointer text-sm text-textPrimaryColor [&>:hover]:text-red-600 [&>:hover]:bg-red-50">
                {roleAdmin === "admin" && (
                  <li
                    onClick={() => {
                      dispatch(setAuthComponent());
                      dispatch(setAddAccount());
                    }}
                  >
                    Xác thực và ủy quyền
                  </li>
                )}
                <li
                  onClick={() => {
                    dispatch(setAuthComponent());
                    dispatch(setEditMyAccount());
                  }}
                >
                  Sửa thông tin
                </li>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="min-h-screen max-h-full mt-16 bg-[#f6f6f7] grid grid-cols-12 grid-rows-maxContent gap-y-0">
        <div className="min-h-full col-span-3 lg:col-span-2 border-r-4 border-solid border-red-500 overflow-y-auto hidden sm:block">
          <ul className="bg-white sm:bg-inherit [&>*:first-child]:mt-5 [&>*:last-child]:mb-5 pr-[10px]">
            <li>
              <div className="uppercase font-semibold pl-2 lg:ml-2 text-sm">
                <span className="leading-8 text-textHeadingColor">Mục lục</span>
              </div>
              <ul className="text-sm [&>li]:cursor-pointer [&>:hover]:text-red-600 text-textPrimaryColor">
                {dataNavigation.map((item, index) => (
                  <li
                    className="flex gap-2 items-center group mb-[3px]"
                    key={index}
                    onClick={() => {
                      item.id !== category && setCategory(item.id);
                      dispatch(setNavComponent());
                      dispatch(setTable());
                    }}
                  >
                    {item.id === category ? (
                      <span className="border-2 bg-red-500 h-11 w-1.5 rounded-full border-red-500"></span>
                    ) : (
                      <span className="h-11 w-1.5 rounded-full "></span>
                    )}
                    <div
                      className={`w-full flex items-center gap-2 p-2 hover:bg-red-100 ${
                        component.navigationComponent &&
                        item.id === category &&
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
                    className="flex gap-2 items-center group"
                    key={index}
                    onClick={() => {
                      item.id !== category && setCategory(item.id);
                    }}
                  >
                    <div
                      className={`w-full flex items-center gap-2 p-2 hover:bg-red-100 ${
                        component.navigationComponent &&
                        item.id === category &&
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
              <ul className="max-h-[800px] overflow-auto text-sm text-textPrimaryColor pl-4 relative text-lg">
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
          {component.navigationComponent && <Navigation category={category} />}
          {component.authComponent && <Auth />}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

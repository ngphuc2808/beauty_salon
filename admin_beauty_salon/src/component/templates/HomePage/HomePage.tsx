import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "remixicon/fonts/remixicon.css";

import styles from "./HomePage.module.css";

import { dataNavigation } from "@/utils/data";

import Navigation from "@/component/organisms/Navigation";
import Auth from "@/component/organisms/Auth";
import CropImage from "@/component/molecules/CropImage";

import { setLoggedIn } from "@/features/redux/slices/authSlice";
import { UsersApi } from "@/services/api/users";

const HomePage = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const [auth, setAuth] = useState<boolean>(false);

  const { isLoggedIn } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      router("/login");
      return;
    }
  }, []);

  const handleLogout = async () => {
    await UsersApi.logout();
    dispatch(setLoggedIn(false));
    router("/login");
  };

  const [category, setCategory] = useState<string>(dataNavigation[0].id);
  const [navMobile, setNavMobile] = useState<boolean>(true);

  return (
    <section className={`${styles.wrapper}`}>
      {/* Header */}
      <header className={`${styles.header}`}>
        <div className="flex items-center gap-1">
          <div className={`${styles.logoArea}`}>
            <figure>
              <img src="../../logoText.png" />
            </figure>
          </div>
          <i
            className="ri-menu-line text-2xl p-4 sm:hidden"
            onClick={() => setNavMobile(!navMobile)}
          ></i>
        </div>
        <div className={`${styles.infoArea}`}>
          <p className="text-sm text-textPrimaryColor">Xin chào, admin!</p>
          <div className="relative group">
            <figure className={`${styles.avatar}`}>
              <img src="../../logoIcon.png" />
            </figure>
            <div className={`${styles.subMenu} group-hover:flex`}>
              <div className="relative">
                <figure className="w-[65px] h-[65px]">
                  <img src="../../logoIcon.png" />
                </figure>
                <div className={`${styles.customCameraIcon}`}>
                  <i className="ri-camera-fill"></i>
                </div>
              </div>
              <ul className={`${styles.subList}`}>
                <li onClick={() => setAuth(true)}>Xác thực và ủy quyền</li>
                <li onClick={() => setAuth(true)}>Sửa thông tin</li>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={`${styles.content}`}>
        <div className={`${styles.leftContent}`}>
          <ul className="bg-white sm:bg-inherit [&>*:first-child]:mt-5 [&>*:last-child]:mb-5 pr-[10px]">
            <li>
              <div className={`${styles.headerMenu} text-sm`}>
                <span className="leading-8 text-textHeadingColor">Mục lục</span>
              </div>
              <ul className={`${styles.navList}`}>
                {dataNavigation.map((item, index) => (
                  <li
                    className={`flex gap-2 items-center group mb-[3px]`}
                    key={index}
                    onClick={() => {
                      item.id !== category && setCategory(item.id);
                    }}
                  >
                    {item.id === category ? (
                      <span className="border-2 bg-red-500 h-11 w-1.5 rounded-full border-red-500"></span>
                    ) : (
                      <span className="h-11 w-1.5 rounded-full "></span>
                    )}
                    <div
                      className={`w-full flex items-center gap-2 p-2 hover:bg-red-100 ${
                        item.id === category ? styles.active : ""
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
                      <span className={`group-hover:before:scale-x-100`}>
                        {item.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className={`${styles.headerMenu} text-sm`}>
                <span className="leading-8 text-textHeadingColor">
                  Liên kết nhanh
                </span>
              </div>
              <ul className={`${styles.linkList}`}>
                <li className={`${styles.activeAfter} relative`}>
                  <p className="my-2 hover:text-red-500 cursor-pointer">
                    Danh sách sản phẩm
                  </p>
                  <ul className="ml-6">
                    <li className={`${styles.activeAfter} relative`}>
                      <p className="my-2 hover:text-red-500 cursor-pointer">
                        Danh sách sản phẩm 1
                      </p>
                      <ul className="ml-8">
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                      </ul>
                      <ul className="ml-8">
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                      </ul>
                      <ul className="ml-8">
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                      </ul>
                    </li>
                    <li className={`${styles.activeAfter} relative my-2`}>
                      <p className="my-2 hover:text-red-500 cursor-pointer">
                        Danh sách sản phẩm 1
                      </p>
                      <ul className="ml-8">
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
                          Danh sách sản phẩm 2
                        </li>
                        <li className={`${styles.itemList} p-1`}>
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
          className={`${styles.leftContentMobile} ${
            navMobile
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <i
            className={`ri-close-fill ${styles.customCloseIcon}`}
            onClick={() => setNavMobile(!navMobile)}
          ></i>
          <ul className="[&>li]:px-5 [&>*:first-child]:mt-12 [&>*:last-child]:mb-12 [&>*:last-child]:mt-2 overflow-y-auto">
            <li>
              <div className={`${styles.headerMenu} text-base`}>
                <span className="leading-8 text-textHeadingColor text-base">
                  Mục lục
                </span>
              </div>
              <ul className={`${styles.navList} [&>li]:text-lg`}>
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
                        item.id === category ? styles.active : ""
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
                      <span className={`group-hover:before:scale-x-100`}>
                        {item.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className={`${styles.headerMenu} text-base`}>
                <span className="leading-8 text-textHeadingColor">
                  Liên kết nhanh
                </span>
              </div>
              <ul className={`${styles.linkList} text-lg`}>
                <li className={`${styles.activeAfter} relative`}>
                  <p className="my-2">Danh sách sản phẩm</p>
                  <ul className="ml-6">
                    <li className={`${styles.activeAfter} relative my-2`}>
                      <p className="my-2">Danh sách sản phẩm 1</p>
                      <ul className="ml-8">
                        <li className="p-1">Danh sách sản phẩm 2</li>
                        <li className="p-1">Danh sách sản phẩm 2</li>
                        <li className="p-1">Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                    <li className={`${styles.activeAfter} relative my-2`}>
                      <p className="my-2">Danh sách sản phẩm 1</p>
                      <ul className="ml-8">
                        <li className="p-1">Danh sách sản phẩm 2</li>
                        <li className="p-1">Danh sách sản phẩm 2</li>
                        <li className="p-1">Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                  </ul>
                  <ul className="ml-6">
                    <li className={`${styles.activeAfter} relative my-2`}>
                      <p className="my-2">Danh sách sản phẩm 1</p>
                      <ul className="ml-8">
                        <li className="p-1">Danh sách sản phẩm 2</li>
                        <li className="p-1">Danh sách sản phẩm 2</li>
                        <li className="p-1">Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                    <li className={`${styles.activeAfter} relative my-2`}>
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
        <div className={`${styles.rightContent}`}>
          {/* <Navigation category={category} /> */}
          {auth && <Auth />}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

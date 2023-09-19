import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

import styles from "./HomePage.module.css";
import images from "../../assets/images";

import { dataNavigation } from "../../utils/data";
import NavigationContent from "./NavigationContent";

const HomePage = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    SetIsLoggedIn(true);
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to={"/login"} />;
  else {
    const [category, setCategory] = useState<string>("Cat1");

    const [navMobile, setNavMobile] = useState<boolean>(true);

    const handleClick = (item: iFakeData) => {
      if (item.id === "Cat1") {
        setCategory("Cat1");
        return;
      }
      if (item.id === "Cat2") {
        setCategory("Cat2");
        return;
      }
      if (item.id === "Cat3") {
        setCategory("Cat3");
        return;
      }
      if (item.id === "Cat4") {
        setCategory("Cat4");
        return;
      }
      if (item.id === "Cat5") {
        setCategory("Cat5");
        return;
      }
      if (item.id === "Cat6") {
        setCategory("Cat6");
        return;
      }
      if (item.id === "Cat7") {
        setCategory("Cat7");
        return;
      }
    };

    return (
      <section className={`${styles.wrapper}`}>
        {/* Header */}
        <header className={`${styles.header}`}>
          <div className="flex items-center gap-1">
            <div className={`${styles.logoArea}`}>
              <figure>
                <img src={images.logoMain} />
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
                <img src={images.logoIcon} />
              </figure>
              <div className={`${styles.subMenu} group-hover:scale-100`}>
                <div className="relative">
                  <figure className="w-[65px] h-[65px]">
                    <img src={images.logoIcon} />
                  </figure>
                  <div className={`${styles.customCameraIcon}`}>
                    <i className="ri-camera-fill"></i>
                  </div>
                </div>
                <ul className={`${styles.subList}`}>
                  <li>Sửa thông tin</li>
                  <li>Đăng xuất</li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className={`${styles.content}`}>
          <div className={`${styles.navigation}`}>
            <ul className="bg-white sm:bg-inherit [&>*:first-child]:mt-5 [&>*:last-child]:mb-5 pr-[10px]">
              <li>
                <div className={`${styles.headerMenu} text-sm`}>
                  <span className="leading-8 text-textHeadingColor">
                    Mục lục
                  </span>
                </div>
                <ul className={`${styles.navList}`}>
                  {dataNavigation.map((item, index) => (
                    <li
                      className={`flex gap-2 items-center group mb-[3px]`}
                      key={index}
                      onClick={() => handleClick(item)}
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
                <ul className={`${styles.navList}`}></ul>
              </li>
            </ul>
          </div>
          <div
            className={`${styles.navigationMobile} ${
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
                      onClick={() => handleClick(item)}
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
                <ul className={`${styles.navList} [&>li]:text-lg`}></ul>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10 p-5">
            <NavigationContent category={category} />
          </div>
        </div>
      </section>
    );
  }
};

export default HomePage;

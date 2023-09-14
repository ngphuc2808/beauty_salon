import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

import styles from "./HomePage.module.css";
import images from "../../assets/images";
import Search from "./Search";

import { dataNavigation } from "../../utils/data";
import CategoryLevel1 from "./NavigationItem/CategoryLevel1";

const HomePage = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(true);
  const [nav, setNav] = useState<boolean>(true);

  useEffect(() => {
    SetIsLoggedIn(true);
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to={"/login"} />;
  else
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
              onClick={() => setNav(!nav)}
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
          <div
            className={`${styles.navigation} ${
              nav ? "" : `${styles.showNavigation}`
            }`}
          >
            <ul className="bg-white sm:bg-inherit [&>*:last-child]:pb-5">
              <li>
                <div className={`${styles.headerMenu}`}>
                  <span className="leading-9 text-textHeadingColor">
                    Mục lục
                  </span>
                </div>
                <ul className={`${styles.navList}`}>
                  {dataNavigation.map((item, index) => (
                    <li className="flex gap-2 items-center group" key={index}>
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
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className={`${styles.headerMenu}`}>
                  <span className="leading-9 text-textHeadingColor">
                    Liên kết nhanh
                  </span>
                </div>
                <ul className={`${styles.navList}`}></ul>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className={`${styles.dashBoard}`}>
              <h1 className="lg:text-xl md:text-base lg:ml-5 md:ml-3 ml-2">
                Danh mục cấp 1
              </h1>
              <Search />
              <button className={`${styles.buttonAdd}`}>Thêm danh mục</button>
            </div>
            <CategoryLevel1 />
          </div>
        </div>
      </section>
    );
};

export default HomePage;

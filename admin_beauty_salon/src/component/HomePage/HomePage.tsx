import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

import styles from "./HomePage.module.css";
import images from "../../assets/images";
import Search from "./Search";

import { dataNavigation } from "../../utils/data";

const HomePage = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    SetIsLoggedIn(true);
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to={"/login"} />;
  else
    return (
      <section className={`${styles.wrapper}`}>
        {/* Header */}
        <header className={`${styles.header}`}>
          <div className={`${styles.logoArea}`}>
            <figure>
              <img src={images.logoMain} />
            </figure>
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
            <ul className="mt-5 bg-white sm:rounded-lg shadow-md">
              <li>
                <div className={`${styles.headerMenu}`}>
                  <span className="leading-9 text-textHeadingColor">
                    Mục lục
                  </span>
                </div>
                <ul className={`${styles.navList}`}>
                  {dataNavigation.map((item, index) => (
                    <li className="group" key={index}>
                      <span className={`group-hover:before:scale-x-100`}>
                        {item}
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
            <div className={`${styles.divTable}`}>
              <div className={`${styles.headerTable}`}>
                <span className={`${styles.customSpan}`}>0 lượt chọn</span>
                <button
                  className={`${styles.customButton} bg-red-400 hover:bg-red-500`}
                >
                  Xóa
                </button>
                <button
                  className={`${styles.customButton} bg-green-400 hover:bg-green-500`}
                >
                  Bật
                </button>
                <button
                  className={`${styles.customButton} bg-yellow-400 hover:bg-yellow-500`}
                >
                  Tắt
                </button>
              </div>
              <div className={`${styles.tableContent}`}>
                <table className={`${styles.table}`}>
                  <thead className={`${styles.tableHead}`}>
                    <tr>
                      <th scope="col" className="p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tên danh mục
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Chức năng hiển thị
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                    <tr className={`${styles.tableRow}`}>
                      <td className="w-4 p-5">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">Trang Landing Page</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-500">Bật</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default HomePage;

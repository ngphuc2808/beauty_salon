import { Fragment, useState, useId, useRef } from "react";
import Select from "react-tailwindcss-select";

import styles from "../NavigationContent.module.css";

const DetailCategory = () => {
  const idURL = useId();
  const idMetaTitle = useId();
  const idMetaKeywords = useId();
  const idMetaDescription = useId();
  const idDropZone = useId();
  const idPermission = useId();
  const idPermissionDisplay = useId();

  const [nameValue, setNameValue] = useState<string>("");

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" },
  ];

  const [animal, setAnimal] = useState(null);

  const handleChange = (value: any) => {
    setAnimal(value);
  };

  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <div className="flex items-center gap-3">
          <i className={`${styles.customIconBack} ri-arrow-left-line`}></i>
          <h1 className="text-xl text-textHeadingColor">Chỉnh sửa phun xăm</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white shadow rounded-lg p-5">
            <h1 className="text-xl text-textHeadingColor font-medium">
              Tổng quan
            </h1>
            <div className="mt-6">
              <h1 className="text-lg text-textHeadingColor">Tên danh mục</h1>
              <input
                ref={inputRef}
                type="text"
                placeholder="Nhập tên danh mục"
                className="mt-3 w-full border rounded p-3 text-sm focus:outline-none focus:border-red-500 focus:ring focus:ring-red-500/20"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="block sm:hidden bg-white shadow rounded-lg p-5 mt-5 lg:mt-0">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-textHeadingColor">Ảnh danh mục</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className="cursor-pointer text-blue-500">
                  Ảnh thay thế
                </span>
                <span className="cursor-pointer text-red-500">Xóa</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={idDropZone}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">
                      Bấm hoặc kéo thả để chọn ảnh của bạn
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id={idDropZone} type="file" hidden />
              </label>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5 block sm:hidden">
            <h1 className="text-textHeadingColor">Trạng thái navbar</h1>
            <div>
              <label
                htmlFor={idPermission}
                className="flex gap-4 items-center mt-3 text-sm"
              >
                <input
                  type="radio"
                  id={idPermission}
                  name={idPermission}
                  className={`${styles.customRadio}`}
                />
                Bật hiển thị
              </label>
              <label
                htmlFor={idPermission}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermission}
                  name={idPermission}
                  className={`${styles.customRadio}`}
                />
                Tắt hiển thị
              </label>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5 block sm:hidden">
            <h1 className="text-textHeadingColor">Trạng thái hiển thị</h1>
            <div>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-3 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang landing page, menu danh mục cấp 2
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang SEO, menu danh mục cấp 2
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Danh mục cấp 2
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang landing page
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang SEO
              </label>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5">
            <div className="sm:flex items-center justify-between">
              <h1 className="text-lg text-textHeadingColor">
                Trang landing page cho danh mục
              </h1>
              <button
                className={`${styles.customButtonCategory} mt-3 sm:mt-0 w-full sm:w-auto`}
              >
                Tạo trang landing page
              </button>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5">
            <div className="[&>:nth-child(2)]:h-[46px]">
              <div className="sm:flex items-center justify-between mb-3">
                <h1 className="text-lg text-textHeadingColor">
                  Danh mục cấp 2
                </h1>
              </div>
              <Select
                classNames={{
                  menuButton: ({ isDisabled }: any) =>
                    `flex text-sm text-gray-500 py-1 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none cursor-pointer ${
                      isDisabled
                        ? "bg-gray-200"
                        : "bg-white hover:border-gray-400 focus:border-red-500 focus:ring focus:ring-red-500/20"
                    }`,
                }}
                primaryColor="red"
                placeholder="Chọn tên danh mục"
                value={animal}
                onChange={handleChange}
                options={options}
                isMultiple
                isClearable
              />
              <ul className={`${styles.listCategory}`}>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className={`${styles.itemCategory}`}>
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5">
            <div className="[&>:first-child]:mb-3 [&>*]:mb-4">
              <h1 className="text-lg text-textHeadingColor">
                Tối ưu hóa công cụ tìm kiếm
              </h1>
              <div className="relative z-0">
                <input
                  type="text"
                  id={idURL}
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor={idURL}
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  URL key
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id={idMetaTitle}
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor={idMetaTitle}
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Meta title
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id={idMetaKeywords}
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor={idMetaKeywords}
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Meta keywords
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id={idMetaDescription}
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor={idMetaDescription}
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Meta description
                </label>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5 hidden sm:block">
            <div className="flex items-center justify-between hidden lg:flex">
              <button
                className={`${styles.customButtonCategory} min-w-[100px]`}
              >
                Thoát
              </button>
              <button
                className={`${styles.customButtonCategory} min-w-[100px]`}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 [&>*]:mb-5">
          <div className="hidden sm:block bg-white shadow rounded-lg p-5 mt-5 lg:mt-0">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-textHeadingColor">Ảnh danh mục</h1>
              <div className="flex items-center gap-3 text-sm">
                <span className="cursor-pointer text-blue-500">
                  Ảnh thay thế
                </span>
                <span className="cursor-pointer text-red-500">Xóa</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={idDropZone}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">
                      Bấm hoặc kéo thả để chọn ảnh của bạn
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id={idDropZone} type="file" hidden />
              </label>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 hidden sm:block">
            <h1 className="text-textHeadingColor">Trạng thái navbar</h1>
            <div>
              <label
                htmlFor={idPermission}
                className="flex gap-4 items-center mt-3 text-sm"
              >
                <input
                  type="radio"
                  id={idPermission}
                  name={idPermission}
                  className={`${styles.customRadio}`}
                />
                Bật hiển thị
              </label>
              <label
                htmlFor={idPermission}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermission}
                  name={idPermission}
                  className={`${styles.customRadio}`}
                />
                Tắt hiển thị
              </label>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 hidden sm:block">
            <h1 className="text-textHeadingColor">Trạng thái hiển thị</h1>
            <div>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-3 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang landing page, menu danh mục cấp 2
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang SEO, menu danh mục cấp 2
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Danh mục cấp 2
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang landing page
              </label>
              <label
                htmlFor={idPermissionDisplay}
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id={idPermissionDisplay}
                  name={idPermissionDisplay}
                  className={`${styles.customRadio}`}
                />
                Trang SEO
              </label>
            </div>
          </div>
        </div>
        <div className={`${styles.groupButtonMobile}`}>
          <button className={`${styles.customButtonCategory} w-[49%]`}>
            Thoát
          </button>
          <button className={`${styles.customButtonCategory} w-[49%]`}>
            Lưu
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailCategory;

import { Fragment, useState, useRef } from "react";
import Select from "react-tailwindcss-select";

import styles from "./DetailCategory.module.css";

const DetailCategory = () => {
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
        <div className={`${styles.descriptionDashBoard}`}>
          <i className={`${styles.customIconBack} ri-arrow-left-line`}></i>
          <h1 className={`${styles.titleDashBoard}`}>Chỉnh sửa phun xăm</h1>
        </div>
      </div>
      <div className={`${styles.gridContent}`}>
        <div className={`${styles.leftContent}`}>
          <div className={`${styles.firstItemLeftContent}`}>
            <h1 className={`${styles.headerFirstItem}`}>Tổng quan</h1>
            <div className="mt-6">
              <h1 className={`${styles.titleItem}`}>Tên danh mục</h1>
              <input
                ref={inputRef}
                type="text"
                placeholder="Nhập tên danh mục"
                className={`${styles.inputNameCategory}`}
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={`${styles.itemLeftContent}`}>
            <div className="sm:flex items-center justify-between">
              <h1 className={`${styles.titleItem}`}>
                Trang landing page cho danh mục
              </h1>
              <button
                className={`${styles.customButtonCategory} mt-3 sm:mt-0 w-full sm:w-auto`}
              >
                Tạo trang landing page
              </button>
            </div>
          </div>
          <div className={`${styles.itemLeftContent}`}>
            <div className="[&>:nth-child(2)]:h-[46px]">
              <div className="sm:flex items-center justify-between mb-3">
                <h1 className={`${styles.titleItem}`}>Danh mục cấp 2</h1>
              </div>
              <Select
                classNames={{
                  menuButton: ({ isDisabled }: any) =>
                    `${styles.customSelect} ${
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
          <div className={`${styles.itemLeftContent}`}>
            <div className="[&>:first-child]:mb-3 [&>*]:mb-4">
              <h1 className={`${styles.titleItem}`}>
                Tối ưu hóa công cụ tìm kiếm
              </h1>
              <div className="relative z-0">
                <input
                  type="text"
                  id="url"
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor="url"
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  URL key
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="metaTitle"
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor="metaTitle"
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Meta title
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="metaKeyWords"
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor="metaKeyWords"
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Meta keywords
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="metaDescription"
                  className={`${styles.customInput} peer`}
                  placeholder=" "
                />
                <label
                  htmlFor="metaDescription"
                  className={`${styles.customLabel} peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                >
                  Meta description
                </label>
              </div>
            </div>
          </div>
          <div className={`${styles.itemLeftContent}`}>
            <div className="flex items-center justify-between">
              <button
                className={`${styles.customButtonCategory} w-[48%] lg:w-[200px] `}
              >
                Thoát
              </button>
              <button
                className={`${styles.customButtonCategory} w-[48%] lg:w-[200px]`}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.rightContent}`}>
          <div className={`${styles.firstItemRightContent}`}>
            <h1 className={`${styles.headerFirstItem}`}>Tổng quan</h1>
            <div className="mt-6">
              <h1 className={`${styles.titleItem}`}>Tên danh mục</h1>
              <input
                ref={inputRef}
                type="text"
                placeholder="Nhập tên danh mục"
                className={`${styles.inputNameCategory}`}
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={`${styles.secondItemRightContent}`}>
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
              <label htmlFor="dropZone" className={`${styles.labelDropZone}`}>
                <div className={`${styles.dropZone}`}>
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
                <input id="dropZone" type="file" hidden />
              </label>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h1 className="text-textHeadingColor">Trạng thái navbar</h1>
            <div>
              <label
                htmlFor="permissionOn"
                className="flex gap-4 items-center mt-3 text-sm"
              >
                <input
                  type="radio"
                  id="permissionOn"
                  name="permission"
                  className={`${styles.customRadio}`}
                />
                Bật hiển thị
              </label>
              <label
                htmlFor="permissionOff"
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id="permissionOff"
                  name="permission"
                  className={`${styles.customRadio}`}
                />
                Tắt hiển thị
              </label>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h1 className="text-textHeadingColor">Trạng thái hiển thị</h1>
            <div>
              <label
                htmlFor="permissionDisplay1"
                className="flex gap-4 items-center mt-3 text-sm"
              >
                <input
                  type="radio"
                  id="permissionDisplay1"
                  name="permissionDisplay"
                  className={`${styles.customRadio}`}
                />
                Trang landing page, menu danh mục cấp 2
              </label>
              <label
                htmlFor="permissionDisplay2"
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id="permissionDisplay2"
                  name="permissionDisplay"
                  className={`${styles.customRadio}`}
                />
                Trang SEO, menu danh mục cấp 2
              </label>
              <label
                htmlFor="permissionDisplay3"
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id="permissionDisplay3"
                  name="permissionDisplay"
                  className={`${styles.customRadio}`}
                />
                Danh mục cấp 2
              </label>
              <label
                htmlFor="permissionDisplay4"
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id="permissionDisplay4"
                  name="permissionDisplay"
                  className={`${styles.customRadio}`}
                />
                Trang landing page
              </label>
              <label
                htmlFor="permissionDisplay5"
                className="flex gap-4 items-center mt-4 text-sm"
              >
                <input
                  type="radio"
                  id="permissionDisplay5"
                  name="permissionDisplay"
                  className={`${styles.customRadio}`}
                />
                Trang SEO
              </label>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailCategory;

import { Fragment, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Select from "react-tailwindcss-select";

import { GlobalContext } from "@/contexts/globalContext";

const DetailCategory = () => {
  const { setSelectMainComponent } = useContext(GlobalContext);

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
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <i className="lg:text-2xl text-xl ml-5 w-10 h-10 flex items-center justify-center text-white bg-red-400 hover:bg-red-500 cursor-pointer rounded-md ri-arrow-left-line"></i>
          </Link>
          <h1 className="text-xl text-textHeadingColor">Thêm danh mục</h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-12 lg:col-span-8 order-2 lg:order-none">
          <div className="hidden lg:block bg-white shadow rounded-lg p-5">
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
          <div className="bg-white shadow rounded-lg p-5 mt-5">
            <div className="sm:flex items-center justify-between">
              <h1 className="text-lg text-textHeadingColor">
                Trang landing page cho danh mục
              </h1>
              <Link
                to={"/create-landing-page"}
                className="text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md mt-3 sm:mt-0 w-full sm:w-auto"
              >
                Tạo trang landing page
              </Link>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5">
            <div className="sm:flex items-center justify-between">
              <h1 className="text-lg text-textHeadingColor">
                Trang SEO cho danh mục
              </h1>
              <Link
                to={"/create-seo-page"}
                className="text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md mt-3 sm:mt-0 w-full sm:w-auto"
                onClick={() => setSelectMainComponent("createPost")}
              >
                Tạo trang SEO
              </Link>
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
                    `flex text-sm text-gray-500 py-1 border border-gray-300 rounded shadow-sm focus:outline-none cursor-pointer ${
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
              <ul className="mt-4 max-h-[400px] overflow-auto text-textPrimaryColor text-sm [&>li]:border-b [&>:last-child]:border-none">
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
                  <span>Tên</span>
                  <button className="text-red-500">Xóa</button>
                </li>
                <li className="flex items-center justify-between  px-4 py-3 hover:bg-red-100 mt-2 rounded">
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
                  id="url"
                  className="block py-2.5 px-0 w-full text-sm text-textPrimaryColor bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="url"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  URL key
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="metaTitle"
                  className="block py-2.5 px-0 w-full text-sm text-textPrimaryColor bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="metaTitle"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Meta title
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="metaKeyWords"
                  className="block py-2.5 px-0 w-full text-sm text-textPrimaryColor bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="metaKeyWords"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Meta keywords
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  id="metaDescription"
                  className="block py-2.5 px-0 w-full text-sm text-textPrimaryColor bg-transparent border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="metaDescription"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Meta description
                </label>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 mt-5">
            <div className="flex items-center justify-between">
              <button className="text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md w-[48%] lg:w-[200px]">
                Lưu
              </button>
              <Link
                to={"/"}
                className="flex justify-center text-sm px-4 py-3 bg-red-400 hover:bg-red-500 text-white rounded-md w-[48%] lg:w-[200px]"
              >
                Thoát
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 [&>*]:mb-5">
          <div className="block lg:hidden bg-white shadow rounded-lg p-5">
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
          <div className="bg-white shadow rounded-lg p-5 mt-0">
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
                htmlFor="dropZone"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="ri-upload-cloud-2-line mb-1 text-4xl text-textPrimaryColor"></i>
                  <p className="mb-2 text-sm text-textPrimaryColor">
                    <span className="font-semibold">
                      Bấm hoặc kéo thả để chọn ảnh của bạn
                    </span>
                  </p>
                  <p className="text-xs text-textPrimaryColor">
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
                  className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
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
                  className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
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
                  className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
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
                  className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
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
                  className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
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
                  className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
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
                  className="after:content-[''] after:cursor-pointer after:w-4 after:h-4 after:rounded-full after:relative after:top-[-2px] after:left-0 after:bg-[#d1d3d1]  after:inline-block visible
                      checked:after:content-[''] checked:after:cursor-pointer checked:after:w-4 checked:after:h-4 checked:after:rounded-full checked:after:relative checked:after:top-[-2px] checked:after:left-0 checked:after:bg-green-500 checked:after:inline-block checked:after:visible"
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

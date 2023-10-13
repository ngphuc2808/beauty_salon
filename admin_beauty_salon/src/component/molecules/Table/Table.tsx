import { Fragment } from "react";
import { useDispatch } from "react-redux";

import { dataNavigation } from "@/utils/data";
import Search from "@/component/molecules/Search";

import TableCategory from "./TableCategory";
import TableCategoryLevel from "./TableCategoryLevel";
import TableList from "./TableList";
import TableSchedule from "./TableSchedule";
import TableComment from "./TableComment";
import { setDetailCategory } from "@/features/redux/slices/componentUI/navComponentSlice";

const Table = ({ category }: iCategory) => {
  const dispatch = useDispatch();
  const renderTable = () => {
    switch (category) {
      case "Cat1":
        return <TableCategory />;
      case "Cat2":
        return (
          <TableCategoryLevel
            title="Tên danh mục cấp 2"
            childTitle="Tên danh mục cấp 1"
          />
        );
      case "Cat3":
        return (
          <TableCategoryLevel
            title="Tên danh mục cấp 3"
            childTitle="Tên danh mục cấp 2"
          />
        );
      case "Cat4":
        return <TableList />;
      case "Cat5":
        return <TableList />;
      case "Cat6":
        return <TableSchedule />;
      case "Cat7":
        return <TableComment />;
      default:
        return null;
    }
  };
  return (
    <Fragment>
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap sm:flex-nowrap">
        <h1 className="lg:text-xl md:text-base lg:ml-5 md:ml-3 ml-5 text-textHeadingColor">
          {dataNavigation.find((item) => item.id === category)?.name}
        </h1>
        {category !== "Cat4" &&
          category !== "Cat5" &&
          category !== "Cat6" &&
          category !== "Cat7" && (
            <>
              <Search category={category} />
              <button
                className="lg:text-base md:text-sm lg:mr-5 md:mr-3 mr-5 bg-red-500 rounded-md hover:bg-red-600 text-white px-3 py-2"
                onClick={() => dispatch(setDetailCategory())}
              >
                Thêm danh mục
              </button>
            </>
          )}
      </div>
      <div className="relative shadow-md rounded-lg mb-5 bg-white overflow-hidden">
        <div className="flex gap-4 mx-3 mb-3 sm:mx-5 sm:mb-5 border-b border-gray-200 items-center justify-center lg:justify-normal">
          <span className="lg:px-4 md:py-2 lg:my-5 md:my-3 rounded-md text-sm lg:text-base">
            0 lượt chọn
          </span>
          <button className="min-w-[70px] h-10 py-1 px-1 my-2 md:my-3 rounded-md text-gray-900 text-sm border-2 border-solid">
            Xóa
          </button>
          {category !== "Cat6" && category !== "Cat7" && (
            <>
              <button className="min-w-[70px] h-10 py-1 px-1 my-2 md:my-3 rounded-md text-gray-900 text-sm border-2 border-solid">
                Bật
              </button>
              <button className="min-w-[70px] h-10 py-1 px-1 my-2 md:my-3 rounded-md text-gray-900 text-sm border-2 border-solid">
                Tắt
              </button>
            </>
          )}
        </div>
        {renderTable()}
      </div>
    </Fragment>
  );
};

export default Table;

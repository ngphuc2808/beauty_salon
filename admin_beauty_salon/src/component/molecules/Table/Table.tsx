import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "@/contexts/globalContext";
import { dataNavigation } from "@/utils/data";
import { listComponent } from "@/helpers/listComponent";
import Search from "@/component/molecules/Search";

const Table = () => {
  const { selectTable } = useContext(GlobalContext);

  return (
    <Fragment>
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap sm:flex-nowrap">
        <h1 className="lg:text-xl md:text-base lg:ml-5 md:ml-3 ml-5 text-textHeadingColor">
          {dataNavigation.find((item) => item.id === selectTable)?.name}
        </h1>
        {(selectTable === "tableCategoryLevel1" ||
          selectTable === "tableCategoryLevel2" ||
          selectTable === "tableCategoryLevel3") && (
          <>
            <Search />
            <Link
              to={"/create-category"}
              className="lg:text-base md:text-sm lg:mr-5 md:mr-3 mr-5 bg-red-500 rounded-md hover:bg-red-600 text-white px-3 py-2"
            >
              Thêm danh mục
            </Link>
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
          {selectTable === "appointmentSchedule" ||
            (selectTable === "comments" && (
              <>
                <button className="min-w-[70px] h-10 py-1 px-1 my-2 md:my-3 rounded-md text-gray-900 text-sm border-2 border-solid">
                  Bật
                </button>
                <button className="min-w-[70px] h-10 py-1 px-1 my-2 md:my-3 rounded-md text-gray-900 text-sm border-2 border-solid">
                  Tắt
                </button>
              </>
            ))}
        </div>
        {selectTable && listComponent[selectTable]}
      </div>
    </Fragment>
  );
};

export default Table;

import { InvalidEvent, KeyboardEvent, Fragment, useState, useId } from "react";
import ReactPaginate from "react-paginate";

import { dataList } from "@/utils/data";

import Items from "./Items";

const TableList = () => {
  const idItemPerPage = useId();
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [itemsNumber, setItemsNumber] = useState<number>(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems: DataListType[] = dataList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataList.length / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % dataList.length;
    setItemOffset(newOffset);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setItemsPerPage(itemsNumber);
    }
  };

  const handleChange = (event: InvalidEvent<HTMLInputElement>) => {
    setItemsNumber(Number(event.target.value));
  };

  return (
    <Fragment>
      <div className="w-full overflow-x-auto">
        <table className="mb-4 min-w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500">
          <tbody>
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
              <th scope="col" className="px-6 py-3 text-red-600">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Tiêu đề
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Danh mục
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Ngày đăng
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Trạng thái đăng
              </th>
            </tr>
            <Items currentItems={currentItems} />
          </tbody>
        </table>
      </div>
      <div className="sm:flex justify-between items-center px-5">
        <label
          htmlFor={idItemPerPage}
          className="flex items-center justify-center sm: justify-none gap-2 sm:py-8 mt-6 sm:mt-0"
        >
          Hiển thị
          <input
            type="number"
            id={idItemPerPage}
            className="w-[55px] p-2 border border-solid border-gray-300 outline-none rounded appearance-none"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          bài trên trang
        </label>
        <ReactPaginate
          activeClassName="flex items-center justify-center w-10 h-10 text-sm text-gray-500 border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center w-14 h-12 text-red-500 shadow-xl text-base"
          breakClassName="flex items-center justify-center w-10 h-10 text-sm text-gray-500 border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center"
          breakLabel={"..."}
          containerClassName="flex items-center justify-center sm:min-h-[112px] py-6 sm:py-8 list-none"
          disabledClassName="text-[#808e9b]"
          marginPagesDisplayed={2}
          nextClassName="flex items-center justify-center w-10 h-10 text-sm text-red-500 ml-2 text-3xl rounded-full hover:bg-red-50"
          nextLabel={<i className="ri-arrow-drop-right-line text-2xl"></i>}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageClassName="flex items-center justify-center w-10 h-10 text-sm text-gray-500 border border-solid [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center font-medium"
          pageRangeDisplayed={2}
          previousClassName="flex items-center justify-center w-10 h-10 text-sm text-red-500 mr-2 text-3xl rounded-full hover:bg-red-50"
          previousLabel={<i className="ri-arrow-drop-left-line text-2xl"></i>}
        />
      </div>
    </Fragment>
  );
};

export default TableList;

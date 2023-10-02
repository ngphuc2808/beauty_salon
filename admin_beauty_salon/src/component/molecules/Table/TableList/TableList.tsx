import { InvalidEvent, KeyboardEvent, Fragment, useState, useId } from "react";
import ReactPaginate from "react-paginate";

import styles from "../Table.module.css";

import { dataList } from "@/utils/data";
import Items from "./Items";

const TableList = () => {
  const idItemPerPage = useId();
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [itemsNumber, setItemsNumber] = useState<number>(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems: iDataList[] = dataList.slice(itemOffset, endOffset);
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
        <table className={`${styles.table}`}>
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
            className={`${styles.customItemsPerpage}`}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          bài trên trang
        </label>
        <ReactPaginate
          activeClassName={`${styles.item} ${styles.active}`}
          breakClassName={`${styles.item}`}
          breakLabel={"..."}
          containerClassName={`${styles.pagination}`}
          disabledClassName={`${styles.disabledPage}`}
          marginPagesDisplayed={2}
          nextClassName={`${styles.iconRight} ${styles.next}`}
          nextLabel={<i className="ri-arrow-drop-right-line"></i>}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageClassName={`${styles.item} ${styles.paginationPage}`}
          pageRangeDisplayed={2}
          previousClassName={`${styles.iconLeft} ${styles.previous}`}
          previousLabel={<i className="ri-arrow-drop-left-line"></i>}
        />
      </div>
    </Fragment>
  );
};

export default TableList;
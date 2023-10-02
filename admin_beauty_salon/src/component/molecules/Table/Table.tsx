import { Fragment } from "react";

import styles from "./Table.module.css";

import { dataNavigation } from "@/utils/data";
import Search from "@/component/molecules/Search";

import TableCategory from "./TableCategory";
import TableCategoryLevel from "./TableCategoryLevel";
import TableList from "./TableList";
import TableSchedule from "./TableSchedule";
import TableComment from "./TableComment";

const Table = ({ category }: iCategory) => {
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
      <div className={`${styles.dashBoard}`}>
        <h1 className="lg:text-xl md:text-base lg:ml-5 md:ml-3 ml-5 text-textHeadingColor">
          {dataNavigation.find((item) => item.id === category)?.name}
        </h1>
        <Search category={category} />
        {category !== "Cat6" && category !== "Cat7" && (
          <button className={`${styles.buttonAdd}`}>
            {category === "Cat4"
              ? "Thêm bài viết"
              : category === "Cat5"
              ? "Thêm sản phẩm"
              : "Thêm danh mục"}
          </button>
        )}
      </div>
      <div className={`${styles.content}`}>
        <div className={`${styles.headerTable}`}>
          <span className={`${styles.customSpan}`}>0 lượt chọn</span>
          <button className={`${styles.customButton} `}>Xóa</button>
          {category !== "Cat6" && category !== "Cat7" && (
            <>
              <button className={`${styles.customButton}`}>Bật</button>
              <button className={`${styles.customButton}`}>Tắt</button>
            </>
          )}
        </div>
        {renderTable()}
      </div>
    </Fragment>
  );
};

export default Table;

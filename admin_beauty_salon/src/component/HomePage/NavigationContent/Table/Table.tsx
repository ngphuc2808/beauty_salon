import { Fragment } from "react";
import styles from "../NavigationContent.module.css";
import TableCategory from "./TableCategory";
import TableCategoryLevel from "./TableCategoryLevel";
import TableComment from "./TableComment";
import TableList from "./TableList";
import TableSchedule from "./TableSchedule";
import Search from "../../Search";

const Table = ({ category }: iCategory) => {
  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <h1 className="lg:text-xl md:text-base lg:ml-5 md:ml-3 ml-2">
          {category === "Cat1"
            ? "Danh mục cấp 1"
            : category === "Cat2"
            ? "Danh mục cấp 2"
            : category === "Cat3"
            ? "Danh mục cấp 3"
            : category === "Cat4"
            ? "Danh sách bài viết"
            : category === "Cat5"
            ? "Danh sách sản phẩm"
            : category === "Cat6"
            ? "Danh sách lịch hẹn"
            : category === "Cat7"
            ? "Danh sách bình luận"
            : ""}
        </h1>
        <div className="md:w-[250px] lg:w-[400px]">
          <Search category={category} />
        </div>
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
        {category === "Cat1" ? (
          <TableCategory />
        ) : category === "Cat2" ? (
          <TableCategoryLevel
            title="Tên danh mục cấp 2"
            childTitle="Tên danh mục cấp 1"
          />
        ) : category === "Cat3" ? (
          <TableCategoryLevel
            title="Tên danh mục cấp 3"
            childTitle="Tên danh mục cấp 2"
          />
        ) : category === "Cat4" ? (
          <TableList />
        ) : category === "Cat5" ? (
          <TableList />
        ) : category === "Cat6" ? (
          <TableSchedule />
        ) : category === "Cat7" ? (
          <TableComment />
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default Table;

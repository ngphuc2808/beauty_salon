import { Fragment } from "react";
import styles from "../NavigationContent.module.css";
import TableCategory from "./TableCategory";
import TableCategoryLevel from "./TableCategoryLevel";
import TableComment from "./TableComment";
import TableList from "./TableList";
import TableSchedule from "./TableSchedule";
import Search from "../../Search";
import { dataNavigation } from "../../../../utils/data";

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
        <h1 className="lg:text-xl md:text-base lg:ml-5 md:ml-3 ml-2">
          {dataNavigation.find((item) => item.id === category)?.name}
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
        {renderTable()}
      </div>
    </Fragment>
  );
};

export default Table;

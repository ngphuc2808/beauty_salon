import styles from "./NavigationContent.module.css";

import TableCategory from "./TableCategory";
import TableCategoryLevel from "./TableCategoryLevel";
import TableComment from "./TableComment";
import TableList from "./TableList";
import TableSchedule from "./TableSchedule";

const NavigationContent = ({ category }: iCategory) => {
  return (
    <div className={`${styles.divTable}`}>
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
  );
};

export default NavigationContent;

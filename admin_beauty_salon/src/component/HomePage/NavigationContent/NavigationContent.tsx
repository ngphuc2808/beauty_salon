import styles from "./NavigationContent.module.css";

const NavigationContent = ({ category }: any) => {
  return (
    <div className={`${styles.divTable}`}>
      <div className={`${styles.headerTable}`}>
        <span className={`${styles.customSpan}`}>0 lượt chọn</span>
        <button className={`${styles.customButton} `}>Xóa</button>
        <button className={`${styles.customButton}`}>Bật</button>
        <button className={`${styles.customButton}`}>Tắt</button>
      </div>
      <div className={`${styles.tableContent}`}>
        <table className={`${styles.table}`}>
          <thead className={`${styles.tableHead}`}>
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
                {category === "Cat1"
                  ? "Tên danh mục"
                  : category === "Cat2"
                  ? "Tên danh mục cấp 2"
                  : category === "Cat3"
                  ? "Tên danh mục cấp 3"
                  : ""}
              </th>
              {category === "Cat2" ? (
                <th scope="col" className="px-6 py-3 text-red-600">
                  Tên danh mục cấp 1
                </th>
              ) : category === "Cat3" ? (
                <th scope="col" className="px-6 py-3 text-red-600">
                  Tên danh mục cấp 2
                </th>
              ) : (
                ""
              )}
              <th scope="col" className="px-6 py-3 text-red-600">
                Nội dung hiển thị
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={`${styles.tableRow}`}>
              <td className="w-4 p-5">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              {category === "Cat2" ? (
                <td className="px-6 py-4">Render tên danh mục cấp 1</td>
              ) : category === "Cat3" ? (
                <td className="px-6 py-4">Render tên danh mục cấp 2</td>
              ) : (
                ""
              )}
              <td className="px-6 py-4">Trang Landing Page</td>
              <td className="px-6 py-4">
                <span className="font-medium text-green-500">Bật</span>
              </td>
            </tr>
            <tr className={`${styles.tableRow}`}>
              <td className="w-4 p-5">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              {category === "Cat2" ? (
                <td className="px-6 py-4">Render tên danh mục cấp 1</td>
              ) : category === "Cat3" ? (
                <td className="px-6 py-4">Render tên danh mục cấp 2</td>
              ) : (
                ""
              )}
              <td className="px-6 py-4">Trang Landing Page</td>
              <td className="px-6 py-4">
                <span className="font-medium text-green-500">Bật</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NavigationContent;

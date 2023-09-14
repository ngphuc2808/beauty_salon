import styles from "./CategoryLevel1.module.css";

const CategoryLevel1 = () => {
  return (
    <div className={`${styles.divTable}`}>
      <div className={`${styles.headerTable}`}>
        <span className={`${styles.customSpan}`}>0 lượt chọn</span>
        <button
          className={`${styles.customButton} bg-red-400 hover:bg-red-500`}
        >
          Xóa
        </button>
        <button
          className={`${styles.customButton} bg-green-400 hover:bg-green-500`}
        >
          Bật
        </button>
        <button
          className={`${styles.customButton} bg-yellow-400 hover:bg-yellow-500`}
        >
          Tắt
        </button>
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
                Tên danh mục
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Chức năng hiển thị
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

export default CategoryLevel1;

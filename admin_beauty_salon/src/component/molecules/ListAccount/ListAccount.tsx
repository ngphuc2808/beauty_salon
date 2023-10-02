import styles from "./ListAccount.module.css";

const ListAccount = () => {
  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.headerTable}`}>
        <span className={`${styles.customSpan}`}>0 lượt chọn</span>
        <button className={`${styles.customButton} `}>Xóa</button>
      </div>
      <div className="w-full max-h-[626px] overflow-y-auto overflow-x-auto">
        <table className={`${styles.table}`}>
          <tbody>
            <tr className={`${styles.tableRow}`}>
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
                Ảnh đại diện
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Họ và tên
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3 text-red-600">
                Trạng thái
              </th>
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
              <th scope="row" className="px-6 py-3">
                <figure className="w-[120px] h-[80px] flex items-center">
                  <img src="" />
                </figure>
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Nguyễn Hoàng Phúc
              </th>
              <td className="px-6 py-4">phuc@gmail.com</td>
              <td className="px-6 py-4">0901234567</td>
              <td className="px-6 py-4">
                <span className="font-medium text-green-500">Online</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAccount;

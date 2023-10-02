import styles from "../Table.module.css";

const TableSchedule = () => {
  return (
    <div className="w-full max-h-[626px] overflow-y-auto overflow-x-auto">
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
              Ngày đặt
            </th>

            <th scope="col" className="px-6 py-3 text-red-600">
              Thời gian
            </th>
            <th scope="col" className="px-6 py-3 text-red-600">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3 text-red-600">
              Số điện thoại
            </th>
            <th scope="col" className="px-6 py-3 text-red-600">
              Dịch vụ đăng ký
            </th>
            <th scope="col" className="px-6 py-3 text-red-600">
              Địa điểm
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

            <td className="px-6 py-4">10/10/2010</td>
            <td className="px-6 py-4">8:00</td>
            <td className="px-6 py-4">Nguyễn Hoàng Phúc</td>
            <td className="px-6 py-4">0901234567</td>
            <td className="px-6 py-4">Trắng da</td>
            <td className="px-6 py-4">HCM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableSchedule;
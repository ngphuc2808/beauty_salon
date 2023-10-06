import { dataListAccount } from "@/utils/data";
import styles from "./ListAccount.module.css";
import { useState } from "react";

const ListAccount = ({ setEditAccount }: iListAccount) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    const isChecked = checked.includes(id);
    if (isChecked) {
      setChecked((checked) =>
        checked.filter((check) => {
          return check !== id;
        })
      );
    } else {
      setChecked((prev) => [...prev, id]);
    }
  };

  const handleCheckAll = () => {
    const newArr = dataListAccount.map((item) => item.id);
    if (checkedAll.length === 0) {
      setCheckedAll(newArr);
      setChecked(newArr);
    } else {
      setCheckedAll([]);
      setChecked([]);
    }
  };

  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.headerTable}`}>
        <span className={`${styles.customSpan}`}>
          {checked.length} lượt chọn
        </span>
        <button className={`${styles.customButton} `}>Xóa</button>
      </div>
      <div className={`w-full overflow-y-auto overflow-x-auto max-h-[625px]`}>
        <table className={`${styles.table}`}>
          <tbody>
            <tr className={`${styles.tableRow}`}>
              <th scope="col" className="p-5">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={
                      checkedAll.length === dataListAccount.length &&
                      checked.length === dataListAccount.length
                    }
                    onChange={handleCheckAll}
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
              <th scope="col" className="px-6 py-3 text-red-600"></th>
            </tr>
            {dataListAccount.map((item, index) => (
              <tr className={`${styles.tableRow}`} key={index}>
                <td className="w-4 p-5">
                  <div className="flex items-center">
                    <input
                      id={`checkUser-${item.id}`}
                      checked={checked.includes(item.id)}
                      onChange={() => handleCheck(item.id)}
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                    />
                  </div>
                </td>
                <th scope="row" className="px-6 py-3">
                  <figure className="w-[120px] h-[80px] flex items-center">
                    <img src={item.avatar} />
                  </figure>
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.fullName}
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`font-medium ${
                      item.permission === "Bật"
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    {item.permission}
                  </span>
                </td>
                <td className="w-4 p-5">
                  <i
                    className="ri-pencil-fill p-3 border border-red-500 rounded text-red-500 cursor-pointer"
                    onClick={() => setEditAccount(true)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAccount;

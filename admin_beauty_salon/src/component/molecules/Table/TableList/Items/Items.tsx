import { Fragment } from "react";

import styles from "../../Table.module.css";

const Items = ({ currentItems }: iItem) => {
  return (
    <Fragment>
      {currentItems &&
        currentItems?.map((item, index) => (
          <tr className={`${styles.tableRow}`} key={index}>
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
                <img src={item.imgUrl} />
              </figure>
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {item.name}
            </th>
            <td className="px-6 py-4">{item.category}</td>
            <td className="px-6 py-4">{item.dateTime}</td>

            <td className="px-6 py-4">
              <span
                className={`font-medium ${
                  item.permission ? "text-green-500" : "text-red-500"
                } `}
              >
                {item.permission ? "Bật" : "Tắt"}
              </span>
            </td>
          </tr>
        ))}
    </Fragment>
  );
};

export default Items;

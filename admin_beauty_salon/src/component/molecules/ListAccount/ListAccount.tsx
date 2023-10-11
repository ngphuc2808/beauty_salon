import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ListAccount.module.css";

import ModalDelete from "../ModalDelete";
import Search from "../Search";
import {
  setAddAccount,
  setEditUserAccount,
} from "@/features/redux/slices/componentUI/authComponentSlice";

import { AuthApi } from "@/services/api/auth";
import { setEditInfoUser } from "@/features/redux/slices/dataUI/editUserSlice";

const ListAccount = () => {
  const dispatch = useDispatch();

  const [dataListAccount, setDataListAccount] = useState<iDataListAccount[]>(
    []
  );
  const [checked, setChecked] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState<string[]>([]);
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  const authComponent = useSelector(
    (state: {
      authComponent: {
        addAccount: boolean;
        listAccount: boolean;
        editUserAccount: boolean;
        editMyAccount: boolean;
      };
    }) => state.authComponent
  );

  const getListUser = async () => {
    try {
      const result: any = await AuthApi.getListUser();
      if (result) {
        setDataListAccount(result.results);
        return;
      }
    } catch (error: any) {
      if (error) {
        console.log(error);
      }
    }
    return;
  };

  useEffect(() => {
    getListUser();
  }, [authComponent.listAccount, modalDelete]);

  const handleCheck = (slug: string) => {
    const isChecked = checked.includes(slug);
    if (isChecked)
      setChecked((checked) => checked.filter((check) => check !== slug));
    else {
      setChecked((prev) => [...prev, slug]);
    }
  };

  useEffect(() => {
    if (checked.length === dataListAccount.length) {
      setCheckedAll(checked);
    }
  }, [checked.length]);

  const handleCheckAll = () => {
    const newArr = dataListAccount.map((item) => item.slug);
    if ((checkedAll.length && checked.length) === dataListAccount.length) {
      setCheckedAll([]);
      setChecked([]);
    } else {
      setCheckedAll(newArr);
      setChecked(newArr);
    }
  };

  const handleOpenModal = () => {
    if (checked.length > 0) {
      setModalDelete(true);
      return;
    }
  };

  const handleEditInfo = (item: iAccountAuth) => {
    dispatch(setEditInfoUser(item));
    dispatch(setEditUserAccount());
  };

  return (
    <Fragment>
      <div className={`${styles.dashBoard}`}>
        <h1 className="lg:text-xl md:text-base ml-5 text-textHeadingColor">
          Danh sách tài khoản
        </h1>
        <Search category={""} />
        <div className="w-full lg:w-auto flex items-center gap-3 mr-5 ml-5 lg:ml-0 mt-4 lg:mt-0 flex-col lg:flex-row">
          <button
            className={`${styles.buttonAddAccount}`}
            onClick={() => dispatch(setAddAccount())}
          >
            Thêm tài khoản
          </button>
        </div>
      </div>
      <div className={`${styles.content}`}>
        <div className={`${styles.headerTable}`}>
          <span className={`${styles.customSpan}`}>
            {checked.length} lượt chọn
          </span>
          <button
            className={`${styles.customButton} `}
            onClick={handleOpenModal}
          >
            Xóa
          </button>
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
                        id={`checkUser-${item.slug}`}
                        checked={checked.includes(item.slug)}
                        onChange={() => handleCheck(item.slug)}
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-3">
                    <figure className="w-[70px] h-[70px] flex items-center">
                      <img
                        src={item.avatar}
                        className="w-full h-full rounded-full "
                      />
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
                        item.status ? "text-green-500" : "text-red-500"
                      } `}
                    >
                      {item.status ? "Bật" : "Tắt"}
                    </span>
                  </td>
                  <td className="w-4 p-5">
                    <i
                      className="ri-pencil-fill p-3 border border-red-500 rounded text-red-500 cursor-pointer"
                      onClick={() => handleEditInfo(item)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalDelete && (
        <ModalDelete checked={checked} setModal={setModalDelete} />
      )}
    </Fragment>
  );
};

export default ListAccount;

import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import ModalDelete from "../ModalDelete";
import Search from "../Search";

import images from "@/assets/images";
import { AuthApi } from "@/services/api/auth";

const ListAccount = () => {
  const { data } = useQuery({
    queryKey: ["listUser"],
    queryFn: () => getListUser(),
    keepPreviousData: true,
  });

  const [checked, setChecked] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState<string[]>([]);
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  const getListUser = async () => {
    try {
      return await AuthApi.getListUser();
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleCheck = (slug: string) => {
    const isChecked = checked.includes(slug);
    if (isChecked)
      setChecked((checked) => checked.filter((check) => check !== slug));
    else {
      setChecked((prev) => [...prev, slug]);
    }
  };

  useEffect(() => {
    if (checked.length === data?.results.length) {
      setCheckedAll(checked);
    }
  }, [checked.length]);

  const handleCheckAll = () => {
    const newArr = data?.results.map((item: any) => item.slug);
    if ((checkedAll.length && checked.length) === data?.results.length) {
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

  const handleEditInfo = (item: ListAccountType) => {
    console.log(item);
  };

  return (
    <Fragment>
      <div className="w-full py-4 mb-5 bg-white flex items-center justify-between shadow rounded-lg flex-wrap lg:flex-nowrap">
        <h1 className="lg:text-xl md:text-base ml-5 text-textHeadingColor">
          Danh sách tài khoản
        </h1>
        <Search isAuth />
        <div className="w-full lg:w-auto flex items-center gap-3 mr-5 ml-5 lg:ml-0 mt-4 lg:mt-0 flex-col lg:flex-row">
          <Link
            to={"/auth"}
            className="w-full lg:w-auto lg:text-base md:text-sm bg-red-500 rounded-md hover:bg-red-600 text-white px-3 py-2"
          >
            Thêm tài khoản
          </Link>
        </div>
      </div>
      <div className="relative shadow-md rounded-lg mb-5 bg-white overflow-hidden">
        <div className="flex gap-4 mx-3 mb-3 sm:mx-5 sm:mb-5 border-b border-gray-200 items-center justify-center lg:justify-normal">
          <span className="lg:px-4 md:py-2 lg:my-5 md:my-3 rounded-md text-sm lg:text-base">
            {checked.length} lượt chọn
          </span>
          <button
            className="min-w-[70px] h-10 py-1 px-1 my-2 md:my-3 rounded-md text-gray-900 text-sm border-2 border-solid"
            onClick={handleOpenModal}
          >
            Xóa
          </button>
        </div>
        <div className={`w-full overflow-y-auto overflow-x-auto max-h-[625px]`}>
          <table className="mb-4 min-w-full max-w-full whitespace-nowrap text-sm text-left text-gray-500">
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <th scope="col" className="p-5">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      checked={
                        checkedAll.length === data?.results.length &&
                        checked.length === data?.results.length
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
                  Vai trò
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
              {data?.results.map((item: any, index: number) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
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
                        crossOrigin="anonymous"
                        src={item.avatar || images.avatar}
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
                  <td className="px-6 py-4">{item.role}</td>
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
                    <Link to={`/edit-account/${item.slug}`}>
                      <i className="ri-pencil-fill p-3 border border-red-500 rounded text-red-500 cursor-pointer"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalDelete && (
        <ModalDelete checked={checked} setModalDelete={setModalDelete} />
      )}
    </Fragment>
  );
};

export default ListAccount;

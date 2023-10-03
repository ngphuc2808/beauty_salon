import { useState } from "react";
import styles from "./EditAccount.module.css";

const EditAccount = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="grid grid-cols-12 gap-x-3">
      <div className="col-span-12 lg:col-span-8 order-2 lg:order-none">
        <div className="bg-white shadow rounded-lg p-5">
          <form>
            <div className="mb-5">
              <label htmlFor="name" className={`${styles.label}`}>
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={`${styles.input}`}
                placeholder="Họ và tên"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className={`${styles.label}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={`${styles.input}`}
                placeholder="Email"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className={`${styles.label}`}>
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                className={`${styles.input}`}
                placeholder="Số điện thoại"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className={`${styles.label}`}>
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`${styles.input}`}
                placeholder="Mật khẩu"
              />
            </div>
            <div className="mb-5">
              <h1 className="text-sm text-textHeadingColor mb-2">Trạng thái</h1>
              <div className="flex gap-10 items-center">
                <label
                  htmlFor="permission"
                  className="flex gap-4 items-center text-sm"
                >
                  <input
                    type="radio"
                    id="permission"
                    name="permission"
                    className={`${styles.customRadio}`}
                  />
                  Bật
                </label>
                <label
                  htmlFor="permission"
                  className="flex gap-4 items-center text-sm"
                >
                  <input
                    type="radio"
                    id="permission"
                    name="permission"
                    className={`${styles.customRadio}`}
                  />
                  Tắt
                </label>
              </div>
            </div>
            <div className="mb-5">
              <h1 className="text-sm text-textHeadingColor mb-2">Phân quyền</h1>
              <div className="flex gap-10 items-center">
                <label
                  htmlFor="role"
                  className="flex gap-4 items-center text-sm"
                >
                  <input
                    type="radio"
                    id="role"
                    name="role"
                    className={`${styles.customRadio}`}
                  />
                  Quản trị viên
                </label>
                <label
                  htmlFor="role"
                  className="flex gap-4 items-center text-sm"
                >
                  <input
                    type="radio"
                    id="role"
                    name="role"
                    className={`${styles.customRadio}`}
                  />
                  Nhân viên
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 [&>*]:mb-5">
        <div className="bg-white shadow rounded-lg p-5 mt-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-textHeadingColor">Ảnh đại diện</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="cursor-pointer text-blue-500">Thay thế ảnh</span>
              <span className="cursor-pointer text-red-500">Xóa</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">
                    Bấm hoặc kéo thả để chọn ảnh của bạn
                  </span>
                </p>
                <p className="text-xs text-gray-500 ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone" type="file" hidden />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;

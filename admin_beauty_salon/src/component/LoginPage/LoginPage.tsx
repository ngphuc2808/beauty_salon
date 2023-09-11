import { useState, useEffect, SyntheticEvent } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import images from "../../assets/images";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkValueUsername, setCheckValueUsername] = useState<boolean>(true);
  const [checkValuePassword, setCheckValuePassword] = useState<boolean>(true);

  useEffect(() => {
    if (username.length > 0) setCheckValueUsername(true);
    if (password.length > 0) setCheckValuePassword(true);
  }, [username, password]);

  const handleClickButton = (event: SyntheticEvent) => {
    if (username.length === 0) setCheckValueUsername(false);
    else setCheckValueUsername(true);

    if (password.length === 0) setCheckValuePassword(false);
    else setCheckValuePassword(true);

    if (username.length > 0 && password.length > 0) {
      const value: iAccount = {
        username: username,
        password: password,
      };
      console.log(value);
    }

    event.preventDefault();
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Login</title>
      </Helmet>
      <section className="wrapper">
        <div className="bg-[#f6f6f7] h-screen flex items-center justify-center">
          <div className="bg-white shadow-loginBox p-10 w-[90%] md:w-[80%] lg:w-[475px] rounded-md">
            <div className="flex items-center justify-center mb-[30px]">
              <figure className="w-[140px] h-[70px]">
                <img src={images.logoMain} />
              </figure>
            </div>
            <form>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-normal ${
                    !checkValueUsername ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    !checkValueUsername
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Nhập tài khoản"
                />
                {!checkValueUsername && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    Vui lòng nhập tài khoản!
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-normal ${
                    !checkValuePassword ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    !checkValuePassword
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {!checkValuePassword && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-500">
                    Vui lòng nhập mật khẩu!
                  </p>
                )}
              </div>
              <div className="mt-[10px] pt-[10px] border-t border-gray-300">
                <button
                  className="w-full py-3 px-4 bg-red-500 rounded-md hover:bg-red-600 text-yellow-200 hover:text-yellow-300 ease-in duration-300"
                  onClick={handleClickButton}
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default LoginPage;

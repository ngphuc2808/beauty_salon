import { useState, useEffect, useId, SyntheticEvent } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Aos from "aos";
import "aos/dist/aos.css";

import styles from "./LoginPage.module.css";
import images from "../../assets/images";

const LoginPage = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkValueUsername, setCheckValueUsername] = useState<boolean>(true);
  const [checkValuePassword, setCheckValuePassword] = useState<boolean>(true);

  const usernameId = useId();
  const passwordId = useId();

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
        <div className={`${styles.background}`}>
          <div
            className={`${styles.loginArea}`}
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <div className={`${styles.logo}`}>
              <figure className="w-[140px] h-[70px]">
                <img src={images.logoMain} />
              </figure>
            </div>
            <form>
              <div className="mb-5">
                <label
                  htmlFor={usernameId}
                  className={`${styles.label} ${
                    !checkValueUsername ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id={usernameId}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className={`${styles.input} ${
                    !checkValueUsername
                      ? `${styles.errorInput}`
                      : `${styles.normalInput}`
                  }`}
                  placeholder="Nhập tài khoản"
                />
                {!checkValueUsername && (
                  <p className={`${styles.warning}`}>
                    Vui lòng nhập tài khoản!
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={passwordId}
                  className={`${styles.label} ${
                    !checkValuePassword ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id={passwordId}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className={`${styles.input} ${
                    !checkValuePassword
                      ? `${styles.errorInput}`
                      : `${styles.normalInput}`
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {!checkValuePassword && (
                  <p className={`${styles.warning}`}>Vui lòng nhập mật khẩu!</p>
                )}
              </div>
              <div className={`${styles.buttonArea}`}>
                <button
                  className={`${styles.button}`}
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

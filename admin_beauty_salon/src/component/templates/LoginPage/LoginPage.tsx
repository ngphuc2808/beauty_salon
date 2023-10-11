import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./LoginPage.module.css";

import { AuthApi } from "@/services/api/auth";
import { setLoggedIn } from "@/features/redux/slices/dataUI/loginSlice";

const LoginPage = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const login = useSelector(
    (state: { login: { info: { isLoggedIn: boolean; session: string } } }) =>
      state.login
  );

  useEffect(() => {
    if (login.info.isLoggedIn) {
      router("/");
      return;
    }
  }, []);

  const [emptyUsername, setEmptyUsername] = useState<boolean>(true);
  const [emptyPassword, setEmptyPassword] = useState<boolean>(true);
  const [formValue, setFormValue] = useState<iAccount>({
    username: "",
    password: "",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (formValue.username.length > 0) setEmptyUsername(true);
    if (formValue.password.length > 0) setEmptyPassword(true);
  }, [formValue]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleLogin = async () => {
    if (formValue.username.length === 0) setEmptyUsername(false);
    else setEmptyUsername(true);

    if (formValue.password.length === 0) setEmptyPassword(false);
    else setEmptyPassword(true);

    try {
      if (formValue.username.length > 0 && formValue.password.length > 0) {
        const result = await AuthApi.login(formValue);
        if (result.results.message === "Đăng nhập thành công.") {
          dispatch(
            setLoggedIn({
              isLoggedIn: true,
              session: result.results.session,
            })
          );
          router("/");
          return;
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.results.message === "Tên đăng nhập không tồn tại.") {
        toast.error("Tài khoản không tồn tại, vui lòng kiểm tra lại!");
        return;
      }
      if (error.results.message === "Mật khẩu không đúng.") {
        toast.error("Sai mật khẩu, vui lòng kiểm tra lại!");
        return;
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Login</title>
      </Helmet>
      <section className="wrapper">
        <div className={`${styles.background}`}>
          <div className={`${styles.loginArea}`}>
            <div className={`${styles.logo}`}>
              <figure className="w-[140px] h-[70px]">
                <img src="../../logoText.png" />
              </figure>
            </div>
            <form>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className={`${styles.label} ${
                    !emptyUsername ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formValue.username}
                  onChange={handleInput}
                  className={`${styles.input} ${
                    !emptyUsername
                      ? `${styles.errorInput}`
                      : `${styles.normalInput}`
                  }`}
                  placeholder="Nhập tài khoản"
                />
                {!emptyUsername && (
                  <p className={`${styles.warning}`}>
                    Vui lòng nhập tài khoản!
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`${styles.label} ${
                    !emptyPassword ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="on"
                  value={formValue.password}
                  onChange={handleInput}
                  className={`${styles.input} ${
                    !emptyPassword
                      ? `${styles.errorInput}`
                      : `${styles.normalInput}`
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {!emptyPassword && (
                  <p className={`${styles.warning}`}>Vui lòng nhập mật khẩu!</p>
                )}
              </div>
              <div className={`${styles.buttonArea}`}>
                <button
                  className={`${styles.button}`}
                  onClick={handleSubmit(handleLogin)}
                >
                  {isSubmitting ? (
                    <i className="ri-loader-4-line text-2xl animate-spin"></i>
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        bodyClassName={`${styles.toastBody}`}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </HelmetProvider>
  );
};

export default LoginPage;

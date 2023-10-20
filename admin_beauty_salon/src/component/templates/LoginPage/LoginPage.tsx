import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { usePostLogin } from "@/queries/useQueries";

const LoginPage = () => {
  const router = useNavigate();

  const isLogin = JSON.parse(localStorage.getItem("userLogin")!);

  useEffect(() => {
    if (isLogin) {
      router("/");
      return;
    }
  }, []);

  const { mutate } = usePostLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>();

  const handleLogin = async (data: LoginType) => {
    mutate(data, {
      onSuccess(data) {
        localStorage.setItem("userLogin", JSON.stringify(data.data.results));
        router("/");
      },
      onError(error) {
        const err = error as ResponseErrorType;
        if (err.results.message === "Tên đăng nhập không tồn tại.") {
          toast.error("Tài khoản không tồn tại, vui lòng kiểm tra lại!");
          return;
        }
        if (err.results.message === "Mật khẩu không đúng.") {
          toast.error("Sai mật khẩu, vui lòng kiểm tra lại!");
          return;
        }
        if (err.results.message === "Tài khoản đã bị khóa.") {
          toast.error("Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên!");
          return;
        }
      },
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Login</title>
      </Helmet>
      <section>
        <div className="bg-[#f6f6f7] h-screen flex items-center justify-center">
          <div className="bg-white shadow-loginBox p-10 w-[90%] md:w-[80%] lg:w-[475px] rounded-md">
            <div className="flex items-center justify-center mb-[30px]">
              <figure className="w-[140px] h-[70px]">
                <img src="../../logoText.png" />
              </figure>
            </div>
            <form>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-normal ${
                    errors.username ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: true,
                    minLength: 5,
                    maxLength: 80,
                  })}
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.username
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Nhập tài khoản"
                />

                {errors.username?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập tài khoản!
                  </p>
                )}
                {errors.username?.type === "minLength" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập tối thiểu 5 ký tự!
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-normal ${
                    errors.password ? "text-red-700" : "text-[#666]"
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                    maxLength: 80,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/,
                  })}
                  autoComplete="on"
                  className={`border text-sm outline-none rounded-md block w-full p-2.5 ${
                    errors.password
                      ? "bg-red-50 border-red-500 placeholder-red-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password?.type === "required" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập mật khẩu!
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="mt-2 text-sm text-red-600">
                    Vui lòng nhập đúng định dạng mật khẩu!
                    <br />
                    Bao gồm ít nhất 8 ký tự, 1 chữ cái viết thường, 1 chữ cái
                    viết hoa và 1 chữ số!
                  </p>
                )}
              </div>
              <div className="mt-5 pt-5 border-t border-gray-300">
                <Link
                  to={"/"}
                  className="flex items-center justify-center w-full max-h-[42px] py-3 px-4 bg-red-500 rounded-md hover:bg-red-600 text-white"
                  onClick={handleSubmit(handleLogin)}
                >
                  {isSubmitting ? (
                    <i className="ri-loader-4-line text-2xl animate-spin"></i>
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default LoginPage;

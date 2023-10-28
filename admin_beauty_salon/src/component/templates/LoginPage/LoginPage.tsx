import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { usePostLogin } from '@/hooks/hooks'

const LoginPage = () => {
  const router = useNavigate()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  useEffect(() => {
    if (isLogin) {
      router('/danh-muc-cap-1')
      return
    }
  }, [])

  const loginApi = usePostLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>()

  const handleLogin = (data: LoginType) => {
    loginApi.mutate(data, {
      onSuccess(data) {
        localStorage.setItem('userLogin', JSON.stringify(data.data.results))
        router('/danh-muc-cap-1')
      },
      onError(error) {
        const err = error as ResponseErrorType
        if (err.results.message === 'Tên đăng nhập không tồn tại.') {
          toast.error('Tài khoản không tồn tại, vui lòng kiểm tra lại!')
          return
        }
        if (err.results.message === 'Mật khẩu không đúng.') {
          toast.error('Sai mật khẩu, vui lòng kiểm tra lại!')
          return
        }
        if (err.results.message === 'Tài khoản đã bị khóa.') {
          toast.error('Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên!')
          return
        }
      },
    })
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Login</title>
      </Helmet>
      <section>
        <div className='flex h-screen items-center justify-center bg-[#f6f6f7]'>
          <div className='w-[90%] rounded-md bg-white p-10 shadow-loginBox md:w-[80%] lg:w-[475px]'>
            <div className='mb-[30px] flex items-center justify-center'>
              <figure className='h-[70px] w-[140px]'>
                <img src='../../logoText.png' />
              </figure>
            </div>
            <form>
              <div className='mb-5'>
                <label
                  htmlFor='username'
                  className={`mb-2 block text-sm font-normal ${
                    errors.username ? 'text-red-600' : 'text-textPrimaryColor'
                  }`}
                >
                  Tài khoản
                </label>
                <input
                  type='text'
                  id='username'
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập tài khoản!',
                    },
                  })}
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.username
                      ? 'border-red-500 bg-red-50 placeholder-red-400'
                      : 'border-gray-300 bg-white'
                  }`}
                  placeholder='Nhập tài khoản'
                />
                <p className='mt-2 text-sm text-red-600'>
                  {errors.username?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className={`mb-2 block text-sm font-normal ${
                    errors.password ? 'text-red-600' : 'text-textPrimaryColor'
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type='password'
                  id='password'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Vui lòng nhập mật khẩu!',
                    },
                  })}
                  autoComplete='on'
                  className={`block w-full rounded-md border p-3 text-sm outline-none ${
                    errors.password
                      ? 'border-red-500 bg-red-50 placeholder-red-400'
                      : 'border-gray-300 bg-white'
                  }`}
                  placeholder='Nhập mật khẩu'
                />
                <p className='mt-2 text-sm text-red-600'>
                  {errors.password?.message}
                </p>
              </div>
              <div className='mt-5 border-t border-gray-300 pt-5'>
                <button
                  className='flex max-h-[42px] w-full items-center justify-center rounded-md bg-red-500 px-4 py-3 text-white hover:bg-red-600'
                  onClick={handleSubmit(handleLogin)}
                >
                  {loginApi.isLoading ? (
                    <i className='ri-loader-4-line animate-spin text-2xl'></i>
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </HelmetProvider>
  )
}

export default LoginPage

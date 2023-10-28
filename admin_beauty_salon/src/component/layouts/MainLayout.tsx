import { useState, useEffect } from 'react'
import { useIsFetching, useIsMutating } from 'react-query'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

import { useGetUserInfo, usePostLogout } from '@/hooks/hooks'
import { dataNavigation } from '@/utils/data'

import images from '@/assets/images'

interface Props {
  children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  const location = useLocation()
  const router = useNavigate()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  useEffect(() => {
    if (!isLogin) {
      router('/dang-nhap')
      return
    }
  }, [])

  const userInfo = useGetUserInfo(isLogin?.session)

  const [navMobile, setNavMobile] = useState<boolean>(true)

  const logout = usePostLogout()

  const handleLogout = async () => {
    logout.mutate()
    localStorage.removeItem('userLogin')
    router('/dang-nhap')
  }

  return (
    <section>
      {/* Header */}
      <header className='fixed inset-0 z-50 flex h-16 w-full items-center justify-between bg-white px-[10px] py-2 shadow-headerBox'>
        <div className='flex items-center gap-1'>
          <Link to={'/danh-muc-cap-1'} className='h-full w-[90px]'>
            <figure>
              <img src='../../logoText.png' />
            </figure>
          </Link>
          <i
            className='ri-menu-line p-4 text-2xl sm:hidden'
            onClick={() => setNavMobile(!navMobile)}
          ></i>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex flex-col text-sm text-textPrimaryColor sm:flex-row'>
            <p>Xin chào,&nbsp;</p>
            <p>{userInfo.data?.results.fullName}</p>
          </div>
          <div className='group relative'>
            <figure className='h-[35px] w-[35px] rounded-full bg-red-100 hover:cursor-pointer'>
              <img
                crossOrigin='anonymous'
                src={userInfo.data?.results.avatar || images.avatar}
                className='rounded-full'
                alt='avatar'
              />
            </figure>
            <div className="absolute right-0 top-[44px] hidden w-max items-center gap-2 rounded-md bg-white p-3 shadow-menuBox before:absolute before:right-0 before:top-[-13px] before:h-[20px] before:w-[50px] before:bg-transparent before:content-[''] group-hover:flex">
              <div className='relative'>
                <figure className='h-[75px] w-[75px]'>
                  <img
                    crossOrigin='anonymous'
                    src={userInfo.data?.results.avatar || images.avatar}
                    className='rounded-full'
                    alt='avatar'
                  />
                </figure>
              </div>
              <ul className='text-sm text-textPrimaryColor [&>:hover]:bg-red-50 [&>:hover]:text-red-600'>
                {userInfo.data?.results.role === 'admin' && (
                  <li>
                    <Link
                      to={'/danh-sach-nguoi-dung'}
                      className='block h-full w-full cursor-pointer px-3 py-2'
                    >
                      Xác thực và ủy quyền
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to={`/chinh-sua-tai-khoan`}
                    className='block h-full w-full cursor-pointer px-3 py-2'
                  >
                    Sửa thông tin
                  </Link>
                </li>
                <li onClick={handleLogout} className='cursor-pointer px-3 py-2'>
                  Đăng xuất
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className='mt-16 grid max-h-full min-h-screen grid-cols-12 gap-y-0 bg-[#f6f6f7]'>
        <div className='col-span-3 hidden min-h-full overflow-y-auto border-r-4 border-solid border-red-500 sm:block lg:col-span-2'>
          <ul className='bg-white pr-[10px] sm:bg-inherit [&>*:first-child]:mt-5 [&>*:last-child]:mb-5'>
            <li>
              <div className='pl-2 text-sm font-semibold uppercase lg:ml-2'>
                <span className='leading-8 text-textHeadingColor'>Mục lục</span>
              </div>
              <ul className='text-sm text-textPrimaryColor [&>:hover]:text-red-600 [&>li]:cursor-pointer'>
                {dataNavigation.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className='group mb-[3px] flex items-center gap-2'
                    >
                      {location.pathname === item.path ? (
                        <span className='h-11 w-1.5 rounded-full border-2 border-red-500 bg-red-500'></span>
                      ) : (
                        <span className='h-11 w-1.5 rounded-full '></span>
                      )}
                      <div
                        className={`flex w-full items-center gap-2 p-2 hover:bg-red-100 ${
                          location.pathname === item.path &&
                          'rounded bg-red-100 text-red-600'
                        }`}
                      >
                        {
                          <span
                            className='text-xl'
                            dangerouslySetInnerHTML={{
                              __html: `${item.icon}`,
                            }}
                          ></span>
                        }
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className='pl-2 text-sm font-semibold uppercase lg:ml-2'>
                <span className='leading-8 text-textHeadingColor'>
                  Liên kết nhanh
                </span>
              </div>
              <ul className='relative max-h-[800px] overflow-auto pl-4 text-sm text-textPrimaryColor'>
                <li className="relative after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                  <p className='my-2 cursor-pointer hover:text-red-500'>
                    Danh sách sản phẩm
                  </p>
                  <ul className='ml-6'>
                    <li className="relative after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2 cursor-pointer hover:text-red-500'>
                        Danh sách sản phẩm 1
                      </p>
                      <ul className='ml-8'>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                      </ul>
                      <ul className='ml-8'>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                      </ul>
                      <ul className='ml-8'>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                      </ul>
                    </li>
                    <li className="relative my-2 after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2 cursor-pointer hover:text-red-500'>
                        Danh sách sản phẩm 1
                      </p>
                      <ul className='ml-8'>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-red-600'>
                          Danh sách sản phẩm 2
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          className={`fixed inset-0 z-[100] overflow-y-auto bg-white transition-all sm:hidden ${
            navMobile
              ? '-translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
          }`}
        >
          <i
            className='ri-close-fill absolute right-7 top-7 flex h-[30px] w-[30px] items-center justify-center rounded-full text-3xl hover:text-red-500'
            onClick={() => setNavMobile(!navMobile)}
          ></i>
          <ul className='overflow-y-auto [&>*:first-child]:mt-12 [&>*:last-child]:mb-12 [&>*:last-child]:mt-2 [&>li]:px-5'>
            <li>
              <div className='pl-2 text-base font-semibold uppercase lg:ml-2'>
                <span className='text-base leading-8 text-textHeadingColor'>
                  Mục lục
                </span>
              </div>
              <ul className='text-sm text-textPrimaryColor [&>:hover]:text-red-600 [&>li]:cursor-pointer [&>li]:text-lg'>
                {dataNavigation.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className='group flex items-center gap-2'
                    >
                      {location.pathname === item.path ? (
                        <span className='h-11 w-1.5 rounded-full border-2 border-red-500 bg-red-500'></span>
                      ) : (
                        <span className='h-11 w-1.5 rounded-full '></span>
                      )}
                      <div
                        className={`flex w-full items-center gap-2 p-2 hover:bg-red-100 ${
                          location.pathname === item.path &&
                          'rounded bg-red-100 text-red-600'
                        }`}
                      >
                        {
                          <span
                            className='text-xl'
                            dangerouslySetInnerHTML={{
                              __html: `${item.icon}`,
                            }}
                          ></span>
                        }
                        <span className='group-hover:before:scale-x-100'>
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className='pl-2 text-base font-semibold uppercase lg:ml-2'>
                <span className='leading-8 text-textHeadingColor'>
                  Liên kết nhanh
                </span>
              </div>
              <ul className='relative max-h-[800px] overflow-auto pl-4 text-lg text-textPrimaryColor'>
                <li className="relative after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                  <p className='my-2'>Danh sách sản phẩm</p>
                  <ul className='ml-6'>
                    <li className="relative my-2 after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2'>Danh sách sản phẩm 1</p>
                      <ul className='ml-8'>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                    <li className="relative my-2 after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2'>Danh sách sản phẩm 1</p>
                      <ul className='ml-8'>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                  </ul>
                  <ul className='ml-6'>
                    <li className="relative my-2 after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2'>Danh sách sản phẩm 1</p>
                      <ul className='ml-8'>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                    <li className="relative my-2 after:absolute after:left-[1px] after:top-2 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2'>Danh sách sản phẩm 1</p>
                      <ul className='ml-8'>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='col-span-12 p-5 md:col-span-9 lg:col-span-10'>
          {children}
          <footer className='mt-10'>
            <hr className='my-3 border-gray-300 sm:mx-auto lg:my-4' />
            <span className='block text-sm text-gray-400 sm:text-center '>
              © 2023 Bản quyền thuộc sở hữu của Pando Software.
            </span>
          </footer>
        </div>
        {isFetching + isMutating !== 0 && (
          <div role='status' className='fixed bottom-10 right-10'>
            <svg
              aria-hidden='true'
              className='mr-2 h-14 w-14 animate-spin fill-red-500 text-gray-200'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default MainLayout

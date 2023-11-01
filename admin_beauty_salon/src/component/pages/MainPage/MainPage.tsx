import { useState, useEffect, ReactNode } from 'react'
import { useIsFetching, useIsMutating } from 'react-query'
import { useNavigate, useLocation } from 'react-router-dom'

import { useGetUserInfo, usePostLogout } from '@/hooks/hooks'
import { dataNavigation } from '@/utils/data'

import images from '@/assets/images'
import Button from '../../atoms/Button'
import { SpinnerIcon } from '../../atoms/CustomIcon/CustomIcon'

interface Props {
  children?: ReactNode
}

const MainPage = ({ children }: Props) => {
  const location = useLocation()
  const router = useNavigate()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const isLogin = JSON.parse(localStorage.getItem('userLogin')!)

  const getUserInfoApi = useGetUserInfo(isLogin?.session)

  const [navMobile, setNavMobile] = useState<boolean>(true)

  const logoutApi = usePostLogout()

  const handleLogout = async () => {
    logoutApi.mutate()
    localStorage.removeItem('userLogin')
    router('/dang-nhap')
  }

  return (
    <section>
      <header className='fixed inset-0 z-50 flex h-16 w-full items-center justify-between bg-white px-[10px] py-2 shadow-headerBox'>
        <div className='flex items-center gap-1'>
          <Button to={'/danh-muc-cap-1'} className='h-full w-[90px]'>
            <figure>
              <img src='../../logoText.png' />
            </figure>
          </Button>
          <i
            className='ri-menu-line p-4 text-2xl sm:hidden'
            onClick={() => setNavMobile(!navMobile)}
          ></i>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex flex-col text-sm text-textPrimaryColor sm:flex-row'>
            <p>Xin chào,&nbsp;</p>
            <p>{getUserInfoApi.data?.results.fullName}</p>
          </div>
          <div className='group relative'>
            <figure className='h-[35px] w-[35px] rounded-full bg-red-100 hover:cursor-pointer'>
              <img
                crossOrigin='anonymous'
                src={getUserInfoApi.data?.results.avatar || images.avatar}
                className='rounded-full'
                alt='avatar'
              />
            </figure>
            <div className="absolute right-0 top-[44px] hidden w-max items-center gap-2 rounded-md bg-white p-3 shadow-menuBox before:absolute before:right-0 before:top-[-13px] before:h-[20px] before:w-[50px] before:bg-transparent before:content-[''] group-hover:flex">
              <div className='relative'>
                <figure className='h-[75px] w-[75px]'>
                  <img
                    crossOrigin='anonymous'
                    src={getUserInfoApi.data?.results.avatar || images.avatar}
                    className='rounded-full'
                    alt='avatar'
                  />
                </figure>
              </div>
              <ul className='text-sm text-textPrimaryColor [&>:hover]:bg-red-50 [&>:hover]:text-secondColor'>
                {getUserInfoApi.data?.results.role === 'admin' && (
                  <li>
                    <Button
                      to={'/danh-sach-nguoi-dung'}
                      className='block h-full w-full cursor-pointer px-3 py-2'
                    >
                      Xác thực và ủy quyền
                    </Button>
                  </li>
                )}
                <li>
                  <Button
                    to={`/chinh-sua-tai-khoan`}
                    className='block h-full w-full cursor-pointer px-3 py-2'
                  >
                    Sửa thông tin
                  </Button>
                </li>
                <li
                  onClick={handleLogout}
                  className='block h-full w-full cursor-pointer px-3 py-2'
                >
                  Đăng xuất
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className='mt-16 grid max-h-full min-h-screen grid-cols-12 gap-y-0 bg-[#f6f6f7]'>
        <div className='col-span-3 hidden min-h-full overflow-y-auto border-r-4 border-solid border-primaryColor sm:block lg:col-span-2'>
          <ul className='bg-white pr-[10px] sm:bg-inherit [&>*:first-child]:mt-5 [&>*:last-child]:mb-5'>
            <li>
              <div className='pl-2 text-sm font-semibold uppercase lg:ml-2'>
                <span className='leading-8 text-textHeadingColor'>Mục lục</span>
              </div>
              <ul className='text-sm text-textPrimaryColor [&>:hover]:text-secondColor [&>li]:cursor-pointer'>
                {dataNavigation.map((item, index) => (
                  <li key={index}>
                    <Button
                      to={item.path}
                      className='group mb-[3px] flex items-center gap-2'
                    >
                      {location.pathname === item.path ? (
                        <span className='h-11 w-1.5 rounded-full border-2 border-primaryColor bg-primaryColor'></span>
                      ) : (
                        <span className='h-11 w-1.5 rounded-full '></span>
                      )}
                      <div
                        className={`flex w-full items-center gap-2 p-2 hover:bg-red-100 ${
                          location.pathname === item.path &&
                          'rounded bg-red-100 text-secondColor'
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
                    </Button>
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
                <li className="relative after:absolute after:left-[1px] after:top-5 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                  <p className='my-2 cursor-pointer hover:text-secondColor'>
                    Danh sách sản phẩm
                  </p>
                  <ul className='ml-6'>
                    <li className="relative after:absolute after:left-[1px] after:top-5 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2 cursor-pointer hover:text-secondColor'>
                        Danh sách sản phẩm 1
                      </p>
                      <ul className='ml-8'>
                        <li className='cursor-pointer p-1 hover:text-secondColor'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-secondColor'>
                          Danh sách sản phẩm 2
                        </li>
                        <li className='cursor-pointer p-1 hover:text-secondColor'>
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
            className='ri-close-fill absolute right-7 top-7 flex h-[30px] w-[30px] items-center justify-center rounded-full text-3xl hover:text-secondColor'
            onClick={() => setNavMobile(!navMobile)}
          ></i>
          <ul className='overflow-y-auto [&>*:first-child]:mt-12 [&>*:last-child]:mb-12 [&>*:last-child]:mt-2 [&>li]:px-5'>
            <li>
              <div className='pl-2 text-base font-semibold uppercase lg:ml-2'>
                <span className='text-base leading-8 text-textHeadingColor'>
                  Mục lục
                </span>
              </div>
              <ul className='text-sm text-textPrimaryColor [&>:hover]:text-secondColor [&>li]:cursor-pointer [&>li]:text-lg'>
                {dataNavigation.map((item, index) => (
                  <li key={index}>
                    <Button
                      to={item.path}
                      className='group flex items-center gap-2'
                    >
                      {location.pathname === item.path ? (
                        <span className='h-11 w-1.5 rounded-full border-2 border-primaryColor bg-primaryColor'></span>
                      ) : (
                        <span className='h-11 w-1.5 rounded-full '></span>
                      )}
                      <div
                        className={`flex w-full items-center gap-2 p-2 hover:bg-red-100 ${
                          location.pathname === item.path &&
                          'rounded bg-red-100 text-secondColor'
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
                    </Button>
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
                <li className="relative after:absolute after:left-[1px] after:top-5 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                  <p className='my-2'>Danh sách sản phẩm</p>
                  <ul className='ml-6'>
                    <li className="relative my-2 after:absolute after:left-[1px] after:top-5 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
                      <p className='my-2'>Danh sách sản phẩm 1</p>
                      <ul className='ml-8'>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                        <li className='p-1'>Danh sách sản phẩm 2</li>
                      </ul>
                    </li>
                    <li className="relative my-2 after:absolute after:left-[1px] after:top-5 after:h-full after:border-l after:border-dashed after:border-gray-500 after:content-['']">
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
            <SpinnerIcon />
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default MainPage

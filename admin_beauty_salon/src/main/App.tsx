import React, { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const NotFoundPage = React.lazy(() => import('@/component/pages/404Page'))
const HomePage = React.lazy(() => import('@/component/templates/HomePage'))
const LoginPage = React.lazy(() => import('@/component/templates/LoginPage'))
const EditorLandingPage = React.lazy(
  () => import('@/component/templates/EditorLandingPage'),
)

const Loading = () => {
  return (
    <div className='flex h-full h-screen w-full items-center justify-center'>
      <div className='flex items-center justify-center space-x-1 text-sm text-primaryColor'>
        <svg
          fill='none'
          className='h-16 w-16 animate-spin text-primaryColor'
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </svg>
        <div className='text-lg'>Loading ...</div>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const { pathname } = useLocation()

  const [suspended, setSuspended] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => setSuspended((s) => (s ? s : !s)), 500)
  }, [])

  const router = useNavigate()

  useEffect(() => {
    if (pathname === '/') router('/danh-muc-cap-1')
  }, [])

  const elements = useRoutes([
    { path: '*', element: <NotFoundPage /> },
    {
      path: '/danh-muc-cap-1',
      element: <HomePage path='listCategory' />,
    },
    {
      path: '/danh-muc-cap-2',
      element: <HomePage path='listCategory' />,
    },
    {
      path: '/danh-muc-cap-3',
      element: <HomePage path='listCategory' />,
    },
    {
      path: '/danh-sach-bai-viet',
      element: <HomePage path='listPostAndProduct' />,
    },
    {
      path: '/danh-sach-san-pham',
      element: <HomePage path='listPostAndProduct' />,
    },
    {
      path: '/danh-sach-lich-hen',
      element: <HomePage path='listSchedule' />,
    },
    {
      path: '/danh-sach-binh-luan',
      element: <HomePage path='listComment' />,
    },
    {
      path: '/xac-thuc-uy-quyen',
      element: <HomePage path='addAccount' />,
    },
    {
      path: '/chinh-sua-tai-khoan',
      element: <HomePage path='editMyAccount' />,
    },
    {
      path: '/chinh-sua-tai-khoan/:id',
      element: <HomePage path='editUserAccount' />,
    },
    {
      path: '/danh-sach-nguoi-dung',
      element: <HomePage path='listAccount' />,
    },
    {
      path: '/tao-danh-muc-cap-1',
      element: <HomePage path='createCategory' />,
    },
    {
      path: '/tao-danh-muc-cap-1/:id',
      element: <HomePage path='createCategory' />,
    },
    {
      path: '/tao-danh-muc-cap-2',
      element: <HomePage path='createCategory' />,
    },
    {
      path: '/tao-danh-muc-cap-2/:id',
      element: <HomePage path='createCategory' />,
    },
    {
      path: '/tao-danh-muc-cap-3',
      element: <HomePage path='createCategory' />,
    },
    {
      path: '/tao-danh-muc-cap-3/:id',
      element: <HomePage path='createCategory' />,
    },
    {
      path: '/tao-trang-bai-viet',
      element: <HomePage path='createPost' />,
    },
    {
      path: '/tao-trang-bai-viet/:id/:slug',
      element: <HomePage path='createPost' />,
    },
    {
      path: '/tao-trang-san-pham',
      element: <HomePage path='createPost' />,
    },
    {
      path: '/tao-trang-san-pham/:id/:slug',
      element: <HomePage path='createPost' />,
    },
    {
      path: '/dang-nhap',
      element: <LoginPage />,
    },
    {
      path: '/tao-trang-landing-page',
      element: <EditorLandingPage />,
    },
    {
      path: '/tao-trang-landing-page/:id',
      element: <EditorLandingPage />,
    },
  ])

  return (
    <div className='App'>
      <Suspense fallback={<Loading />}>
        {suspended ? (
          <>
            {elements}
            <ToastContainer
              position='bottom-right'
              autoClose={1500}
              bodyClassName='font-beVietnam text-sm'
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </>
        ) : (
          <Loading />
        )}
      </Suspense>
    </div>
  )
}

export default App

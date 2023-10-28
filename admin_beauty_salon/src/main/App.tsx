import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "@/component/templates/HomePage";
import LoginPage from "@/component/templates/LoginPage";
import EditorLandingPage from "@/component/templates/EditorLandingPage";

const App: React.FC = () => {
  const elements = useRoutes([
    {
      path: "/danh-muc-cap-1",
      element: <HomePage path="tableCategory" />,
    },
    {
      path: "/danh-muc-cap-2",
      element: <HomePage path="tableCategoryWithLevel" />,
    },
    {
      path: "/danh-muc-cap-3",
      element: <HomePage path="tableCategoryWithLevel" />,
    },
    {
      path: "/danh-sach-bai-viet",
      element: <HomePage path="tableListPost" />,
    },
    {
      path: "/danh-sach-san-pham",
      element: <HomePage path="tableListPost" />,
    },
    {
      path: "/danh-sach-lich-hen",
      element: <HomePage path="tableSchedule" />,
    },
    {
      path: "/danh-sach-binh-luan",
      element: <HomePage path="tableComments" />,
    },
    {
      path: "/xac-thuc-uy-quyen",
      element: <HomePage path="addAccount" />,
    },
    {
      path: "/chinh-sua-tai-khoan",
      element: <HomePage path="editMyAccount" />,
    },
    {
      path: "/chinh-sua-tai-khoan/:id",
      element: <HomePage path="editUserAccount" />,
    },
    {
      path: "/danh-sach-nguoi-dung",
      element: <HomePage path="listAccount" />,
    },
    {
      path: "/tao-danh-muc-cap-1",
      element: <HomePage path="createCategory" />,
    },
    {
      path: "/tao-danh-muc-cap-2",
      element: <HomePage path="createCategory" />,
    },
    {
      path: "/tao-danh-muc-cap-3",
      element: <HomePage path="createCategory" />,
    },
    {
      path: "/tao-trang-bai-viet",
      element: <HomePage path="createPost" />,
    },
    {
      path: "/tao-trang-bai-viet/:id/:slug",
      element: <HomePage path="createPost" />,
    },
    {
      path: "/tao-trang-san-pham",
      element: <HomePage path="createPost" />,
    },
    {
      path: "/tao-trang-san-pham/:id/:slug",
      element: <HomePage path="createPost" />,
    },
    {
      path: "/dang-nhap",
      element: <LoginPage />,
    },
    {
      path: "/tao-trang-landing-page",
      element: <EditorLandingPage />,
    },
    {
      path: "/tao-trang-landing-page/:id",
      element: <EditorLandingPage />,
    },
  ]);
  return (
    <div className="App">
      {elements}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        bodyClassName="font-beVietnam text-sm"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;

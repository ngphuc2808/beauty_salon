import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "@/component/templates/HomePage";
import LoginPage from "@/component/templates/LoginPage";
import EditorLandingPage from "@/component/templates/EditorLandingPage";

const App: React.FC = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <HomePage path="table" />,
    },
    {
      path: "/auth",
      element: <HomePage path="addAccount" />,
    },
    {
      path: "/edit-account",
      element: <HomePage path="editMyAccount" />,
    },
    {
      path: "/edit-account/:id",
      element: <HomePage path="editUserAccount" />,
    },
    {
      path: "/list-user",
      element: <HomePage path="listAccount" />,
    },
    {
      path: "/create-category",
      element: <HomePage path="detailCategory" />,
    },
    {
      path: "/create-seo-page",
      element: <HomePage path="createPost" />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/create-landing-page",
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

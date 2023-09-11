import config from "../config";
import LoginPage from "../component/LoginPage";
import HomePage from "../component/HomePage";

//public routes
const publicRoutes = [
  {
    path: config.routes.login,
    component: LoginPage,
  },
  {
    path: config.routes.home,
    component: HomePage,
  },
];

export { publicRoutes };

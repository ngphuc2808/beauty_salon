import config from "../config";
import LoginPage from "@/component/templates/LoginPage";
import HomePage from "@/component/templates/HomePage";

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

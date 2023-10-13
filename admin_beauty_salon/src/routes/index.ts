import config from "../config";
import LoginPage from "@/component/templates/LoginPage";
import HomePage from "@/component/templates/HomePage";
import EditorLandingPage from "@/component/templates/EditorLandingPage";
import TestPage from "@/component/templates/TestPage";

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
  ,
  {
    path: config.routes.landingPage,
    component: EditorLandingPage,
  },
  {
    path: config.routes.testPage,
    component: TestPage,
  },
];

export { publicRoutes };

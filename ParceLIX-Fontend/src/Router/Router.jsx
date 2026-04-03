import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Signup from "../Pages/RegisterForm/Singup";
import Login from "../Pages/RegisterForm/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: "/", Component: Home },
      { path: "coverage", Component: Coverage },
      { path: "signup", Component: Signup },
      { path: "login", Component: Login },
    ],
  },
]);

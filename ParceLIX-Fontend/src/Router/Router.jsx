import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Signup from "../Pages/RegisterForm/Singup";
import Login from "../Pages/RegisterForm/Login";
import ParcelSend from "../Pages/ParcelSend/ParcelSend";
import PrivateRouter from "./PrivateRouter";
import DeashbordLayout from "../Layout/DeashbordLayout";
import Deashbord from "../Pages/deashbord/Deashbord";
import ParcelDetails from "../Pages/deashbord/ParcelDetails";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentError from "../Pages/Payment/PaymentError";
import PaymentHistory from "../Pages/Payment/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "coverage", Component: Coverage },
      { path: "signup", Component: Signup },
      { path: "login", Component: Login },
      {
        path: "parcelsend",
        element: (
          <PrivateRouter>
            <ParcelSend></ParcelSend>{" "}
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/deashbord",
    element: (
      <PrivateRouter>
        <DeashbordLayout></DeashbordLayout>
      </PrivateRouter>
    ),
    children: [
      { index: true, Component: Deashbord },
      { path: "parcelsend", Component: ParcelSend },
      { path: "parcelDetails", Component: ParcelDetails },
      { path: "paymentSuccess", Component: PaymentSuccess },
      { path: "paymentError", Component: PaymentError },
      { path: "paymentHistory", Component: PaymentHistory },
    ],
  },
]);

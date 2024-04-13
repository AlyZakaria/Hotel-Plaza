import { createBrowserRouter } from "react-router-dom";
import Billing from "../components/Billing/Billing";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import OTP from "../pages/OTP/OTP";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import Home from "../pages/Home/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/otp",
    element: <OTP></OTP>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "*",
    element: <h1>ERROR 404 Not Found!</h1>,
  },
  {
    path: "/billing",
    element: <Billing></Billing>,
  },
  {
    path: "/resetpassword",
    element: <ForgetPassword></ForgetPassword>,
  },
  
]);

export default router;

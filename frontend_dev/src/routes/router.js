import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/Landing/Landing";
import Billing from "../components/Billing/Billing";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing></Landing>,
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
]);

export default router;

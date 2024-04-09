import { createBrowserRouter } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppBar></AppBar>,
  },
]);

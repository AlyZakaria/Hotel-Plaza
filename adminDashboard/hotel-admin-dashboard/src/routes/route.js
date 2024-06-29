import { createBrowserRouter } from "react-router-dom";
// import RoomTypeDetails from "../components/RoomTypeDetails/RoomTypeDetails";
import RoomDetails from "../pages/RoomDetails";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
]);

export default router;

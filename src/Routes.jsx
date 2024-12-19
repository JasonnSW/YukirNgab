import { createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import Parkir from "../src/pages/Parkir";
import Slot from "./pages/Slot";
import History from "./pages/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/lihat_parkir",
    element: <Parkir />,
  },
  {
    path: "/lihat_parkir/:nama",
    element: <Slot />,
  },
]);

export default router;

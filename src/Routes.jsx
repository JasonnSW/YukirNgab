import { createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";

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
]);

export default router;

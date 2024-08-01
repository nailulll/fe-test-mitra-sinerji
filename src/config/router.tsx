import AuthLayout from "@/components/layouts/auth-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

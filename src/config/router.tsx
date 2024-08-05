import RootLayout from "@/components/layouts/root-layout";
import DetailPage from "@/pages/detail-page";
import FormInputPage from "@/pages/form-input/form-input-page";
import RootPage from "@/pages/root/root-page";
import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <RootPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "/form",
        element: <FormInputPage />,
      },
    ],
  },
]);

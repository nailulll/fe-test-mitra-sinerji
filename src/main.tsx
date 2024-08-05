import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./config/router.tsx";
import ReactQueryClientProvider from "./components/providers/query-client-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactQueryClientProvider>
    <RouterProvider router={router} />
  </ReactQueryClientProvider>
);

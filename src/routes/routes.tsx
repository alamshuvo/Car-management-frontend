import App from "@/App";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Login from "@/pages/login";
import { routeGenerator } from "@/utils/routeGenerator";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
     
    ],
    
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;

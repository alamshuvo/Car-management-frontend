import App from "@/App";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { routeGenerator } from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router";
import { adminPaths } from "./admin.route";
import Login from "@/pages/Login";
import { userPath } from "./user.route";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserDashboard from "@/pages/user/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard></AdminDashboard>
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <UserDashboard></UserDashboard>
      </ProtectedRoute>
    ),
    children: routeGenerator(userPath),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;

import App from "@/App";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { routeGenerator } from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router";
import { adminPaths } from "./admin.route";
import Login from "@/pages/Login";
import { userPath } from "./user.route";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AllCars from "@/pages/user/AllCars";
import MainLayout from "@/components/layout/MainLayout";
import SingleCar from "@/pages/user/SingleCar";
import Order from "@/components/components/order/Order";
import OrderDetails from "@/components/components/order/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <App></App>,
      },
      {
        path: "/all-cars",
        element: <AllCars></AllCars>,
      },
      {
        path: `/cars/:id`,
        element: <SingleCar></SingleCar>,
      },
      {
        path: "/order",
        element: <Order></Order>,
      },
      {
       path:"/order/verify",
       element:<OrderDetails></OrderDetails>
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <DashboardLayout></DashboardLayout>
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

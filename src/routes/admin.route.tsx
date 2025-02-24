import AdminDashboard from "@/pages/admin/AdminDashboard";
import ViewOrders from "@/pages/admin/ViewOrders";

export const adminPaths = [
    {
        name:"Dashboard",
        path:"dashboard",
        element:<AdminDashboard></AdminDashboard>
    },
    {
        name:"Manage Product",
        path:"manage-product",
        element:<AdminDashboard></AdminDashboard>
    },
    {
        name:"View orders",
        path:"view-orders",
        element:<ViewOrders></ViewOrders>
    },
    
]
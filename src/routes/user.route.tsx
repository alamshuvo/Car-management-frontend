import OrderHistory from "@/pages/user/orderHistory";
import UserDashboard from "@/pages/user/UserDashboard";


export const userPath =[
    {
        name:"My Dashboard",
        path:"dashboard",
        element:<UserDashboard></UserDashboard>,
    },
    {
        name:"Order History",
        path:"order-history",
        element:<OrderHistory></OrderHistory>
    }
]
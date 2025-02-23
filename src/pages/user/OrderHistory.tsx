import { useCurentToken } from "@/redux/auth/authSlice";
import { useGetOrderByIdQuery } from "@/redux/features/order/order";
import { useGetMeMutation } from "@/redux/features/userApi/userApi";
import { useAppSelector } from "@/redux/hook";
import { varifyToken } from "@/utils/verifyToken";
import { Skeleton, Table, Tag } from "antd";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const OrderHistory:React.FC = () => {
  const token = useAppSelector(useCurentToken);
  const user = token ? varifyToken(token) : null;

  // ✅ Correctly use the user fetch mutation
  const [getMe, { data: userData, error: userError, isLoading: userLoading }] =
    useGetMeMutation();
  const [userId, setUserId] = useState(null);

  // Fetch user details
  useEffect(() => {
    if (user?.userEmail) {
      getMe(user.userEmail)
        .unwrap()
        .then((res) => {
          setUserId(res?.data?._id); // ✅ Set user ID after fetching user details
        })
        .catch((err) => console.error("User fetch error:", err));
    }
  }, [user?.userEmail, getMe]);

  // Fetch orders using the user ID
  const {
    data: orderData,
    error: orderError,
    isLoading: orderLoading,
  } = useGetOrderByIdQuery(userId, {
    skip: !userId, // Skip the query if userId is not available
  });

  const mapAbleOrderData = orderData?.data;

interface Order {
    _id: string;
    transaction: {
        method: string;
        id: string;
    };
    car: {
        quantity: number;
    }[];
    totalPrice: number;
    status: string;
}

interface DataSource {
    key: string;
    orderId: string;
    PaymentMethod: string;
    quantity: number;
    totalPrice: number;
    transactionId: string;
    status: string;
}

const dataSource: DataSource[] =
    mapAbleOrderData?.map((order: Order, index: number) => ({
        key: index.toString(), // Use index as a unique key
        orderId: order._id, // Assuming order has an _id field for Order ID
        PaymentMethod: order.transaction.method, // Adjust these based on your actual data structure
        quantity: order.car[0].quantity,
        totalPrice: order.totalPrice,
        transactionId: order.transaction.id,
        status: order.status,
    })) || [];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text:string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Payment Method",
      dataIndex: "PaymentMethod",
      key: "PaymentMethod",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text:string) => <Tag className="flex justify-center items-center gap-2 text-xl" color="green">{text}<ShoppingBag className="" size={20}></ShoppingBag></Tag>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text:string) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text:string) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text:string) => <Tag color="orange">{text}</Tag>,
    },
  ];

  if (userLoading || orderLoading) {
    return <Skeleton />;
  }
  if (userError || orderError) {
    return <Tag color="red">Error fetching data</Tag>;
  }
  return (
    <div>
      <div className="p-6 shadow-2xl rounded-lg">
        <div className="flex flex-col justify-center items-center my-5 space-y-5">
          <h1 className="font-bold text-2xl ">My Orders</h1>
          <p>Manage And Track all my orders</p>
        </div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default OrderHistory;

import { useCreateOrderMutation } from "@/redux/features/order/order";
import Loading from "../Loading";
import { useLocation } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { useCurentToken } from "@/redux/auth/authSlice";
import { varifyToken } from "@/utils/verifyToken";
import CarForm from "../form/CarForm";
import { Button, Tag } from "antd";
import Orderinput from "../form/OrderInput";
import CarInput from "../form/CarInput";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useGetMeMutation } from "@/redux/features/userApi/userApi";

const Order = () => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const token = useAppSelector(useCurentToken);

  let orderUser: { userEmail: string } | null = null;
  if (token) {
    orderUser = varifyToken(token);
  }

  const [createMe, { data: meData }] = useGetMeMutation();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { carData } = location.state || {};

  useEffect(() => {
    if (orderUser?.userEmail) {
      const fetchUser = async () => {
        try {
          const res = await createMe(orderUser.userEmail).unwrap();
          console.log("User Data:", res);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [createMe, orderUser?.userEmail]);

  

  useEffect(() => {
    if (carData?.price) {
      setTotalPrice(carData.price);
    }
  }, [carData]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > carData?.quantity) {
      return toast(
        `Quantity should be less than available quantity. Available: ${carData?.quantity}`
      );
    }
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * carData?.price);
  };

  const handleData = async (data: { userEmail: string; quantity: number }) => {
    if (data.quantity > carData?.quantity) {
      return toast(
        `Quantity should be less than available quantity. Available: ${carData?.quantity}`
      );
    }
    const orderData = {
      user: meData?.data?._id,
      car: [
        {
          car: carData._id,
          quantity: Number(data.quantity),
        },
      ],
    };

    try {
      const res = await createOrder(orderData).unwrap();
      console.log("Order Response:", res);

      if (res?.data) {
        toast.success("Order Placed Successfully");
        window.location.href = res.data; // Ensure `res.data` is a valid URL
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-1/2 mx-auto rounded-lg bg-colorsa-background shadow-2xl p-5">
        <p className="text-colorsa-text text-center my-5 text-xl font-bold">
          CheckOut
        </p>
        <CarForm onSubmit={handleData}>
          <div className="my-5">
            <div className="grid grid-cols-2 my-5 gap-2">
              <Orderinput
                type="email"
                id="email"
                name="userEmail"
                label="Email"
                value={orderUser?.userEmail}
                readOnly
              />
              <Orderinput
                type="text"
                id="quantity"
                name="quantity"
                label={`Quantity available: ${carData?.quantity}`}
                value={quantity}
                readOnly={false}
                onChange={handleQuantityChange}
              />
            </div>
            <div className="grid grid-cols-2 my-5 gap-2">
              <Orderinput
                type="text"
                id="name"
                name="name"
                label="Name Of Car"
                value={carData?.name}
                readOnly
              />
              <Orderinput
                type="number"
                id="price"
                name="price"
                label="Price"
                value={carData?.price}
                readOnly // Prevent price modification
              />
            </div>
          </div>
          <div>
            <CarInput type="text" id="address" name="address" label="Address" />
          </div>
          <div className="flex justify-between items-center gap-5">
            <Tag color="cyan" className="p-1 text-xl font-bold">
              Total Price: {totalPrice} BDT
            </Tag>
            <Button className="bg-colorsa-secondary font-semibold" htmlType="submit">
              Submit
            </Button>
          </div>
        </CarForm>
      </div>
    </div>
  );
};

export default Order;

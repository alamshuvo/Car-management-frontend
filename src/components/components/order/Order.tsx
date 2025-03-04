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
      toast(
        `Quantity should be less than available quantity. Available: ${carData?.quantity}`
      );
      return;
    }
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * carData?.price);
  };

  const handleData = async (data: { quantity: number; }): Promise<void> => {
    if (data.quantity > carData?.quantity) {
      toast(
        `Quantity should be less than available quantity. Available: ${carData?.quantity}`
      );
      return;
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
  <div className="flex justify-center items-center min-h-screen p-4">
  <div className="w-full max-w-2xl mx-auto rounded-lg bg-colorsa-background shadow-2xl p-5">
    {/* Heading */}
    <p className="text-colorsa-text text-center my-5 text-2xl font-bold">
      CheckOut
    </p>

    {/* Form Section */}
    <CarForm onSubmit={handleData}>
      <div className="my-5">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-4">
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

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-4">
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
            readOnly
          />
        </div>
      </div>

      {/* Address Field */}
      <div className="my-5">
        <CarInput type="text" id="address" name="address" label="Address" />
      </div>

      {/* Total Price & Submit Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <Tag color="cyan" className="p-2 text-lg font-bold">
          Total Price: {totalPrice} BDT
        </Tag>
        <Button className="bg-colorsa-secondary font-semibold w-full md:w-auto" htmlType="submit">
          Submit
        </Button>
      </div>
    </CarForm>
  </div>
</div>

  );
};

export default Order;

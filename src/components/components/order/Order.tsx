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
import { useState } from "react";

const Order = () => {
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const token = useAppSelector(useCurentToken);
  let orderUser;
  if (token) {
    orderUser = varifyToken(token);
  }
  console.log(orderUser);

  const { carData } = location.state || {};
  const [totalPrice, setTotalPrice] = useState(carData?.price);
  console.log(carData);
  const [createOrder, { isLoading, isSuccess, data: OrderData, isError }] =
    useCreateOrderMutation();

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    console.log(newQuantity);
    // Validate quantity
    if (newQuantity > carData?.quantity) {
      return toast(
        `Quantity should be less than available quantity. Available: ${carData?.quantity}`
      );
    }

    setQuantity(newQuantity);
    setTotalPrice(newQuantity * carData?.price);
  };

  const handleData = async (data) => {
    console.log(typeof data.userEmail);
    if (data?.quantity > carData?.quantity) {
      return toast(
        `Quantity should be less than available quantity your available quantity is ${carData?.quantity}`
      );
    }
    const orderData = {
      userEmail: data.userEmail,
      car: [
        {
          car: carData._id,
          quantity: Number(data.quantity),
        },
      ],
    };
    console.log(orderData);
    createOrder(orderData);
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex justify-center items-center h-[80vh] ">
      <div className=" w-1/2 mx-auto  rounded-lg bg-colorsa-background shadow-2xl p-5">
        <p className=" text-colorsa-text text-center my-5 text-xl font-bold">
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
              ></Orderinput>
              <Orderinput
                type="text"
                id="quantity"
                name="quantity"
                label={`Quantity available ${carData?.quantity}`}
                value={quantity}
                readOnly={false}
                onChange={handleQuantityChange}
              ></Orderinput>
            </div>
            <div className="grid grid-cols-2 my-5 gap-2">
              <Orderinput
                type="text"
                id="name"
                name="name"
                label="Name Of Car"
                value={carData?.name}
                readOnly
              ></Orderinput>
              <Orderinput
                type="number"
                id="price"
                name="price"
                label="Price"
                value={carData?.price}
                readOnly={false}
              ></Orderinput>
            </div>
          </div>
          <div>
            <CarInput
              type="text"
              id="adress"
              name="adress"
              label="Adress"></CarInput>
          </div>
          <div className="flex justify-between items-center gap-5">
            <Tag color="cyan" className="p-1 text-xl font-bold">
              Total Price :{totalPrice} BDT{" "}
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

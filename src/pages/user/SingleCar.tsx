import Loading from "@/components/components/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetCarByIdQuery } from "@/redux/features/userApi/userApi";
import { Button, Card, Image, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { Alert, Typography } from "antd";

import { useParams } from "react-router";
import {
  CheckCircleOutlined,
  RocketOutlined,
  ToolOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "@/redux/hook";
import { useCurentToken } from "@/redux/auth/authSlice";
import { ShoppingBag } from "lucide-react";

const { Text, Link } = Typography;

const SingleCar = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCarByIdQuery(id);
  const token = useAppSelector(useCurentToken);
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (!data) {
    return <p className="text-center text-red-500">Car not Found !! </p>;
  }
  const carData = data.data;
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-6 ">
        <div className="">
          <Card>
            <Image.PreviewGroup>
              <Image
                alt="example"
                src="https://carspot.scriptsbundle.com/wp-content/uploads/2017/06/1-12-400x300.jpg"
                width="100%"
              />
            </Image.PreviewGroup>
          </Card>
          <div className="mt-5">
                {token ? (
                  <div className="">
                    <Button className="w-full bg-colorsa-secondary p-5 text-xl font-semibold text-colorsa-text">Buy Now <ShoppingBag/></Button>
                  </div>
                ) : (
                  <Alert
                    message={
                      <div>
                        <Text strong>Want to purchase this product?</Text>
                        <br />
                        Please <Link href="/login">Login</Link> to your account
                        to start shopping!
                      </div>
                    }
                    type="success"
                  />
                )}
              </div>
        </div>
        <div className="">
          <Card hoverable style={{ width: 500 }}>
            <Tag
              bordered={false}
              className="mb-5 rounded-lg p-2"
              color={carData.inStock ? "green" : "red"}
            >
              {carData.inStock ? "In Stock" : "Out of Stock"}
            </Tag>
            <p className="mb-2 text-4xl">{carData.model}</p>
            <Tag className="m-2" color="blue">
              {carData.category}
            </Tag>
            <div className="mt-5">
              <Tag
                className="bg-green-100 p-1  text-xl font-bold"
                bordered={false}
              >
                BDT {carData.price}
              </Tag>
            </div>

            <Separator className="mt-5"></Separator>
            <p className="mt-5 text-2xl mb-2">Car Description</p>
            <Meta
              style={{ fontSize: 20, marginBottom: 20 }}
              description={carData.description}
            />
            <Separator></Separator>
            <div className="mt-4 space-y-2">
              <p className="font-semi-bold text-2xl">Premium Feature</p>
              <Separator className="mt-5"></Separator>
              <Card>
                <p>
                  <CheckCircleOutlined
                    style={{ color: "green", marginRight: 8 }}
                  />{" "}
                  Premium Quality Materials & Craftsmanship
                </p>
              </Card>
              <Card>
                <p>
                  <RocketOutlined style={{ color: "blue", marginRight: 8 }} />{" "}
                  Professional Grade Components
                </p>
              </Card>
              <Card>
                <p>
                  <ToolOutlined style={{ color: "orange", marginRight: 8 }} />{" "}
                  Comprehensive 1 Year Warranty
                </p>
              </Card>
              <Alert
                message="Free Premium Shipping & Assembly Available"
                type="success"
                icon={<ShoppingCartOutlined />}
                showIcon
              />
     
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleCar;

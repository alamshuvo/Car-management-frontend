import {
  useGetAllCarsQuery,
  useGetCarByIdQuery,
} from "@/redux/features/userApi/userApi";
import { TQuearyParams } from "@/types/globalt";
import { useState } from "react";
import { Badge, Button, Card, Image, Tag } from "antd";
import Loading from "../Loading";
import { useNavigate } from "react-router";

const { Meta } = Card;

const Featured = () => {
  const [params, setParams] = useState<TQuearyParams[] | undefined>(undefined);
  const { data: cars, isLoading, isFetching } = useGetAllCarsQuery(params);
  const {
    data: singleCar,
    isLoading: singleIsLoading,
    isFetching:singleIsFetching,
  } = useGetCarByIdQuery(params);
  const navigate = useNavigate();
  const handleViewAll = () => {
    console.log("view all dekhabo daraa");
    navigate("/all-cars");
  };
  const handleViewSingle = (id: string) => {
    navigate(`/cars/${id}`);
    
  };
  if (isLoading || isFetching) {
    return <Loading></Loading>;
  }
  if (singleIsLoading || singleIsFetching) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <p className="text-center text-3xl font-semi-bold">
        Featured <span className="text-colorsa-accent">Cars</span>
      </p>

      <div>
        <div className="grid grid-cols-4 gap-5">
          {cars?.data?.map((car) => (
            <div className="my-10">
              <Badge.Ribbon text={car.price} color="cyan">
                <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <Image.PreviewGroup>
                      <Image
                        alt="example"
                        src="https://carspot.scriptsbundle.com/wp-content/uploads/2017/06/1-12-400x300.jpg"
                        width="100%"
                      />
                    </Image.PreviewGroup>
                  }
                  actions={[
                    <Button
                      onClick={() => handleViewSingle(car?._id)}
                      className="bg-colorsa-secondary text-colorsa-text"
                    >
                      View Details
                    </Button>,
                  ]}
                >
                  <Meta
                    style={{
                      textAlign: "start",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                    title={car.model}
                    description={car.description}
                  />
                  <div className="flex justify-center gap-2 my-2 mt-4">
                    <Tag color="green">{car.name}</Tag>
                    <Tag color="blue">{car.category}</Tag>
                    {car?.inStock ? (
                      <Tag color="success">In Stock</Tag>
                    ) : (
                      <Tag color="error">Out of Stock</Tag>
                    )}
                    <Tag color="green">{car.year}</Tag>
                  </div>
                </Card>
              </Badge.Ribbon>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center my-10">
        <Button className="bg-colorsa-secondary " onClick={handleViewAll}>
          View All
        </Button>
      </div>
    </div>
  );
};

export default Featured;

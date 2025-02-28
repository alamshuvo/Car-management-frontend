import { useGetAllCarsQuery } from "@/redux/features/userApi/userApi";
import { Badge, Button, Card, Image, Tag } from "antd";
import Loading from "../Loading";
import { useNavigate } from "react-router";
import { TCars } from "@/types/cars.types";
const { Meta } = Card;
const Featured = () => {
  const { data: cars, isLoading, isFetching } = useGetAllCarsQuery([]);
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate("/all-cars");
  };
  const handleViewSingle = (id: string) => {
    navigate(`/cars/${id}`);
  };
  if (isLoading || isFetching) {
    return <Loading></Loading>;
  }

  const carsFeatured = cars?.data?.slice(0, 6);
  
  return (
    <div>
      <p className="text-center text-3xl font-semi-bold">
        Featured <span className="text-colorsa-accent">Cars</span>
      </p>

      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {carsFeatured?.map((car: TCars,index:string) => (
            <div key={index} className="my-10">
              <Badge.Ribbon text={car.price} color="cyan">
                <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={
                    <Image.PreviewGroup>
                      <Image
                        alt="example"
                        src={car?.image}
                        width="100%"
                        height={200}
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
                    description={car.description.slice(0,15)}
                  />
                  <div className="grid grid-cols-2 gap-2 my-2 mt-4">
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

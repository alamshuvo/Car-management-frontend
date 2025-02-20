
import { useGetAllCarsQuery } from "@/redux/features/userApi/userApi";
import { TCars } from "@/types/cars.types";
import { TQuearyParams } from "@/types/globalt";
import { Badge, Button, Card, Image, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const AllCars = () => {
  const [params, setParams] = useState<TQuearyParams[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm,setSearchTerm]=useState("")
  const navigate = useNavigate()
  const {
    data: CarsData,
    isLoading,
    isFetching,
  } = useGetAllCarsQuery([
    { name: "limit", value: 4 },
    { name: "page", value: page },
    ...params,
  ]);
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setParams(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []);
    }, 500); 

    return () => clearTimeout(delaySearch); // Cleanup timeout
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleViewSingle = (id: string) => {
    navigate(`/cars/${id}`);
  };
  console.log(CarsData);
  return (
    <div className="container  mx-auto p-10">
      <p className="text-center font-bold text-2xl">All Cars</p>

    <div className="mt-10 w-1/2 "> 
    <Search
        placeholder="input cars name"
        enterButton="Search"
        size="large"
        loading={isLoading || isFetching}
        onChange={handleSearchChange}
      />
    </div>

    <div>
    <div className="grid grid-cols-4 gap-5">
          {CarsData?.data?.map((car: TCars,index:string) => (
            <div key={index} className="my-10">
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
    </div>
  );
};

export default AllCars;

import { useGetAllCarsQuery } from "@/redux/features/userApi/userApi";
import { TCars } from "@/types/cars.types";
import { TQuearyParams } from "@/types/globalt";
import {
  Badge,
  Button,
  Card,
  Drawer,
  DrawerProps,
  Dropdown,
  Image,
  Input,
  Radio,
  RadioChangeEvent,
  Skeleton,
  Space,
  Tag,
} from "antd";
import Meta from "antd/es/card/Meta";
import Search from "antd/es/input/Search";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DownOutlined } from "@ant-design/icons";

const items = [
  {
    label:"SEDAN",
    key:"Sedan"
  },
  {
    label:"SUV",
    key:"SUV"
  },
  {
    label:"TRUCK",
    key:"Truck"
  },
  {
    label:"COUPE",
    key:"Coupe"
  },
  {
    label:"CONVERTIBLE",
    key:"Convertible"
  }
]


const AllCars = () => {
  const [params, setParams] = useState<TQuearyParams[]>([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const [selectedCategory, setSelectedCategory] = useState("Select Category"); // Initial state for selected category

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
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

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleCategory = (data)=>{
    console.log(data);
    setParams(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []);
  }
 const menuProps = {
  items,
  onClick:(e:string)=>{
    setSelectedCategory(e.key)
    handleCategory(e)
  }
 }
  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto p-10 grid grid-cols-4 gap-5">
        {CarsData?.data
          ? CarsData.data.map(
              (
                a,
                index: string //
              ) => (
                <div key={index} className="w-full p-5">
                  <Skeleton active paragraph={{ rows: 4 }} />
                </div>
              )
            )
          : [...Array(4)].map((_, index) => (
              <div key={index} className="w-full p-5">
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </div>
            ))}
      </div>
    );
  }
  return (
    <div className="container  mx-auto p-10">
      <p className="text-center font-bold text-2xl">All Cars</p>

      <div className="flex justify-between items-center my-10">
        <div className=" w-1/2 ">
          <Search
            placeholder="input cars name"
            enterButton={
              <Button style={{ background: "#58afb1", color: "white" }}>
                Search
              </Button>
            }
            size="large"
            loading={isLoading || isFetching}
            onChange={handleSearchChange}
          />
        </div>
        <div className="">
          <Space>
            <Radio.Group value={placement} onChange={onChange}>
              <Radio value="top">top</Radio>
              <Radio value="right">right</Radio>
              <Radio value="bottom">bottom</Radio>
              <Radio value="left">left</Radio>
            </Radio.Group>
            <Button
              type="primary"
              className="bg-colorsa-primary"
              onClick={showDrawer}
            >
              Filter <Filter></Filter>
            </Button>
          </Space>
          <Drawer
            title="Filter Cars"
            placement={placement}
            width={400}
            onClose={onClose}
            open={open}
          >
            <div>
              <Dropdown className="w-full p-4  justify-start" menu={menuProps} trigger={["click"]}>
                <Button>
                  <Space>
                {selectedCategory}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </Drawer>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-4 gap-5">
          {CarsData?.data?.map((car: TCars, index: string) => (
            <div key={index} className="my-10">
              <Badge.Ribbon text={car.price} color="cyan">
                <Card
                  hoverable
                  style={{ width: 280 }}
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

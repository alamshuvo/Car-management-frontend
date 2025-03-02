import { useGetAllCarsQuery } from "@/redux/features/userApi/userApi";
import { TCars } from "@/types/cars.types";
import {
  Badge,
  Button,
  Card,
  Drawer,
  DrawerProps,
  Dropdown,
  Image,
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

const sortItems = [
  { label: "Name (A-Z)", key: "name" },
  { label: "Name (Z-A)", key: "-name" },
  { label: "Price (High to Low)", key: "-price" },
  { label: "Price (Low to High)", key: "price" },
  { label: "Latest", key: "-createdAt" },
  { label: "Availability (High to Low)", key: "-inStock" },
  { label: "Availability (Low to High)", key: "inStock" },
];

const categories = [
  { label: "SEDAN", key: "Sedan" },
  { label: "SUV", key: "SUV" },
  { label: "TRUCK", key: "Truck" },
  { label: "COUPE", key: "Coupe" },
  { label: "CONVERTIBLE", key: "Convertible" },
];

export type TQuearyParams = {
  name: string;
  value: string | number | boolean;
};

const AllCars = () => {
  const [params, setParams] = useState<TQuearyParams[]>([]);
  const [page] = useState(1);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedSort, setSelectedSort] = useState("Sort By");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: CarsData, isLoading, isFetching } = useGetAllCarsQuery([
    { name: "limit", value: "0" },
    { name: "page", value: page.toString() },
    ...params.map((param) => ({
      name: param.name,
      value: String(param.value), // Convert value to string
    })),
  ]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setParams((prevParams) => [
        ...prevParams.filter((p) => p.name !== "searchTerm"),
        ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
      ]);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewSingle = (id: string) => {
    navigate(`/cars/${id}`);
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const handleCategory = ({ key }: { key: string }) => {
    setSelectedCategory(key);
    setParams((prevParams) => [
      ...prevParams.filter((p) => p.name !== "category"),
      { name: "category", value: key },
    ]);
  };

  const handleSort = ({ key }: { key: string }) => {
    setSelectedSort(key);
    setParams((prevParams) => [
      ...prevParams.filter((p) => p.name !== "sort"),
      { name: "sort", value: key },
    ]);
  };

  const categoryMenuProps = { items: categories, onClick: handleCategory };
  const sortMenuProps = { items: sortItems, onClick: handleSort };

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto p-10 grid grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full p-5">
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:p-10 p-5">
      <p className="text-center font-bold text-2xl">All Cars</p>

      <div className="lg:flex justify-between items-center my-10">
        <div className="lg:w-1/2 lg:mb-0 my-4">
          <Search
            placeholder="Input car name"
            enterButton={<Button style={{ background: "#ce9a98", color: "white" }}>Search</Button>}
            size="large"
            loading={isLoading || isFetching}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <Space>
            <Radio.Group value={placement} onChange={onChange}>
              <Radio value="top">Top</Radio>
              <Radio value="right">Right</Radio>
              <Radio value="bottom">Bottom</Radio>
              <Radio value="left">Left</Radio>
            </Radio.Group>
            <Button type="primary" className="bg-colorsa-primary" onClick={showDrawer}>
              Filter <Filter />
            </Button>
          </Space>
          <Drawer title="Filter Cars" placement={placement} width={300} onClose={onClose} open={open}>
            <div className="my-5">
              <p className="my-2 text-center font-semibold">Category</p>
              <Dropdown className="w-full p-4" menu={categoryMenuProps} trigger={["click"]}>
                <Button>
                  <Space>
                    {selectedCategory}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <div>
              <p className="my-2 text-center font-semibold">Sort By</p>
              <Dropdown className="w-full p-4" menu={sortMenuProps} trigger={["click"]}>
                <Button>
                  <Space>
                    {selectedSort}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </Drawer>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-5 md:gap-4 gap-2">
        {CarsData?.data?.map((car: TCars, index: number) => (
          <div key={index} className="my-10">
            <Badge.Ribbon text={`$${car.price}`} color="cyan">
              <Card
                hoverable
                className="w-auto"
                cover={
                  <Image.PreviewGroup>
                    <Image alt="Car" src={car?.image} width="100%" height={200} />
                  </Image.PreviewGroup>
                }
                actions={[
                  <Button onClick={() => handleViewSingle(car?._id)} className="bg-colorsa-secondary text-colorsa-text">
                    View Details
                  </Button>,
                ]}
              >
                <Meta title={car.model} description={car.description.slice(0, 15)} />
                <div className="grid grid-cols-2 gap-2 my-2 mt-4">
                  <Tag color="volcano">{car.name}</Tag>
                  <Tag color="blue">{car.category}</Tag>
                  <Tag color={car.inStock ? "success" : "error"}>
                    {car.inStock ? "In Stock" : "Out of Stock"}
                  </Tag>
                  <Tag color="magenta">{car.year}</Tag>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCars;

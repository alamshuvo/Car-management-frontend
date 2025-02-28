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
  Slider,
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
  {
    label: "Name (A-Z)",
    key: "name",
  },
  {
    label: "Name (Z-A)",
    key: "-name",
  },
  {
    label: "Price (High to Low)",
    key: "-price",
  },
  {
    label: "Price (Low to High)",
    key: "price",
  },
  {
    label: "Latest",
    key: "-createdAt",
  },
  {
    label: "Availability (High to Low)",
    key: "-inStock",
  },
  {
    label: "Availability (Low to High)",
    key: "inStock",
  },
];
const items = [
  {
    label: "SEDAN",
    key: "Sedan",
  },
  {
    label: "SUV",
    key: "SUV",
  },
  {
    label: "TRUCK",
    key: "Truck",
  },
  {
    label: "COUPE",
    key: "Coupe",
  },
  {
    label: "CONVERTIBLE",
    key: "Convertible",
  },
];

const AllCars = () => {
  const [params, setParams] = useState<TQuearyParams[]>([]);


  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const [selectedCategory, setSelectedCategory] = useState("Select Category"); // Initial state for selected category
  const [selectedSort, setSelectedSort] = useState("Sort By"); // Initial state for selected sort
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    data: CarsData,
    isLoading,
    isFetching,
  } = useGetAllCarsQuery([
    { name: "limit", value: 0 },
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
  // const handleCategory = (data) => {
  //   console.log(data);
  //   setParams(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []);
  // };
  // const handleSort = (data) => {
  //   console.log(data);
  // };
  // const menuProps = {
  //   items,
  //   onClick: (e: string) => {
  //     setSelectedCategory(e.key);
  //     handleCategory(e);
  //   },
  // };

  // const sortMenuProps = {
  //   sortItems,
  //   onClick: (e: string) => {
  //     setSelectedSort(e.key);
  //     handleSort(e);
  //   },
  // };
  const handleCategory = ({ key }: { key: string }) => {
    setSelectedCategory(key);
    setParams((prevParams) => [
      ...prevParams.filter((p) => p.name !== "category"),
      { name: "category", value: key },
    ]);
  };

  const handleSort = ({ key }: { key: string }) => {
    console.log(key);
    setSelectedSort(key);
    setParams((prevParams) => [
      ...prevParams.filter((p) => p.name !== "sort"),
      { name: "sort", value: key },
    ]);
  };
  // const handlePriceChange = (value: [number, number]) => {
  //   setPriceRange(value);
  //   console.log(minPrice, maxPrice);

  // };

  // const handleInputChange = (index: number, value: string) => {
  //   console.log(index,value);
  //   const newValue = parseInt(value, 10) || 0;

  //   setPriceRange((prevRange) => {
  //     const newRange: [number, number] = [...prevRange] as [number, number];

  //     if (index === 0) {
  //       newRange[0] = Math.max(minPrice, Math.min(newValue, newRange[1]));
  //     } else {
  //       newRange[1] = Math.min(maxPrice, Math.max(newValue, newRange[0]));
  //     }

  //     // Update API parameters
  //     setParams((prevParams) => [
  //       ...prevParams.filter((p) => p.name !== "minprice" && p.name !== "maxprice"),
  //       { name: "minprice", value: newRange[0] },
  //       { name: "maxprice", value: newRange[1] },
  //     ]);

  //     return newRange;
  //   });
  // };

  // useEffect(() => {
  //   if (CarsData?.data?.length) {
  //     const prices = CarsData.data.map((car: TCars) => car.price);
  //     const min = Math.min(...prices);
  //     const max = Math.max(...prices);
  //     setMinPrice(min);
  //     setMaxPrice(max);
  //     setPriceRange([min, max]); // Update range dynamically
  //     if (priceRange[0] === minPrice && priceRange[1] === maxPrice) {
  //       setPriceRange([min, max]); // Update range dynamically
  //     }
  //   }
  // }, [CarsData]);

  
  
 

  const menuProps = {
    items,
    onClick: handleCategory, // Corrected function call
  };

  const sortMenuProps = {
    items: sortItems, // Fix: use `items` instead of `sortItems`
    onClick: handleSort, // Corrected function call
  };

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
    <div className="container  mx-auto lg:p-10  p-5">
      <p className="text-center font-bold text-2xl">All Cars</p>

      <div className="lg:flex  justify-between items-center my-10">
        <div className=" lg:w-1/2 lg:mb-0 my-4 ">
          <Search
            placeholder="input cars name"
            enterButton={
              <Button style={{ background: "#ce9a98", color: "white" }}>
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
            width={300}
            onClose={onClose}
            open={open}
          >
            <div className="my-5">
              <p className="my-2 text-center font-semibold">Category</p>
              <Dropdown
                className="w-full p-4  justify-start"
                menu={menuProps}
                trigger={["click"]}
              >
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
              <Dropdown
                className="w-full p-4  justify-start"
                menu={sortMenuProps}
                trigger={["click"]}
              >
                <Button>
                  <Space>
                    {selectedSort}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>

            <div>
              {/* <p className="my-2 text-center font-semibold">Price Range</p> */}
              {/* <Slider
                range
                step={1}
                defaultValue={[20, 50000]}
                onChange={onChangeComplete}
                //onChangeComplete={onChangeComplete}
                max={100000}
                min={400}
              /> */}
              <div className="flex justify-between mt-3">
             
              </div>
            </div>
          </Drawer>
        </div>
      </div>

      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  lg:gap-5 md:gap-4 gap-2 ">
          {CarsData?.data?.map((car: TCars, index: string) => (
            <div key={index} className="my-10 ">
              <Badge.Ribbon text={car.price} color="cyan">
                <Card
                  hoverable
                  className="w-auto"
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
                    description={car.description.slice(0, 15)}
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
    </div>
  );
};

export default AllCars;

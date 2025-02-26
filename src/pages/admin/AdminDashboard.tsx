import { useTotalRevenueQuery } from "@/redux/features/order/order";
import { useGetAllCarsQuery } from "@/redux/features/userApi/userApi";
import { Button, Modal, Row, Space, Table, Pagination, Col, Dropdown, Upload } from "antd";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useDeleteCarMutation, useUpdateCarMutation,  } from "@/redux/features/adminApi/car/car";
import { toast } from "sonner";
import { useCarForm } from "@/utils/CarFromUtils";
import CarForm from "@/components/components/form/CarForm";
import CarInput from "@/components/components/form/CarInput";
import ImgCrop from "antd-img-crop";


const AdminDashboard = () => {
  const items = [
    { label: "SEDAN", key: "Sedan" },
    { label: "SUV", key: "SUV" },
    { label: "TRUCK", key: "Truck" },
    { label: "COUPE", key: "Coupe" },
    { label: "CONVERTIBLE", key: "Convertible" },
  ];
  
  const { isLoading, data, isFetching } = useTotalRevenueQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: CarsData,
    isLoading: isCarsLoading,
    isFetching: isCarsFetching,
  } = useGetAllCarsQuery([
    { name: "limit", value: 0 },
    { name: "page", value: 0 },
  ]);

  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState<null | 'delete' | 'update'>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [deleteCar] = useDeleteCarMutation();
  const [updateCar] = useUpdateCarMutation();

  const {   handleFormSubmit, 
    uploadToCloudinary, 
    fileList, 
    setFileList, 
    selectedCategory, 
    setSelectedCategory, 
    isLoading:isUpdateLoading  } = useCarForm(updateCar);

  const dataa = [
    { name: "Page A", uv: 4000 },
    { name: "Page B", uv: 3000 },
    { name: "Page C", uv: 2000 },
    { name: "Page D", uv: 2780 },
    { name: "Page E", uv: 1890 },
    { name: "Page F", uv: 2390 },
    { name: "Page G", uv: 3490 },
  ];

  const handleModalOpen = (car: any, type: 'delete' | 'update') => {
    setSelectedCar(car);
    setModalType(type);
  
  };

  const handleModalOk = async () => {
    if (modalType === 'delete') {
      try {
        await deleteCar(selectedCar._id).unwrap();
        toast.success("Car deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the car.");
      }
    } else if (modalType === 'update') {
      // Construct the updated data object
      const updatedData = {
        name: selectedCar.name,
        brand: selectedCar.brand,
        model: selectedCar.model,
        year: selectedCar.year,
        price: selectedCar.price,
        description: selectedCar.description,
        quantity: selectedCar.quantity,
        category: selectedCategory , // Assuming you're updating the category from the dropdown
        image: fileList.length > 0 ? fileList[0].url : selectedCar.image // Use new image or keep existing one
      };
      
      try {
        await updateCar({ carId: selectedCar._id, updatedData }).unwrap();
        toast.success("Updated successfully");
      } catch (error) {
        toast.error("Failed to update data");
      }
    }
    setModalType(null);
    setSelectedCar(null);
  };
  
  const handleModalCancel = () => {
    setModalType(null);
    setSelectedCar(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Model", dataIndex: "model" },
    { title: "Category", dataIndex: "category" },
    { title: "Price", dataIndex: "price" },
    { title: "Year", dataIndex: "year" },
    {
      title: "Action",
      render: (car) => (
        <Row gutter={8}>
          <Space>
            <Button onClick={() => handleModalOpen(car, 'delete')}>
              Delete <Trash />
            </Button>
            <Button onClick={() => handleModalOpen(car, 'update')}>
              Update
            </Button>
          </Space>
        </Row>
      ),
      width: "1%",
    },
  ];

  return (
    <div className="p-5">
      <div className="mx-auto bg-colorsa-background border-2 border-colorsa-secondary p-10 space-y-5 rounded-lg">
        <p className="text-center font-bold text-2xl">Total Revenue</p>
        <p className="text-center font-semibold">{data?.data?.totalRevenue} BDT</p>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={dataa}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="my-10 bg-colorsa-background border-2 border-colorsa-secondary rounded-lg">
        <p className="text-center mt-5 text-2xl font-bold">Admin Action For Products</p>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={CarsData?.data}
          pagination={false}
        />
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          total={CarsData?.meta?.total || 0}
          pageSize={10}
        />
      </div>

      <Modal
        title={modalType === 'delete' ? "Delete Car" : "Update Car"}
        open={modalType !== null}
        onOk={modalType === 'delete' ? handleModalOk : handleModalOk}
        onCancel={handleModalCancel}
        // Hide footer for update modal
      >
        {modalType === 'delete' ? (
          <p>Are you sure you want to delete this car?</p>
        ) : (
        <div>
        <CarForm onSubmit={handleFormSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <CarInput type="text" id="name" name="name" label="Name" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CarInput type="text" id="brand" name="brand" label="Brand" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CarInput type="text" id="model" name="model" label="Model" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CarInput type="number" id="year" name="year" label="Year" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CarInput type="number" id="price" name="price" label="Price" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CarInput type="text" id="description" name="description" label="Description" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CarInput type="number" id="quantity" name="quantity" label="Quantity" />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Dropdown menu={{ items, onClick: (e) => setSelectedCategory(e.key) }}>
              <Button>
                <Space>{selectedCategory}</Space>
              </Button>
            </Dropdown>
          </Col>
          <ImgCrop rotationSlider>
            <Upload
              customRequest={({ file }) => uploadToCloudinary(file)}
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
        </Row>
        
      </CarForm>
        </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;

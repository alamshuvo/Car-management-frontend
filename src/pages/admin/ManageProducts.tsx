import { Button, Col, Dropdown, Flex, Row, Space, Upload } from "antd";
import ImgCrop from "antd-img-crop";

import { useCreateCarMutation } from "@/redux/features/adminApi/car/car";
import CarForm from "@/components/components/form/CarForm";
import CarInput from "@/components/components/form/CarInput";
import { useCarForm } from "@/utils/CarFromUtils";

const items = [
  { label: "SEDAN", key: "Sedan" },
  { label: "SUV", key: "SUV" },
  { label: "TRUCK", key: "Truck" },
  { label: "COUPE", key: "Coupe" },
  { label: "CONVERTIBLE", key: "Convertible" },
];

const ManageProducts = () => {
  const [createCar] = useCreateCarMutation();
  
  const { 
    handleFormSubmit, 
    uploadToCloudinary, 
    fileList, 
    setFileList, 
    selectedCategory, 
    setSelectedCategory, 
    isLoading 
  } = useCarForm(createCar);



  
  return (
    <div className="p-5">
      <p className="text-center my-10 text-2xl font-semibold">Add Your Car</p>
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
               beforeUpload={(file) => {
                uploadToCloudinary(file);
                return false; // Prevent default upload
              }}
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
        </Row>
        <Flex justify="center" className="mt-5">
          <Button htmlType="submit" className="px-5 py-2 bg-colorsa-secondary" loading={isLoading}>
            Add Car
          </Button>
        </Flex>
      </CarForm>
    </div>
  );
};

export default ManageProducts;

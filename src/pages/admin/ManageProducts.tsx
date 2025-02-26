import CarForm from "@/components/components/form/CarForm";
import CarInput from "@/components/components/form/CarInput";
import { Button, Col, Dropdown, Flex, Row, Space } from "antd";
import { useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { toast } from "sonner";
import { useCreateCarMutation } from "@/redux/features/adminApi/car/car";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqugrb0la/image/upload";
const UPLOAD_PRESET = "car-management";
const ManageProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [createCar, { isLoading }] = useCreateCarMutation()
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange: UploadProps["onChange"] = async ({ file }) => {
    if (file.status === "uploading") {
      return;
    }
    if (file.originFileObj) {
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      formData.append("upload_preset", UPLOAD_PRESET); // Cloudinary preset

      try {
        const res = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          setImageUrl(data.secure_url);
          toast.success("Image uploaded successfully!");
        }
      } catch (error) {
        toast.error("Failed to upload image.");
      }
    }
  };
  console.log(fileList);
 
  const menuProps = {
    items,
    onClick: (e: any) => {
      setSelectedCategory(e.key);
    },
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };




  const uploadToCloudinary = async (file: UploadFile) => {
    const formData = new FormData();
    formData.append("file", file as any);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        setFileList([
          {
            uid: file.uid,
            name: file.name,
            status: "done",
            url: data.secure_url, // Set the uploaded image URL
          },
        ]);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Image upload failed.");
    }
  };
  


  const onSubmit = (data: any) => {
    data.image = fileList.length > 0 ? fileList[0].url : "";
    console.log(data);
    data.price = Number(data.price)
    data.year = Number(data.year)
    data.category = selectedCategory;
    data.quantity=  Number(data.quantity)
    data.inStock = true
    createCar(data)
  };

  return (
    <div className="p-5">
      <p className="text-center my-10 text-2xl font-semibold">Add Your Car</p>
      <CarForm onSubmit={onSubmit}>
        {/* Responsive Two-Column Layout */}
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
            <CarInput
              type="text"
              id="description"
              name="description"
              label="Description"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CarInput
              type="number"
              id="quantity"
              name="quantity"
              label="Quantity"
            />
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Dropdown
              className="w-full justify-start"
              menu={menuProps}
              trigger={["click"]}
            >
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

        {/* Submit Button */}
        <Flex justify="center" className="mt-5">
          <Button htmlType="submit" className="px-5 py-2 bg-colorsa-secondary">
            Add Car
          </Button>
        </Flex>
      </CarForm>
    </div>
  );
};

export default ManageProducts;

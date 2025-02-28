import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UploadFile } from "antd";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqugrb0la/image/upload";
const UPLOAD_PRESET = "car-management";

export const useCarForm = (submitFunction: (data: any) => void, selectedCar?: any) => {
   
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("SUV");
  const [isLoading, setIsLoading] = useState(false);

  // Effect to set the initial state when updating an existing car
  useEffect(() => {
    if (selectedCar) {
      setFileList(selectedCar.image ? [{ uid: selectedCar._id, name: selectedCar.image, status: "done", url: selectedCar.image }] : []);
      setSelectedCategory(selectedCar.category);
    }
  }, [selectedCar]);

  /** 📌 Upload Image to Cloudinary */
  const uploadToCloudinary = async (file: UploadFile) => {
    const formData = new FormData();
    formData.append("file", file as any);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setFileList([{ uid: file.uid, name: file.name, status: "done", url: data.secure_url }]);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Image upload failed.");
    }
  };

  /** 📌 Handle Form Submission */
  const handleFormSubmit = async (data: any) => {
   
    setIsLoading(true);
    data.image = fileList.length > 0 ? fileList[0].url : selectedCar?.image || ""; // Use existing image if no new image is uploaded
    data.price = Number(data.price);
    data.year = Number(data.year);
    data.category = selectedCategory;
    data.quantity = Number(data.quantity);
    data.inStock = true;
console.log(data.image);
    try {
      await submitFunction(data);
      toast.success(selectedCar ? "Car updated successfully!" : "Car added successfully!");
    } catch (error) {
      toast.error(selectedCar ? "Failed to update car." : "Failed to add car.");
    } finally {
      setIsLoading(false);
    }
    return data
  };
// console.log(handleFormSubmit());
  return { handleFormSubmit, uploadToCloudinary, fileList, setFileList, selectedCategory, setSelectedCategory, isLoading };
};

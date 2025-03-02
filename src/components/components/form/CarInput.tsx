import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface CarInputProps {
  type: string;
  id: string;
  name: string;
  label: string;
}

const CarInput: React.FC<CarInputProps> = ({ type, id, name, label }) => {
  const { register, setValue } = useFormContext(); 

  const handleFileChange = (e:any) => {
    setValue(name, e.target.files[0]); 
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      {type === "file" ? (
        <Input type="file" id={id} onChange={handleFileChange} />
      ) : (
        <Input {...register(name)} type={type} id={id} />
      )}
    </div>
  );
};

export default CarInput;

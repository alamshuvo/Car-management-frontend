import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface CarInputProps {
  type: string;
  id: string;
  name: string;
  label: string;
  value?: string | number;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Orderinput: React.FC<CarInputProps> = ({ type, id, name, label, value, readOnly, onChange }) => {
  const { register, setValue } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e); // Call external onChange if provided
    }
    setValue(name, e.target.value); // Update form value in react-hook-form
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      {type === "file" ? (
        <Input type="file" id={id} onChange={(e) => setValue(name, e.target.files?.[0])} />
      ) : (
        <Input 
          {...register(name)} 
          type={type} 
          id={id} 
          value={value} 
          onChange={handleChange} 
          readOnly={readOnly} 
        />
      )}
    </div>
  );
};

export default Orderinput;

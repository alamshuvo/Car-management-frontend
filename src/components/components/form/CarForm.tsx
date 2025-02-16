import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const CarForm = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {
  const methods = useForm({ defaultValues, resolver });

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset(); // Reset form after submission
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default CarForm;

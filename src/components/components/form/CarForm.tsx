import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  DefaultValues,
} from "react-hook-form";

type TFormConfig<T extends FieldValues> = {
  defaultValues?: Partial<T>; // Allow partial default values
  resolver?: any;
};

type TFormProps<T extends FieldValues> = {
  onSubmit: (data: T) => Promise<void>;
  children: ReactNode;
} & TFormConfig<T>;

const CarForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps<T>) => {
  // Use Partial<T> to make defaultValues compatible with T
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T> | undefined, // Cast to DefaultValues<T> to resolve type issue
    resolver,
  });

  const handleSubmit = async (data: T) => {
    await onSubmit(data);
    methods.reset();
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

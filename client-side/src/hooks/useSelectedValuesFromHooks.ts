import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useFormErrorCreator from "./useFormErrorCreator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSelectedPropertiesFromHookForm = (schema: any) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), shouldFocusError: false, reValidateMode: "onSubmit" });

  useFormErrorCreator(errors);
  return { register, handleSubmit, reset, getValues };
};

export default useSelectedPropertiesFromHookForm;

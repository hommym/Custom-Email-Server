import { useEffect } from "react";
import { toast } from "react-toastify";
import { FieldErrors, FieldValues } from "react-hook-form";

const useFormErrorCreator = (errors: FieldErrors<FieldValues>) => {
  useEffect(() => {
    const keys = Array.from(Object.keys(errors));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err: any = errors[keys[0]]?.message;
    if (keys.length > 0) {
      toast.error(err, { autoClose: 1500 });
    }
  }, [errors]);
};

export default useFormErrorCreator;

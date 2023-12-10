import { UseFormRegister, Path } from "react-hook-form";
import { type IFormValues } from "../../pages/Register/Types";

export interface InputProps {
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  validationMessage?: string;
  errors?: string;
  className?: string;
  label: Path<IFormValues>;
  id: string;
  type: string;
  placeholder: string;
  labelClass?: string;
  bgColor?: string;
  trailingIcon?: {
    src: string;
    title: string;
    alt: string;
    onClick?: () => void;
  };
  isBgDark?: boolean;
}

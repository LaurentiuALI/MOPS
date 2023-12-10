import { UseFormRegister, Path } from "react-hook-form";
import { type ILoginValues } from "../Types";

export interface InputProps {
  register: UseFormRegister<ILoginValues>;
  required?: boolean;
  validationMessage?: string;
  errors?: string;
  className?: string;
  label: Path<ILoginValues>;
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

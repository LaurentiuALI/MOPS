import { type InputProps } from "./Types";

import IconShowPassword from "../../assets/icons/icon_show_password.svg";
import IconHidePassword from "../../assets/icons/icon_hide_password.svg";

import { useState } from "react";

export default function Input({
  register,
  required = false,
  validationMessage = "Unknown error occured",
  errors,
  className,
  label,
  id,
  type,
  placeholder,
  labelClass = "bg-brand-secondary ",
  bgColor = "bg-brand-secondary",
  trailingIcon,
  isBgDark = false,
}: InputProps) {
  const [inputType, setInputType] = useState(type);

  function togglePasswordVisibility() {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  return (
    <div
      className={`${className} relative flex  ${
        !isBgDark
          ? "border-brand-borderDark"
          : "border-brand-borderLight border-2 rounded-md mb-[16px]"
      }`}
    >
      <label
        className={`${labelClass} absolute text-lg top-[-15px] left-[10px] px-[8px]
        ${!errors ? "text-brand-main" : "text-brand-red"}`}
        htmlFor={id}
      >
        {label}
      </label>

      <input
        {...register(label, {
          required: {
            value: required,
            message: validationMessage,
          },
        })}
        className={` ${bgColor} 
        ${!isBgDark && "border-2"}
        rounded-md
        w-full 
        placeholder:text-brand-borderDark 
        p-4 focus:outline-none 
        focus:text-${labelClass}
        focus:border-brand-main`}
        id={id}
        type={inputType}
        placeholder={placeholder}
      />

      {type === "password" && (
        <img
          className="absolute top-4 right-[12px]"
          src={inputType === "password" ? IconHidePassword : IconShowPassword}
          title={inputType === "password" ? "Show Password" : "Hide Password"}
          alt={inputType === "password" ? "Show Password" : "Hide Password"}
          onClick={togglePasswordVisibility}
        />
      )}
      {trailingIcon ? (
        <img
          className={`${isBgDark && "pr-[12px]"}`}
          src={trailingIcon.src}
          title={trailingIcon.title}
          alt={trailingIcon.alt}
          onClick={trailingIcon.onClick}
        />
      ) : null}
    </div>
  );
}

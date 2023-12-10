import { useState } from "react";
import IconShowPassword from "../../assets/icons/icon_show_password.svg";
import IconHidePassword from "../../assets/icons/icon_hide_password.svg";

interface InputProps {
  className?: string;
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
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

export default function Input({
  className,
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
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
        className={`${className} relative flex  ${!isBgDark ? "border-brand-borderDark" : "border-brand-borderLight border-2 rounded-md mb-[16px]"}`}
    >
      {value != "" ? (
        <label
          className={`${labelClass} absolute text-lg top-[-15px] left-[10px] px-[8px]`}
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}

      <input
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
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
      {type === "password" && value != "" ? (
        <img
          className="absolute top-4 right-[12px]"
          src={inputType === "password" ? IconHidePassword : IconShowPassword}
          title={inputType === "password" ? "Show Password" : "Hide Password"}
          alt={inputType === "password" ? "Show Password" : "Hide Password"}
          onClick={togglePasswordVisibility}
        />
      ) : null}
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

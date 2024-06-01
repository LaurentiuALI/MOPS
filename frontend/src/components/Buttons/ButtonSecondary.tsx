import React from "react";

interface buttonSecondaryProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  fullwidth?: boolean;
  icon?: {
    src: string;
    title: string;
    altText: string;
  };
}

export default function ButtonSecondary({
  className,
  onClick,
  children,
  icon,
}: buttonSecondaryProps) {
  return (
    <button
      className={`h-14 w-[300px] rounded-md bg-brand-secondary border-2 border-brand-main text-brand-main text-xl font-semibold flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {icon ? (
        <img
          src={icon.src}
          title={icon.title}
          alt={icon.altText}
          className="w-[24px] h-[24px] object-cover"
        />
      ) : null}
      {children}
    </button>
  );
}

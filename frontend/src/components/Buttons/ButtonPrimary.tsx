interface buttonPrimaryProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export default function ButtonPrimary({
  className,
  onClick,
  children,
}: buttonPrimaryProps) {
  return (
    <button
      className={`h-14 w-[300px] rounded-md bg-brand-main text-brand-light text-xl flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

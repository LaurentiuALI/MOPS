interface ChipProps {
  children: string;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Chip({
  children,
  selected = false,
  className,
  onClick = () => {},
}: ChipProps) {
  return (
    <div
      className={`${
        selected ? "bg-brand-main rounded-md" : ""
      }  p-[8px] ${className}`}
      onClick={onClick}
    >
      <p
        className={`text-[14px] 
      leading-[130%] 
      font-semibold
      ${selected ? "text-brand-light" : "text-brand-dark"}`}
      >
        {children}
      </p>
    </div>
  );
}

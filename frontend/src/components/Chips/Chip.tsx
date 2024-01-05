interface ChipProps {
  children: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function Chip({
  children,
  selected = false,
  onClick = () => {},
}: ChipProps) {
  return (
    <div
      className={`${selected ? "bg-brand-main p-[8px] rounded-md" : ""}`}
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

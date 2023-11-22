interface ChipProps {
  children: string;
  isSelected?: boolean;
  onClick: () => void;
}

export default function Chip({
  children,
  isSelected = false,
  onClick = () => {},
}: ChipProps) {
  return (
    <div
      className={`chip ${isSelected ? "chip-active" : "chip-inactive"}`}
      onClick={onClick}
    >
      <p>{children}</p>
    </div>
  );
}

interface buttonTertiaryProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  fullwidth?: boolean;
  icon?: {
    src: string;
    title: string;
    altText: string;
  };
}

export default function ButtonTertiary({
  className,
  onClick,
  children,
  fullwidth,
  icon,
}: buttonTertiaryProps) {
  return (
    <button
      className={`${className ? className : ""} ${
        fullwidth ? "full-width" : ""
      } btn tertiary`}
      onClick={onClick}
    >
      {icon ? (
        <img src={icon.src} title={icon.title} alt={icon.altText} />
      ) : null}
      {children}
    </button>
  );
}

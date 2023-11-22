import CustomIconProps from '../../../types/CustomIconProps';

export default function SVGMenu({
  className,
  color = '#FAE7D1',
  title,
  onClick,
}: CustomIconProps) {
  return (
    <svg
      className={className}
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={title}
      onClick={onClick}
    >
      <g id="Icons">
        <path
          id="Vector"
          d="M4 18.0005H22V16.0005H4V18.0005ZM4 13.0005H22V11.0005H4V13.0005ZM4 6.00047V8.00047H22V6.00047H4Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

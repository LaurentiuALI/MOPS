import CustomIconProps from '../../../types/CustomIconProps';

export default function SVGArrow({
  className,
  color = '#FAE7D1',
  title,
  onClick,
}: CustomIconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={title}
      onClick={onClick}
    >
      <g id="Icons">
        <path
          id="Vector"
          d="M2.43945 10.9371C1.85352 11.523 1.85352 12.4746 2.43945 13.0605L9.93945 20.5605C10.5254 21.1465 11.477 21.1465 12.0629 20.5605C12.6488 19.9746 12.6488 19.023 12.0629 18.4371L7.11758 13.4965H21.4988C22.3285 13.4965 22.9988 12.8262 22.9988 11.9965C22.9988 11.1668 22.3285 10.4965 21.4988 10.4965L7.11758 10.4965L12.0582 5.55586C12.6441 4.96992 12.6441 4.01836 12.0582 3.43242C11.4723 2.84648 10.5207 2.84648 9.93477 3.43242L2.43477 10.9324L2.43945 10.9371Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

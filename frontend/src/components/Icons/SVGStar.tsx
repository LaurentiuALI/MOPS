import CustomIconProps from '../../../types/CustomIconProps';

export default function SVGStar({
  className,
  color = '#9B8571',
  title,
  onClick,
}: CustomIconProps) {
  return (
    <svg
      className={className}
      width="10"
      height="21"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={title}
      onClick={onClick}
    >
      <g id="Toggle visibility">
      <path id="Vector" d="M3.57653 2.2041C4.21002 1.06812 4.52651 0.500137 5 0.500137C5.47349 0.500137 5.78998 1.06812 6.42347 2.2041L6.58746 2.49809C6.76746 2.82108 6.85746 2.98258 6.99745 3.08908C7.13745 3.19557 7.31245 3.23507 7.66244 3.31407L7.98043 3.38607C9.2104 3.66456 9.82489 3.80356 9.97138 4.27405C10.1174 4.74404 9.69839 5.23453 8.85991 6.215L8.64291 6.4685C8.40492 6.74699 8.28542 6.88649 8.23192 7.05848C8.17842 7.23098 8.19642 7.41697 8.23242 7.78847L8.26542 8.12696C8.39192 9.43543 8.45542 10.0894 8.07243 10.3799C7.68944 10.6709 7.11345 10.4054 5.96248 9.87542L5.66398 9.73842C5.33699 9.58742 5.1735 9.51243 5 9.51243C4.8265 9.51243 4.66301 9.58742 4.33552 9.73842L4.03802 9.87542C2.88655 10.4054 2.31056 10.6704 1.92807 10.3804C1.54458 10.0894 1.60808 9.43543 1.73458 8.12696L1.76758 7.78897C1.80358 7.41697 1.82157 7.23098 1.76758 7.05898C1.71458 6.88649 1.59508 6.74699 1.35709 6.469L1.14009 6.215C0.301611 5.23503 -0.11738 4.74454 0.0286168 4.27405C0.175113 3.80356 0.790099 3.66406 2.02007 3.38607L2.33806 3.31407C2.68755 3.23507 2.86205 3.19557 3.00255 3.08908C3.14254 2.98258 3.23254 2.82108 3.41254 2.49809L3.57653 2.2041Z" fill={color} />
      </g>
    </svg>
  );
}
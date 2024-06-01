import CustomIconProps from '../../../types/CustomIconProps';

export default function SVGPen({
  className="",
  color = '#9B8571',
  title="edit",
  onClick,
}: CustomIconProps) {
  return (
    <svg className={className} aria-labelledby={title}
    onClick={onClick} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 0L12.5 2.625L17.5 7.875L20 5.25L15 0ZM10 5.25L0 15.75V21H5L15 10.5L10 5.25Z" fill={color}/>
</svg>

  );
}

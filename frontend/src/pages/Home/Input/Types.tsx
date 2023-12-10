export interface InputProps {
  className?: string;
  id: string;
  type: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  labelClass?: string;
  bgColor?: string;
  trailingIcon?: {
    src: string;
    title: string;
    alt: string;
    onClick?: () => void;
  };
  isBgDark?: boolean;
}

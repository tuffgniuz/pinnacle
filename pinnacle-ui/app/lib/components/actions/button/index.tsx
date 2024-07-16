import { FC, ReactNode } from "react";

const Button: FC<{
  icon?: ReactNode;
  value?: string;
  rounded?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  type?: "button" | "submit";
  onSubmit?: () => void;
  onClick?: () => void;
}> = ({
  icon,
  value,
  fullWidth,
  onSubmit,
  onClick,
  type = "button",
  rounded = "md",
}) => {
  const buttonCls = `
    bg-neutral-light-500 
    dark:bg-text-dark
    text-center 
    text-text-light-100
    font-semibold
    p-4
    ${icon && value ? "flex items-center gap-2" : ""} 
    rounded-${rounded} 
    ${fullWidth ? "w-full" : ""}
  `;

  return (
    <button
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
      className={`${buttonCls}`}
    >
      {icon && icon}
      {value && value}
    </button>
  );
};

export default Button;

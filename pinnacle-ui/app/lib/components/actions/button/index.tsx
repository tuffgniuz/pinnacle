import { FC, ReactNode } from "react";

const Button: FC<{
  icon?: ReactNode;
  value?: string;
  rounded?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  type?: "button" | "submit";
  className?: string | undefined;
  onSubmit?: () => void;
  onClick?: () => void;
}> = ({
  icon,
  value,
  fullWidth,
  onSubmit,
  onClick,
  className,
  type = "button",
  rounded = "md",
}) => {
  const buttonCls = `
    bg-accent-light-300 
    dark:bg-accent-dark-300
    text-center 
    text-text-light-900
    dark:text-text-dark-900
    font-semibold
    p-4
    ${icon && value ? "flex items-center justify-center gap-2" : ""} 
    rounded-${rounded} 
    ${fullWidth ? "w-full" : ""}
  `;

  return (
    <button
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
      className={`${buttonCls} ${className}`}
    >
      {icon && icon}
      {value && value}
    </button>
  );
};

export default Button;

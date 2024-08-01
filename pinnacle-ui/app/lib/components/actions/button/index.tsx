import { FC, ReactNode } from "react";

const Button: FC<{
  icon?: ReactNode;
  value?: string;
  rounded?: "sm" | "md" | "lg" | "xl";
  padding?: "sm" | "md";
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
  rounded = "lg",
  padding = "md",
}) => {
  const buttonCls = `
    bg-accent-light-300 
    dark:bg-background-dark
    text-center 
    text-text-light-900
    dark:text-text-dark-900
    dark:hover:bg-opacity-80
    transition-all duration-300 ease-in-out
    ${padding === "sm" ? "p-2" : padding === "md" ? "p-4" : ""}
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

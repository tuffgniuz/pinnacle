"use client";
import { FC, ReactNode, useState } from "react";

const BaseDropDown: FC<{
  icon?: ReactNode | string;
  title?: string | undefined;
  children: ReactNode;
  backgroundColor?: string;
  buttonClassName?: string | undefined;
  className?: string | undefined;
}> = ({
  icon,
  title,
  children,
  buttonClassName,
  className,
  backgroundColor = "bg-background-light dark:bg-accent-dark-500",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleDropDown}
        className={`transition-all duration-300 ease-in-out ${title && icon ? "flex items-center gap-2" : ""} ${buttonClassName}`}
      >
        {icon}
        {title && <span>{title}</span>}
      </button>
      {isOpen && (
        <div
          className={`
            absolute 
            transition-all duration-300 ease-in-out 
            border
            border-1
            dark:border-accent-light-400
            mt-3 -ml-2
            drop-shadow-lg
            rounded-lg 
            ${backgroundColor}
            ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default BaseDropDown;

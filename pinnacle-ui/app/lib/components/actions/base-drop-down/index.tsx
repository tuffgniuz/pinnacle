"use client";
import { FC, ReactNode, useState } from "react";

const BaseDropDown: FC<{
  icon: ReactNode | string;
  children: ReactNode;
  backgroundColor?: string;
  buttonClassName?: string | undefined;
  className?: string | undefined;
}> = ({
  icon,
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
        className={`transition-all duration-300 ease-in-out ${buttonClassName}`}
      >
        {icon}
      </button>
      {/* div (drop down) to be shown when clicked on the button */}

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

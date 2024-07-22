"use client";
import { FC, ReactNode, useState } from "react";

const BaseDropDown: FC<{
  icon: ReactNode;
  children: ReactNode;
  buttonClassName?: string | undefined;
  className?: string | undefined;
}> = ({ icon, children, buttonClassName, className }) => {
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
            bg-background-light 
            dark:bg-accent-dark-500 
            border
            border-1
            dark:border-accent-light-400
            mt-2
            drop-shadow-lg
            rounded-lg 
            ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default BaseDropDown;

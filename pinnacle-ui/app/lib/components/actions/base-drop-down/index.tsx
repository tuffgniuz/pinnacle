"use client";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

const BaseDropDown: FC<{
  icon?: ReactNode | string;
  title?: string | undefined;
  children: ReactNode;
  backgroundColor?: string;
  buttonClassName?: string | undefined;
  className?: string | undefined;
  zIndex?: number;
}> = ({
  icon,
  title,
  children,
  buttonClassName,
  className,
  backgroundColor = "bg-background-light dark:bg-accent-dark-500",
  zIndex = 10,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropDown}
        className={`transition-all duration-300 ease-in-out ${
          title && icon ? "flex items-center gap-2" : ""
        } ${buttonClassName}`}
      >
        {icon}
        {title && <span>{title}</span>}
      </button>
      {isOpen && (
        <div
          style={{ zIndex }}
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

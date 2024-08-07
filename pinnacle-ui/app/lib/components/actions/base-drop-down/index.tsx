"use client";
import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { LucideChevronDown } from "lucide-react";

const BaseDropDown: FC<{
  btnNode?: ReactNode | string;
  children: ReactNode;
  backgroundColor?: string;
  buttonClassName?: string | undefined;
  className?: string | undefined;
  showChevron?: boolean;
  zIndex?: number;
  style?: CSSProperties | undefined;
  btnStyle?: CSSProperties | undefined;
}> = ({
  btnNode,
  children,
  buttonClassName,
  className,
  style,
  btnStyle,
  showChevron,
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
        btnStyle={{ ...btnStyle }}
        className={`
          flex items-center 
          dark:hover:bg-opacity-80 hover:bg-opacity-90 
          transition-all duration-300 ease-in-out 
          ${buttonClassName}
        `}
      >
        <span className="px-4 py-2">{btnNode}</span>
        {showChevron && (
          <span className="border-l border-l-accent-dark-600 px-4 py-2">
            <LucideChevronDown size={18} />
          </span>
        )}
      </button>
      {isOpen && (
        <div
          style={{ zIndex, ...style }}
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

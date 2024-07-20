import { FC, MouseEventHandler, ReactNode } from "react";

const Card: FC<{
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  className?: string | undefined;
  padding?: "sm" | "md" | "lg";
}> = ({ children, onClick, className, padding = "md" }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-background-dark-500 dark:bg-accent-dark-400
        rounded-lg 
        flex flex-col 
        transition-all duration-300 ease-in-out
        ${padding === "sm" ? "p-2" : padding === "md" ? "p-4" : padding === "lg" ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;

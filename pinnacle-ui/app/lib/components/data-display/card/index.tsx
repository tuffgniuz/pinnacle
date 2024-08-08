import { FC, MouseEventHandler, ReactNode } from "react";

const Card: FC<{
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  className?: string | undefined;
  transparent?: boolean;
  padding?: "sm" | "md" | "lg";
  onMouseEnter?: MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave?: MouseEventHandler<HTMLDivElement> | undefined;
}> = ({
  children,
  onClick,
  className,
  transparent,
  padding = "md",
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`
        rounded-lg 
        flex flex-col 
        transition-all duration-300 ease-in-out
        ${!transparent ? "bg-background-dark-600 dark:bg-accent-dark-400" : ""}
        ${padding === "sm" ? "p-2" : padding === "md" ? "p-4" : padding === "lg" ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;

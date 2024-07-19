import { FC, MouseEventHandler, ReactNode } from "react";

const Card: FC<{
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  className?: string | undefined;
}> = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-background-dark-500 dark:bg-accent-dark-400
        rounded-lg 
        flex flex-col 
        p-4 
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;

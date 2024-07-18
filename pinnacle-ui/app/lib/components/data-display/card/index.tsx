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
        bg-background-dark-500 dark:bg-accent-light 
        rounded-lg 
        flex flex-col 
        items-center justify-center p-4 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;

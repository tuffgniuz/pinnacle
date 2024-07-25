import { FC, ReactNode } from "react";

const ListItem: FC<{
  children: ReactNode | undefined;
  className?: string | undefined;
  isActive?: boolean;
}> = ({ children, className, isActive }) => {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${isActive ? "bg-sky_magenta" : ""}`}
      />
      <span
        className={`
        w-full
        p-2 -my-2
        flex items-center gap-2
        cursor-pointer 
        rounded-lg 
        hover:dark:bg-neutral-light-100 
        transition-all duration-300 ease-in-out 
        ${isActive ? "dark:bg-neutral-light-100" : ""}
        ${className}
      `}
      >
        {children}
      </span>
    </li>
  );
};

export default ListItem;

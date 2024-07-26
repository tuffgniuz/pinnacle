import { FC, MouseEventHandler, ReactNode } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

const Navlink: FC<{
  icon?: ReactNode | undefined;
  value?: ReactNode | string | undefined;
  href: Url;
  isActive?: boolean;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}> = ({ icon, value, href, isActive, className, onClick }) => {
  return (
    <Link
      href={href}
      className={`
        hover:bg-neutral-light-700 
        dark:hover:bg-neutral-light-100 
        p-2 rounded-lg 
        transition-all duration-300 ease-in-out 
        ${isActive ? "border-b border-b-sky_magenta" : ""}
        ${icon && value ? "flex items-center gap-2" : ""} 
        ${className}
      `}
      onClick={onClick}
    >
      {icon && icon}
      {value && value}
    </Link>
  );
};

export default Navlink;

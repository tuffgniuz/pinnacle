import { FC, ReactNode } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

const Navlink: FC<{
  icon?: ReactNode | undefined;
  value?: ReactNode | string | undefined;
  href: Url;
  className?: string | undefined;
}> = ({ icon, value, href, className }) => {
  return (
    <Link
      href={href}
      className={`hover:bg-neutral-light dark:hover:bg-neutral-light-100 p-2 rounded-lg transition-all duration-300 ease-in-out ${icon && value ? "flex items-center gap-2" : ""} ${className}`}
    >
      {icon && icon}
      {value && value}
    </Link>
  );
};

export default Navlink;

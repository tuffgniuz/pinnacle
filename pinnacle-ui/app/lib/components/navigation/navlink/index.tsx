import { FC, ReactNode } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

const Navlink: FC<{
  icon?: ReactNode;
  value?: string;
  href: Url;
  className?: string | undefined;
}> = ({ icon, value, href, className }) => {
  return (
    <Link
      href={href}
      className={`${icon && value ? "flex items-center gap-2" : ""} ${className}`}
    >
      {icon && icon}
      {value && value}
    </Link>
  );
};

export default Navlink;

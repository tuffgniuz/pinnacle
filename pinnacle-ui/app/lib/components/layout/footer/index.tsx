import { FC } from "react";
import Logo from "../../data-display/logo";
import Link from "next/link";

const Footer: FC<{ className?: string | undefined }> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className={`flex items-center justify-center gap-5 py-10 ${className}`}
    >
      <div className="flex items-center gap-5">
        <Logo size={18} />
        <p>&copy; {currentYear} Pynakl</p>
      </div>
      <Link href="" className="hover:underline hover:text-sky_magenta">
        Contact
      </Link>
    </div>
  );
};

export default Footer;

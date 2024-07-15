import { FC } from "react";
import Link from "next/link";

import { LucideX } from "lucide-react";

import Logo from "../../data-display/logo";

const AuthHeader: FC = () => {
  return (
    <header className="h-28 flex items-center border-b border-b-accent-dark-400 mb-14">
      <div className="w-4/6 mx-auto flex items-center justify-between">
        <Logo />
        <Link href="/" className="">
          <LucideX />
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;

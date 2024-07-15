import { FC } from "react";
import ThemeToggleButton from "../../actions/theme-toggle-button";
import Link from "next/link";
import Logo from "../../data-display/logo";

const Navbar: FC = () => {
  return (
    <nav className="h-16 flex items-center justify-between px-5 mb-10">
      <Logo />
      <div className="flex items-center gap-5">
        <ul>
          <li>
            <ThemeToggleButton />
          </li>
        </ul>
        <span>|</span>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

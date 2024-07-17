"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/stores/store";
import useLogoutUser from "@/app/lib/hooks/useLogoutUser";
import ThemeToggleButton from "../../actions/theme-toggle-button";
import Link from "next/link";
import Logo from "../../data-display/logo";

const Navbar: FC = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { handleLogout } = useLogoutUser();

  const onLogoutClick = async () => {
    await handleLogout();
    router.push("/login");
  };

  return (
    <nav className="h-20 flex items-center justify-between px-5 mb-10">
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
            {user ? (
              <button onClick={onLogoutClick}>Logout</button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

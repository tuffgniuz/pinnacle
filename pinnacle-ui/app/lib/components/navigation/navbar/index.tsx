"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";

import useLogoutUser from "@/app/lib/hooks/useLogoutUser";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";

import ThemeToggleButton from "../../actions/theme-toggle-button";
import Link from "next/link";
import Logo from "../../data-display/logo";
import UserNavItems from "../user-nav-items";

const Navbar: FC<{ showProjectLinks?: boolean }> = ({ showProjectLinks }) => {
  const router = useRouter();
  const {
    data: currentUser,
    // isLoading: currentUserIsLoading,
    // isError: currentUserIsError,
    // error: currentUserError,
  } = useCurrentUser();
  const { handleLogout } = useLogoutUser();

  const onLogoutClick = async () => {
    await handleLogout();
    router.push("/login");
  };

  return (
    <nav className="h-20 flex items-center justify-between px-5 mb-10">
      <div className="flex items-center gap-5">
        <Logo />
        {currentUser && <h1>{currentUser.fullname}</h1>}
      </div>
      <div className="flex items-center gap-5">
        <ul className="flex items-center gap-5">
          <li>
            <ThemeToggleButton />
          </li>
          {currentUser && showProjectLinks && <UserNavItems />}
        </ul>
        <span>|</span>
        <ul>
          <li>
            {/* Should be replaced with a user avatar which will open a sidebar on click with user actions such as logout */}
            {currentUser ? (
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

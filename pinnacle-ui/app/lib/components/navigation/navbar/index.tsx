"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";

import useLogoutUser from "@/app/lib/hooks/useLogoutUser";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";

import ThemeToggleButton from "../../actions/theme-toggle-button";
import Link from "next/link";
import Logo from "../../data-display/logo";
import UserNavItems from "../user-nav-items";
import { Project } from "@/app/lib/types/models";

const Navbar: FC<{
  title?: string;
  project?: Project;
  showProjectLinks?: boolean;
}> = ({ title, project, showProjectLinks }) => {
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
    <nav className="h-20 flex items-center justify-between px-5 mb-5">
      <div className="flex items-center gap-5">
        <Logo href={currentUser && "/projects"} />
        {currentUser && (
          <h1 className="flex items-center gap-3">
            <Link
              href="/me"
              className="hover:bg-neutral-light dark:hover:bg-neutral-light-100 p-2 rounded-lg transition-all duration-300 ease-in-out"
            >
              {currentUser.fullname}
            </Link>
            {currentUser && title && <span>/</span>}
            {title && <span className="font-semibold">{title}</span>}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-5">
        <ul className="flex items-center gap-3">
          {currentUser && showProjectLinks && (
            <UserNavItems project={project} />
          )}
        </ul>
        <span>|</span>
        <ul className="flex items-center gap-5">
          <li>
            <ThemeToggleButton />
          </li>
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

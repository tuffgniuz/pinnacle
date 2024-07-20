"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LucideInbox, LucideTarget } from "lucide-react";

import { Project } from "@/app/lib/types/models";
import useLogoutUser from "@/app/lib/hooks/useLogoutUser";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";

import ThemeToggleButton from "../../actions/theme-toggle-button";
import Logo from "../../data-display/logo";
import UserNavItems from "../user-nav-items";
import Avatar from "../../data-display/avatar";
import { useTheme } from "@/app/lib/context/theme-context";

const Navbar: FC<{
  title?: string;
  project?: Project;
  showProjectLinks?: boolean;
}> = ({ title, project, showProjectLinks }) => {
  const router = useRouter();
  const { theme } = useTheme();
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
        <Logo href={currentUser && "/me"} />
        {currentUser && (
          <h1 className="flex items-center gap-3">
            <Link
              href="/me"
              className="hover:bg-neutral-light dark:hover:bg-neutral-light-100 -m-2 p-2 rounded-lg transition-all duration-300 ease-in-out"
            >
              {currentUser.fullname}
            </Link>
            {currentUser && title && <span>/</span>}
            {title && (
              <Link
                href={
                  project ? `/projects/${project.name_key}/overview` : "/me"
                }
                className="hover:bg-neutral-light dark:hover:bg-neutral-light-100 -m-2 p-2 rounded-lg transition-all duration-300 ease-in-out font-semibold"
              >
                {title}
              </Link>
            )}
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
        <ul className="flex items-center gap-3">
          <li>
            <ThemeToggleButton />
          </li>
          <li>
            <Link
              href="/projects"
              className="inline-flex bg-accent-light-300 dark:bg-background-dark p-2 rounded-md"
            >
              <LucideTarget
                size={20}
                color={theme === "dark" ? "#d4d8dc" : "#eff0f2"}
              />
            </Link>
          </li>
          <li>
            <Link
              href="/notifications"
              className="inline-flex bg-accent-light-300 dark:bg-background-dark p-2 rounded-md"
            >
              <LucideInbox
                size={20}
                color={theme === "dark" ? "#d4d8dc" : "#eff0f2"}
              />
            </Link>
          </li>
          <li>
            {/* Should be replaced with a user avatar which will open a sidebar on click with user actions such as logout */}
            {currentUser ? (
              <button onClick={onLogoutClick}>Logout</button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
          <li>
            <Avatar />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

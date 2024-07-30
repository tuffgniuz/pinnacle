"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { LucideInbox, LucideTarget } from "lucide-react";
import { Project } from "@/app/lib/types/models";
import { useTheme } from "@/app/lib/context/theme-context";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";
import ThemeToggleButton from "../../actions/theme-toggle-button";
import Logo from "../../data-display/logo";
import UserNavItems from "../user-nav-items";
import Avatar from "../../data-display/avatar";
import UserSidebar from "../user-sidebar";
import GeneralSearchModal from "../../actions/general-search-modal";

const Navbar: FC<{
  title?: string;
  project?: Project;
  showProjectLinks?: boolean;
}> = ({ title, project, showProjectLinks }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const { theme } = useTheme();
  const { data: currentUser } = useCurrentUser();

  return (
    <>
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
          {showProjectLinks && <span>|</span>}
          <GeneralSearchModal />
          <ul className="flex items-center gap-3">
            <li>
              <ThemeToggleButton />
            </li>
            {currentUser && (
              <>
                <li>
                  <Link
                    href="/projects"
                    className="flex items-center bg-accent-light-300 dark:bg-background-dark p-2 rounded-md"
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
              </>
            )}
            <li>
              {/* Should be replaced with a user avatar which will open a sidebar on click with user actions such as logout */}
              {currentUser ? (
                <Avatar onClick={() => setShowSidebar(true)} />
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <UserSidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
};

export default Navbar;

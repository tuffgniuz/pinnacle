import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  LucideInbox,
  LucideKanban,
  LucideLogOut,
  LucideTarget,
  LucideUser,
  LucideUserRoundCog,
  LucideX,
} from "lucide-react";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";
import useLogoutUser from "@/app/lib/hooks/useLogoutUser";
import useProjects from "@/app/lib/hooks/projects/useProjects";
import BaseModal from "../../data-display/base-modal";
import Avatar from "../../data-display/avatar";
import Navlink from "../navlink";

const UserSidebar: FC<{ show: boolean; onClose: () => void }> = ({
  show,
  onClose,
}) => {
  const router = useRouter();
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const { data: projects } = useProjects();
  const { handleLogout } = useLogoutUser();

  const onLogoutClick = async () => {
    await handleLogout();
    onClose();
    router.push("/login");
  };

  return (
    <BaseModal
      show={show}
      onClose={onClose}
      position="side-r"
      className="w-1/4 p-6"
    >
      <header className="flex items-center justify-between border-b border-b-neutral-light dark:border-b-accent-dark-400 pb-10 mb-10">
        <div className="flex items-center gap-5">
          <Avatar size={60} />
          <h1 className="text-lg">{currentUser?.fullname}</h1>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center hover:bg-neutral-light dark:hover:bg-neutral-light-100 w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
        >
          <LucideX size={20} />
        </button>
      </header>
      <nav className="flex flex-col">
        <div className="border-b border-b-neutral-light dark:border-b-accent-dark-400 pb-5 mb-5">
          <ul className="flex flex-col gap-5 border-b border-b-neutral-light dark:border-b-accent-dark-400 pb-5 mb-5">
            <Navlink
              href="/me"
              icon={<LucideUser size={18} />}
              value="Overview"
              className="-m-2"
              onClick={onClose}
            />
            <Navlink
              href="/projects"
              icon={<LucideTarget size={18} />}
              value={
                <>
                  Projects{" "}
                  <span className="bg-accent-light-100 text-text-light-900 dark:bg-neutral-dark-200 px-2 rounded-full">
                    {projects?.length}
                  </span>
                </>
              }
              className="-m-2"
              onClick={onClose}
            />
            <Navlink
              href="/"
              icon={<LucideInbox size={18} />}
              value="Notifications"
              className="-m-2"
              onClick={onClose}
            />
            <Navlink
              href="/me/settings"
              icon={<LucideUserRoundCog size={18} />}
              value="Settings"
              onClick={onClose}
              className="-m-2"
            />
          </ul>
          <ul className="flex flex-col gap-5">
            <h2 className="text-xs font-semibold">Projects</h2>
            {projects?.map((project) => (
              <Navlink
                href={`/projects/${project.name_key}/board`}
                icon={<LucideKanban size={18} />}
                value={project.name}
                className="-m-2"
              />
            ))}
          </ul>
        </div>
        <button
          onClick={onLogoutClick}
          className="flex items-center gap-2 cursor-pointer p-2 -m-2 rounded-md hover:bg-neutral-light dark:hover:bg-neutral-light-100 transition-all duration-300 ease-in-out"
        >
          <LucideLogOut size={18} />
          Logout
        </button>
      </nav>
    </BaseModal>
  );
};

export default UserSidebar;

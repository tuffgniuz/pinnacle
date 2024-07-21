import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  LucideKanban,
  LucideLogOut,
  LucideTarget,
  LucideUser,
  LucideUserRoundCog,
  LucideX,
} from "lucide-react";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";
import useLogoutUser from "@/app/lib/hooks/useLogoutUser";
import Button from "../../actions/button";
import BaseModal from "../../data-display/base-modal";
import Avatar from "../../data-display/avatar";
import Navlink from "../navlink";
import useProjects from "@/app/lib/hooks/projects/useProjects";

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
      <header className="flex justify-between border-b border-b-neutral-light dark:border-b-accent-dark-400 pb-10 mb-10">
        <div className="flex items-center gap-5">
          <Avatar />
          <h1>{currentUser?.fullname}</h1>
        </div>
        <Button onClick={onClose} padding="sm" icon={<LucideX size={18} />} />
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
              value="Projects"
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

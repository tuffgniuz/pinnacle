import { FC } from "react";
import Link from "next/link";
import {
  LucideKanbanSquareDashed,
  LucideSettings,
  LucideUsersRound,
} from "lucide-react";
import { Project } from "@/app/lib/types/models";
import ListItem from "../list-item";

const ProjectSettingsSideNav: FC<{
  currentPage: string | undefined;
  project: Project | undefined;
}> = ({ currentPage, project }) => {
  const iconSize = 18;
  return (
    <>
      <h1 className="text-2xl mb-10">Settings</h1>
      <nav>
        <ul className="flex flex-col gap-5">
          <ListItem
            isActive={currentPage === `/projects/${project?.name_key}/settings`}
          >
            <LucideSettings size={iconSize} />
            <Link href={`/projects/${project?.name_key}/settings`}>
              General
            </Link>
          </ListItem>
          <ListItem>
            <LucideKanbanSquareDashed size={iconSize} />
            <Link href={`/projects/${project?.name_key}/settings/workflow`}>
              Workflow
            </Link>
          </ListItem>
          <ListItem
            isActive={
              currentPage ===
              `/projects/${project?.name_key}/settings/contributors`
            }
          >
            <LucideUsersRound size={iconSize} />
            <Link href={`/projects/${project?.name_key}/settings/contributors`}>
              Contributors
            </Link>
          </ListItem>
        </ul>
      </nav>
    </>
  );
};

export default ProjectSettingsSideNav;

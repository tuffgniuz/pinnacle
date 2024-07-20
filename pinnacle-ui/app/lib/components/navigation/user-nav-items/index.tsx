import { FC } from "react";
import {
  LucideBookOpen,
  LucideKanban,
  LucideListCheck,
  LucideSettings,
  LucideShieldCheck,
} from "lucide-react";

import withAuth from "@/app/lib/hocs/withAuth";
import Navlink from "../navlink";
import { Project } from "@/app/lib/types/models";

const UserNavItems: FC<{ project?: Project }> = ({ project }) => {
  const iconSize = 18;
  return (
    <>
      <li>
        <Navlink
          href={`/projects/${project?.name_key}/overview`}
          icon={<LucideBookOpen size={iconSize} />}
          value="Overview"
        />
      </li>
      <li>
        <Navlink
          href={`/projects/${project?.name_key}/board`}
          icon={<LucideKanban size={iconSize} />}
          value={
            <>
              Board{" "}
              <span className="bg-accent-light-100 text-text-light-900 dark:bg-neutral-dark-200 px-2 rounded-full">
                {project?.workflows[0].issues.length}
              </span>
            </>
          }
        />
      </li>
      {project?.has_backlog && (
        <li>
          <Navlink
            href="/"
            icon={<LucideListCheck size={iconSize} />}
            value={`Backlog`}
          />
        </li>
      )}
      <li>
        <Navlink
          href={`/projects/${project?.name_key}/security-controls`}
          icon={<LucideShieldCheck size={iconSize} />}
          value="Security Controls"
        />
      </li>
      <li>
        <Navlink
          href={`/projects/${project?.name_key}/settings`}
          icon={<LucideSettings size={iconSize} />}
          value="Settings"
        />
      </li>
    </>
  );
};

export default withAuth(UserNavItems);

import { FC } from "react";
import {
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
          href={`/projects/${project?.name_key}/board`}
          icon={<LucideKanban size={iconSize} />}
          value="Board"
        />
      </li>
      {project?.has_backlog && (
        <li>
          <Navlink
            href="/"
            icon={<LucideListCheck size={18} />}
            value={"Backlog"}
          />
        </li>
      )}
      <li>
        <Navlink
          href={`/projects/${project?.name_key}/security-controls`}
          icon={<LucideShieldCheck size={18} />}
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

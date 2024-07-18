import { FC } from "react";

import withAuth from "@/app/lib/hocs/withAuth";
import Navlink from "../navlink";
import {
  LucideKanban,
  LucideListCheck,
  LucideSettings,
  LucideShieldCheck,
} from "lucide-react";

const UserNavItems: FC = () => {
  const iconSize = 18;
  return (
    <>
      <li>
        <Navlink
          href="/"
          icon={<LucideKanban size={iconSize} />}
          value="Board"
        />
      </li>
      <li>
        <Navlink
          href="/"
          icon={<LucideListCheck size={18} />}
          value={"Backlog"}
        />
      </li>
      <li>
        <Navlink
          href="/"
          icon={<LucideShieldCheck size={18} />}
          value="Security Controls"
        />
      </li>
      <li>
        <Navlink
          href="/"
          icon={<LucideSettings size={iconSize} />}
          value="Settings"
        />
      </li>
    </>
  );
};

export default withAuth(UserNavItems);

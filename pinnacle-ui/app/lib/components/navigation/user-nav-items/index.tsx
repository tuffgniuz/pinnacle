import { FC } from "react";

import withAuth from "@/app/lib/hocs/withAuth";
import Navlink from "../navlink";
import { LucideKanban, LucideSettings } from "lucide-react";

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
          icon={<LucideSettings size={iconSize} />}
          value="Settings"
        />
      </li>
    </>
  );
};

export default withAuth(UserNavItems);

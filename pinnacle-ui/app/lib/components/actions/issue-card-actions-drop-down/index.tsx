import { FC, MouseEventHandler } from "react";
import {
  LucideMoreHorizontal,
  LucideTrash,
  LucideUserPlus,
} from "lucide-react";
import BaseDropDown from "../base-drop-down";

const IssueCardActionsDropDown: FC<{
  handleAddAssignee: MouseEventHandler<HTMLLIElement>;
  handleDelete: MouseEventHandler<HTMLLIElement>;
  className?: string;
}> = ({ handleDelete, handleAddAssignee, className }) => {
  const listStyle =
    "cursor-pointer flex items-center gap-2 p-1 -m-2 rounded-md transtion-all duration-300 ease-in-out";
  const listHoverStyle =
    "hover:bg-neutral-light dark:hover:bg-neutral-light-100";

  return (
    <div className={className}>
      <BaseDropDown
        icon={<LucideMoreHorizontal size={16} />}
        buttonClassName="hover:bg-neutral-light dark:hover:bg-accent-dark-500 p-1 -mx-1 rounded-lg"
        className="w-72"
      >
        <ul className="flex flex-col gap-5 p-5">
          <li
            onClick={handleAddAssignee}
            className={`${listStyle} ${listHoverStyle}`}
          >
            <LucideUserPlus size={18} />
            Add assignee
          </li>
          <li
            onClick={handleDelete}
            className={`${listStyle} text-light_red hover:bg-light_red-900`}
          >
            <LucideTrash size={18} />
            <span>Delete</span>
          </li>
        </ul>
      </BaseDropDown>
    </div>
  );
};

export default IssueCardActionsDropDown;

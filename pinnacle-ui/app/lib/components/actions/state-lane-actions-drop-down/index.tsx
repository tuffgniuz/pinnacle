import { FC, MouseEventHandler } from "react";
import { LucideEdit, LucideMoreHorizontal, LucideTrash } from "lucide-react";
import BaseDropDown from "../base-drop-down";

const StateLaneActionsDropDown: FC<{
  handleDeleteState: MouseEventHandler<HTMLLIElement>;
  handleShowStateUpdateForm: MouseEventHandler<HTMLLIElement>;
}> = ({ handleDeleteState, handleShowStateUpdateForm }) => {
  const listStyle =
    "cursor-pointer flex items-center gap-2 p-1 -m-2 rounded-md transtion-all duration-300 ease-in-out";
  const styleOnHover =
    "hover:bg-neutral-light dark:hover:bg-accent-dark-500 p-4 rounded-lg transition-all duration-300 ease-in-out";

  return (
    <BaseDropDown
      icon={<LucideMoreHorizontal size={18} />}
      buttonClassName={styleOnHover}
      className="w-72"
    >
      <ul className="flex flex-col gap-5 p-5">
        <li
          onClick={handleShowStateUpdateForm}
          className={`${listStyle} ${styleOnHover}`}
        >
          <LucideEdit size={18} />
          <span>Edit details</span>
        </li>
        <li
          onClick={handleDeleteState}
          className={`${listStyle} text-light_red hover:bg-light_red-900`}
        >
          <LucideTrash size={18} />
          <span>Delete</span>
        </li>
      </ul>
    </BaseDropDown>
  );
};

export default StateLaneActionsDropDown;

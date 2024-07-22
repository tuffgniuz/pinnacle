import { FC, MouseEventHandler } from "react";
import { LucideEdit, LucideMoreHorizontal } from "lucide-react";
import BaseDropDown from "../base-drop-down";

const StateLaneActionsDropDown: FC<{
  handleShowStateUpdateForm: MouseEventHandler<HTMLLIElement>;
}> = ({ handleShowStateUpdateForm }) => {
  const listStyle =
    "cursor-pointer flex items-center gap-2 p-1 -m-2 rounded-md transtion-all duration-300 ease-in-out";
  const styleOnHover =
    "hover:bg-neutral-light dark:hover:bg-neutral-light-100 p-2 rounded-lg transition-all duration-300 ease-in-out";

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
      </ul>
    </BaseDropDown>
  );
};

export default StateLaneActionsDropDown;

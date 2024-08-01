import { FC } from "react";
import {
  LucideArrowLeft,
  LucideKanbanSquare,
  LucidePlus,
  LucideSquareKanban,
} from "lucide-react";
import { Project } from "@/app/lib/types/models";
import useProjectBoards from "@/app/lib/hooks/projects/useProjectBoards";
import BaseDropDown from "../base-drop-down";

const BoardPickerDropDown: FC<{ project: Project | undefined }> = ({
  project,
}) => {
  const { data: boards } = useProjectBoards(project?.id);

  return (
    <BaseDropDown
      showChevron
      btnNode={
        <span className="flex items-center gap-4">
          <LucideKanbanSquare size={18} />
          {project?.default_board.name}
          <span
            className="
              bg-neutral-light-700 
              text-text-light-100
              flex items-center justify-center 
              h-5 w-5 
              rounded-full 
            "
          >
            {project?.boards.length}
          </span>
        </span>
      }
      buttonClassName="bg-accent-light-300 dark:bg-background-dark text-text-dark-900 rounded-lg"
      className="w-80 border dark:border-accent-light-500"
    >
      <h1 className="p-4 font-semibold border-b border-accent-light-500">
        Switch to another board
      </h1>
      <ul className="border-b border-accent-light-500">
        {boards?.map((board) => (
          <li
            key={board.id}
            className="flex items-center justify-between cursor-pointer p-4"
          >
            <div className="flex items-center gap-2">
              <LucideSquareKanban size={18} />
              {board.name}
            </div>
            <div className="flex justify-end">
              {project?.default_board.id === board.id && (
                <LucideArrowLeft size={18} />
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="p-2 text-center flex justify-center">
        <button
          className="
            flex items-center gap-2 
            text-center 
            dark:bg-background-dark
            p-2 rounded-lg
          "
        >
          <LucidePlus size={18} />
          Create board
        </button>
      </div>
    </BaseDropDown>
  );
};

export default BoardPickerDropDown;

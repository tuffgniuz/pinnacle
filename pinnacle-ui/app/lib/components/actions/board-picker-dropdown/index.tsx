import { FC } from "react";
import { Board, Project } from "@/app/lib/types/models";
import useProjectBoards from "@/app/lib/hooks/projects/useProjectBoards";
import BaseDropDown from "../base-drop-down";
import {
  LucideArrowLeft,
  LucideKanban,
  LucidePlus,
  LucideSquareKanban,
} from "lucide-react";

const BoardPickerDropDown: FC<{ project: Project | undefined }> = ({
  project,
}) => {
  const { data: boards } = useProjectBoards(project?.id);

  return (
    <BaseDropDown
      icon={<LucideKanban size={18} />}
      title={
        <span className="flex gap-2">
          <span className="flex items-center justify-center bg-background-light h-5 w-5 rounded-full text-text-dark-100 text-sm">
            {project?.boards.length}
          </span>
          {project?.default_board.name}
        </span>
      }
      buttonClassName="bg-accent-light-300 dark:bg-accent-dark-500 text-text-dark-900 py-2 px-4 rounded-lg"
      className="w-80 border dark:border-accent-light-500"
    >
      <h1 className="p-4 font-semibold border-b">Switch to another board</h1>
      <ul className="border-b">
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
      <div className="p-4 text-center flex justify-center">
        <button className="flex items-center gap-2 text-center">
          <LucidePlus size={18} />
          Create board
        </button>
      </div>
    </BaseDropDown>
  );
};

export default BoardPickerDropDown;

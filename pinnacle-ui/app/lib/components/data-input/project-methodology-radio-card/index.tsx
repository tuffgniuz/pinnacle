"use client";
import { FC } from "react";
import { DiScrum } from "react-icons/di";
import { TbLayoutKanban } from "react-icons/tb";

const ProjectMethodologyRadioCard: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-background-dark-500 dark:bg-accent-light dark:text-accent-light-900 rounded-lg flex flex-col items-center justify-center p-4">
        <h1 className="text-center mb-2 font-semibold">Scrum</h1>
        <DiScrum size={200} />
      </div>
      <div className="bg-background-dark-500 dark:bg-accent-light dark:text-accent-light-900 rounded-lg flex flex-col items-center justify-center p-4">
        <h1 className="text-center mb-2 font-semibold">Kanban</h1>
        <TbLayoutKanban size={200} />
      </div>
    </div>
  );
};

export default ProjectMethodologyRadioCard;

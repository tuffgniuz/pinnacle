"use client";
import { FC } from "react";
import { DiScrum } from "react-icons/di";
import { TbLayoutKanban } from "react-icons/tb";

import { ProjectMethodology } from "@/app/lib/types/enums";

import Card from "../../data-display/card";

const ProjectMethodologyRadioCard: FC<{
  value: ProjectMethodology;
  onChange: (value: ProjectMethodology) => void;
}> = ({ value, onChange }) => {
  const handleSelect = (methodology: ProjectMethodology) => {
    onChange(methodology);
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <Card
        className={`
          cursor-pointer
          outline
          outline-1
          transition-all
          duration-300
          ease-in-out
          ${value === ProjectMethodology.SCRUM ? "outline-sky_magenta text-sky_magenta" : "outline-transparent"}
        `}
        onClick={() => handleSelect(ProjectMethodology.SCRUM)}
      >
        <h1 className="text-center mb-2 font-semibold">Scrum</h1>
        <DiScrum size={200} />
      </Card>
      <Card
        className={`
          cursor-pointer
          outline
          outline-1
          transition-all
          duration-300
          ease-in-out
          ${value === ProjectMethodology.KANBAN ? "outline-sky_magenta text-sky_magenta" : "outline-transparent"}
        `}
        onClick={() => handleSelect(ProjectMethodology.KANBAN)}
      >
        <h1 className="text-center mb-2 font-semibold">Kanban</h1>
        <TbLayoutKanban size={200} />
      </Card>
    </div>
  );
};

export default ProjectMethodologyRadioCard;

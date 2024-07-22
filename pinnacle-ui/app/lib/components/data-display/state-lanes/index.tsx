import { FC } from "react";
import { Project, State } from "@/app/lib/types/models";
import StateLane from "../state-lane";

const StateLanes: FC<{ project: Project; states: State[] | undefined }> = ({
  project,
  states,
}) => {
  return (
    <div className="flex gap-10">
      {states?.map((state) => <StateLane project={project} state={state} />)}
    </div>
  );
};

export default StateLanes;

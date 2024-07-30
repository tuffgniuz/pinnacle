import { FC } from "react";
import { Project, State } from "@/app/lib/types/models";
import StateLane from "../state-lane";
import StateQuickCreateForm from "../../forms/issue-assignee-form/state-quick-create-form";

const StateLanes: FC<{
  project: Project | undefined;
  states: State[] | undefined;
}> = ({ project, states }) => {
  return (
    <>
      <StateQuickCreateForm workflowId={project?.default_board.workflow.id} />
      <div className="flex gap-10">
        {states?.map((state) => (
          <StateLane key={state.id} project={project} state={state} />
        ))}
      </div>
    </>
  );
};

export default StateLanes;

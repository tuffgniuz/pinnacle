import { FC } from "react";
import { Project, State } from "@/app/lib/types/models";
import StateLane from "../state-lane";
import StateQuickCreateForm from "../../forms/issue-assignee-form/state-quick-create-form";

const StateLanes: FC<{ project: Project; states: State[] | undefined }> = ({
  project,
  states,
}) => {
  const workflowId = project.workflows[0].id;

  return (
    <>
      <StateQuickCreateForm workflowId={workflowId} />
      <div className="flex gap-10">
        {states?.map((state) => (
          <StateLane key={state.id} project={project} state={state} />
        ))}
      </div>
    </>
  );
};

export default StateLanes;

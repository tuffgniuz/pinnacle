import { FC } from "react";
import { Project, State } from "@/app/lib/types/models";
import IssueCreateForm from "../../forms/issue-create-form";
import IssueCard from "../issue-card";

const StateLanes: FC<{ project: Project; states: State[] | undefined }> = ({
  project,
  states,
}) => {
  return (
    <div className="flex gap-10">
      {states?.map((state) => (
        <div key={state.id} className="w-3/12">
          {" "}
          {/* this div should be able have it's own scrollbar */}
          <h1 className="text-2xl mb-10 flex items-center gap-2">
            <span>{state.name}</span>
            <span className="text-sm bg-accent-light-100 text-text-light-900 dark:bg-neutral-dark-200 px-2 rounded-full">
              {state.issues.length}
            </span>
          </h1>
          <IssueCreateForm project={project} stateId={state.id} />
          <div className="flex flex-col gap-5">
            {state.issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StateLanes;

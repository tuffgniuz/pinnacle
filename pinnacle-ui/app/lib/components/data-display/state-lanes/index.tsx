import { FC, useState } from "react";
import { LucideCheckCircle } from "lucide-react";
import { Project, State } from "@/app/lib/types/models";
import IssueCreateForm from "../../forms/issue-create-form";
import IssueCard from "../issue-card";
import StateLaneActionsDropDown from "../../actions/state-lane-actions-drop-down";
import StateUpdateModalForm from "../../forms/state-update-modal-form";

const StateLanes: FC<{ project: Project; states: State[] | undefined }> = ({
  project,
  states,
}) => {
  const [showStateUpdateForm, setShowStateUpdateForm] =
    useState<boolean>(false);

  return (
    <div className="flex gap-10">
      {states?.map((state) => (
        <>
          <div key={state.id} className="w-3/12">
            {" "}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <h1 className="flex items-center gap-2 text-2xl">
                  <span>{state.name}</span>
                  <span
                    className="
                    text-sm 
                    bg-accent-light-100 
                    text-text-light-900 
                    dark:bg-neutral-dark-200 
                    flex items-center justify-center 
                    h-7 w-7 
                    rounded-full
                  "
                  >
                    {state.issues.length}
                  </span>
                </h1>
                <StateLaneActionsDropDown
                  handleShowStateUpdateForm={() => setShowStateUpdateForm(true)}
                />
              </div>

              {state.is_final_state && <LucideCheckCircle size={20} />}
            </div>
            <IssueCreateForm project={project} stateId={state.id} />
            <div className="flex flex-col gap-5">
              {state.issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
          <StateUpdateModalForm
            showModal={showStateUpdateForm}
            onClose={() => setShowStateUpdateForm(false)}
            state={state}
          />
        </>
      ))}
    </div>
  );
};

export default StateLanes;

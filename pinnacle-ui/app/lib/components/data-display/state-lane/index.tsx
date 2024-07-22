import { FC, useState } from "react";
import { LucideCheckCircle, LucideCircle } from "lucide-react";
import { Project, State } from "@/app/lib/types/models";
import StateLaneActionsDropDown from "../../actions/state-lane-actions-drop-down";
import IssueCard from "../issue-card";
import IssueCreateForm from "../../forms/issue-create-form";
import StateUpdateModalForm from "../../forms/state-update-modal-form";

const StateLane: FC<{ state: State; project: Project }> = ({
  state,
  project,
}) => {
  const [showStateUpdateForm, setShowStateUpdateForm] =
    useState<boolean>(false);
  return (
    <>
      <div key={state.id} className="w-3/12">
        {" "}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <h1 className="flex items-center gap-4 text-2xl">
              <LucideCircle size={20} />
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

          {state.is_final_state && <LucideCheckCircle />}
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
  );
};

export default StateLane;

import { FC, useState } from "react";
import { LucideCheckCircle, LucideCircle } from "lucide-react";
import { Project, State } from "@/app/lib/types/models";
import StateLaneActionsDropDown from "../../actions/state-lane-actions-drop-down";
import IssueCard from "../issue-card";
import IssueCreateForm from "../../forms/issue-create-form";
import StateUpdateModalForm from "../../forms/state-update-modal-form";
import StateConfirmDeleteModal from "../../actions/state-confirm-delete-modal";

const StateLane: FC<{
  state: State | undefined;
  project: Project | undefined;
}> = ({ state, project }) => {
  const [showStateConfirmDeleteModal, setShowStateConfirmDeleteModal] =
    useState<boolean>(false);
  const [showStateUpdateForm, setShowStateUpdateForm] =
    useState<boolean>(false);

  return (
    <>
      <div className="w-3/12 max-h-screen">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <LucideCircle size={20} style={{ color: state?.color }} />
            <h1 className="flex items-center gap-4 text-2xl">
              <span>{state?.name}</span>
              <div
                className="
                  text-sm 
                  bg-accent-light-100 
                  text-text-light-900 
                  dark:bg-neutral-dark-200 
                  flex items-center justify-center 
                  px-3 py-1
                  rounded-full
                "
              >
                <span>{state?.issues.length}</span>
                {state?.limit && (
                  <>
                    <span>/</span>
                    <span>{state.limit}</span>
                  </>
                )}
              </div>
            </h1>
            <StateLaneActionsDropDown
              handleDeleteState={() => setShowStateConfirmDeleteModal(true)}
              handleShowStateUpdateForm={() => setShowStateUpdateForm(true)}
            />
          </div>
          {state?.is_final_state && (
            <LucideCheckCircle
              size={24}
              className="ml-4"
              style={{ color: state.color }}
            />
          )}
        </div>
        <div className="min-h-5 mb-5">
          <p className="text-text-dark-600">{state?.description}</p>
        </div>
        <IssueCreateForm project={project} state={state} />
        <div className="flex flex-col gap-5">
          {state?.issues.map((issue) => (
            <IssueCard state={state} key={issue.id} issueId={issue.id} />
          ))}
        </div>
      </div>
      <StateUpdateModalForm
        showModal={showStateUpdateForm}
        onClose={() => setShowStateUpdateForm(false)}
        state={state}
      />
      <StateConfirmDeleteModal
        state={state}
        showModal={showStateConfirmDeleteModal}
        onClose={() => setShowStateConfirmDeleteModal(false)}
      />
    </>
  );
};

export default StateLane;

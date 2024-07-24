import { FC, useState } from "react";
import { LucideCheckCircle, LucideCircle } from "lucide-react";
import { Project, State } from "@/app/lib/types/models";
import StateLaneActionsDropDown from "../../actions/state-lane-actions-drop-down";
import IssueCard from "../issue-card";
import IssueCreateForm from "../../forms/issue-create-form";
import StateUpdateModalForm from "../../forms/state-update-modal-form";
import useColors from "@/app/lib/hooks/projects/useColors";
import StateConfirmDeleteModal from "../../actions/state-confirm-delete-modal";

const StateLane: FC<{ state: State; project: Project }> = ({
  state,
  project,
}) => {
  const { data: colors } = useColors();
  const [showStateConfirmDeleteModal, setShowStateConfirmDeleteModal] =
    useState<boolean>(false);
  const [showStateUpdateForm, setShowStateUpdateForm] =
    useState<boolean>(false);

  const selectedColor = colors?.find((color) => color.id === state.color_id);
  const iconColor = selectedColor ? selectedColor.name : "";

  return (
    <>
      <div className="w-3/12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <LucideCircle size={20} style={{ color: iconColor }} />
            <h1 className="flex items-center gap-4 text-2xl">
              <span>{state.name}</span>
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
                <span>{state.issues.length}</span>
                {state.limit && (
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
          {state.is_final_state && (
            <LucideCheckCircle size={24} className="ml-4" />
          )}
        </div>
        <div className="min-h-5 mb-5">
          <p>{state.description}</p>
        </div>
        <IssueCreateForm project={project} stateId={state.id} />
        <div className="flex flex-col gap-5">
          {state.issues.map((issue) => (
            <IssueCard
              state={state}
              stateColor={iconColor}
              key={issue.id}
              issueId={issue.id}
            />
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

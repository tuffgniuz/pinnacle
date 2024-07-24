import { FC, useState } from "react";
import { Issue, State } from "@/app/lib/types/models";
import Card from "../card";
import IssueAssigneeForm from "../../forms/issue-assignee-form";
import IssueDetailModal from "../issue-detail-modal";
import IssueCardActionsDropDown from "../../actions/issue-card-actions-drop-down";
import IssueConfirmDeleteModal from "../../actions/issue-confirm-delete-modal";
import IssueAssigneePickerModal from "../../actions/issue-assignee-picker-modal";
import { LucideCircleDot } from "lucide-react";
import StateConfirmDeleteModal from "../../actions/state-confirm-delete-modal";

const IssueCard: FC<{ issue: Issue; state: State; stateColor: string }> = ({
  issue,
  state,
  stateColor,
}) => {
  const [showIssueDetailModal, setShowIssueDetailModal] =
    useState<boolean>(false);
  const [showIssueConfirmDeleteModal, setShowIssueConfirmDeleteModal] =
    useState<boolean>(false);
  const [showAssigneePickerModal, setShowAssigneePickerModal] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <Card
        padding="lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center py-1 -my-1 gap-5">
            <div className="flex items-center gap-2">
              <LucideCircleDot size={16} style={{ color: stateColor }} />
              <span className="italic text-sm text-text-dark-600">
                {issue.issue_key}
              </span>
            </div>
            {isHovered && (
              <IssueCardActionsDropDown
                handleAddAssignee={() => setShowAssigneePickerModal(true)}
                handleDelete={() => setShowIssueConfirmDeleteModal(true)}
              />
            )}
          </div>
          <IssueAssigneeForm issue={issue} assignees={issue.assignees} />
        </div>
        <h1
          onClick={() => setShowIssueDetailModal(true)}
          className="hover:cursor-pointer hover:text-sky_magenta-600 hover:underline hover:underline-offset-1 mb-4"
        >
          {issue.title}
        </h1>
      </Card>
      <IssueAssigneePickerModal
        issue={issue}
        showModal={showAssigneePickerModal}
        onClose={() => setShowAssigneePickerModal(false)}
      />
      <IssueConfirmDeleteModal
        issue={issue}
        showModal={showIssueConfirmDeleteModal}
        onClose={() => setShowIssueConfirmDeleteModal(false)}
      />
      <IssueDetailModal
        issueId={issue.id}
        showModal={showIssueDetailModal}
        onClose={() => setShowIssueDetailModal(false)}
      />
    </>
  );
};

export default IssueCard;

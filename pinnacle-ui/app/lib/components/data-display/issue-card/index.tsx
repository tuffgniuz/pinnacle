import { FC, MouseEventHandler, useState } from "react";
import { State } from "@/app/lib/types/models";
import { LucideCircleDot } from "lucide-react";
import useIssueDetail from "@/app/lib/hooks/projects/useIssueDetail";
import Card from "../card";
import IssueAssigneeForm from "../../forms/issue-assignee-form";
import IssueDetailModal from "../issue-detail-modal";
import IssueCardActionsDropDown from "../../actions/issue-card-actions-drop-down";
import IssueConfirmDeleteModal from "../../actions/issue-confirm-delete-modal";
import IssueAssigneePickerModal from "../../actions/issue-assignee-picker-modal";
import IssueLabels from "../issue-labels";

const IssueCard: FC<{
  issueId: string | undefined;
  state: State;
}> = ({ issueId, state }) => {
  const [showIssueDetailModal, setShowIssueDetailModal] =
    useState<boolean>(false);
  const [showIssueConfirmDeleteModal, setShowIssueConfirmDeleteModal] =
    useState<boolean>(false);
  const [showAssigneePickerModal, setShowAssigneePickerModal] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { data: issue, isLoading } = useIssueDetail(issueId);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (isLoading) {
    return <p>Loading..</p>;
  }

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
              <LucideCircleDot size={20} style={{ color: state.color }} />
              <span className="italic text-sm text-text-dark-600">
                {issue?.issue_key}
              </span>
            </div>
            {isHovered && (
              <IssueCardActionsDropDown
                handleAddAssignee={() => setShowAssigneePickerModal(true)}
                handleDelete={() => setShowIssueConfirmDeleteModal(true)}
              />
            )}
          </div>
          <IssueAssigneeForm issue={issue} assignees={issue?.assignees} />
        </div>
        <h1
          onClick={() => setShowIssueDetailModal(true)}
          className="
            hover:cursor-pointer 
            hover:text-sky_magenta-600 
            hover:underline 
            hover:underline-offset-1 
            mb-5
          "
        >
          {issue?.title}
        </h1>
        <IssueLabels issue={issue} />
      </Card>
      {/* MODALS */}
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
        issueId={issue?.id}
        showModal={showIssueDetailModal}
        onClose={() => setShowIssueDetailModal(false)}
      />
    </>
  );
};

export default IssueCard;

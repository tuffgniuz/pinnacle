import { FC, useState } from "react";
import { Issue } from "@/app/lib/types/models";
import Card from "../card";
import IssueAssigneeForm from "../../forms/issue-assignee-form";
import IssueDetailModal from "../issue-detail-modal";
import IssueCardActionsDropDown from "../../actions/issue-card-actions-drop-down";
import IssueConfirmDeleteModal from "../../actions/issue-confirm-delete-modal";

const IssueCard: FC<{ issue: Issue }> = ({ issue }) => {
  const [showIssueDetailModal, setShowIssueDetailModal] =
    useState<boolean>(false);
  const [showIssueConfirmDeleteModal, setShowIssueConfirmDeleteModal] =
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
        <div className="flex items-center gap-5 mb-3">
          <IssueAssigneeForm issueId={issue.id} assignees={issue.assignees} />
          {isHovered && (
            <IssueCardActionsDropDown
              handleDelete={() => setShowIssueConfirmDeleteModal(true)}
            />
          )}
        </div>
        <h1
          onClick={() => setShowIssueDetailModal(true)}
          className="hover:cursor-pointer hover:text-sky_magenta-600 hover:underline hover:underline-offset-1 mb-4"
        >
          {issue.title}
        </h1>
        {/*<p>order: {issue.order}</p>*/}
      </Card>
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

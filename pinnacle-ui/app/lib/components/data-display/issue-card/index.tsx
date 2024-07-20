import { FC, useState } from "react";
import { Issue } from "@/app/lib/types/models";
import Card from "../card";
import IssueAssigneeForm from "../../forms/issue-assignee-form";
import IssueDetailModal from "../issue-detail-modal";

const IssueCard: FC<{ issue: Issue }> = ({ issue }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Card padding="lg">
        <div className="flex items-center justify-between gap-2 mb-4">
          <IssueAssigneeForm issueId={issue.id} assignees={issue.assignees} />
          <p className="text-text-light-300 italic text-sm">
            {issue?.issue_key}
          </p>
        </div>
        <h1
          onClick={() => setShowModal(true)}
          className="hover:cursor-pointer transition-all duration-300 ease-in-out mb-4"
        >
          {issue.title}
        </h1>
        <p>order: {issue.order}</p>
      </Card>
      <IssueDetailModal
        issueId={issue.id}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default IssueCard;

import { FC } from "react";
import { Issue } from "@/app/lib/types/models";
import Card from "../card";
import IssueAssigneeForm from "../../forms/issue-assignee-form";

const IssueCard: FC<{ issue: Issue }> = ({ issue }) => {
  return (
    <Card padding="lg">
      <div className="flex items-center justify-between gap-2 mb-4">
        <IssueAssigneeForm />
        <p className="text-text-light-300 italic text-sm">{issue?.issue_key}</p>
      </div>
      <h1 className="hover:cursor-pointer transition-all duration-300 ease-in-out mb-4">
        {issue.title}
      </h1>
      <p>order: {issue.order}</p>
    </Card>
  );
};

export default IssueCard;

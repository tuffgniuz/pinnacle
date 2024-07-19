import { FC } from "react";
import { Issue } from "@/app/lib/types/models";
import Card from "../card";

const IssueCard: FC<{ issue: Issue }> = ({ issue }) => {
  return (
    <Card className="cursor-pointer">
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-text-light-300 italic">No assignees</p>
        <p className="text-text-light-300 italic text-sm">{issue.issue_key}</p>
      </div>
      <h1>{issue.title}</h1>
      <p>order: {issue.order}</p>
    </Card>
  );
};

export default IssueCard;

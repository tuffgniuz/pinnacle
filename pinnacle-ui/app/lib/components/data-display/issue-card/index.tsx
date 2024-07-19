import { FC } from "react";
import { Issue } from "@/app/lib/types/models";
import Card from "../card";

const IssueCard: FC<{ issue: Issue }> = ({ issue }) => {
  return (
    <Card>
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="italic">No assignees</p>
        <p>order: {issue.order}</p>
      </div>
      <h1>{issue.title}</h1>
    </Card>
  );
};

export default IssueCard;

import { FC } from "react";
import { User } from "@/app/lib/types/models";

const IssueAssigneeList: FC<{ assignees: User[]; }> = ({ assignees }) => {
  return (
    {assignees.map((assignee))} 
  )
}

export default IssueAssigneeList

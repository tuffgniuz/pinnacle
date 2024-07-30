import { FC } from "react";
import { LucidePlus, LucideUserPlus, LucideUserPlus2 } from "lucide-react";
import { Issue, User } from "@/app/lib/types/models";
import BaseDropDown from "../base-drop-down";
import TextInput from "../../data-input/text-input";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import { useParams } from "next/navigation";
import Avatar from "../../data-display/avatar";
import useAddAssignee from "@/app/lib/hooks/projects/useAddAssignee";

const IssueAssigneePickerDropDown: FC<{ issue: Issue | undefined }> = ({
  issue,
}) => {
  const { key } = useParams<{ key: string }>();
  const { data: project } = useProjectDetail(key);
  const { mutation } = useAddAssignee(issue?.id);

  const handleAddAssignee = (user: User) => {
    if (!issue?.assignees!.some((assignee) => assignee.id === user.id)) {
      mutation.mutate(user.id);
    }
  };

  return (
    <BaseDropDown
      title={
        <div className="flex items-center gap-2">
          <LucideUserPlus size={18} />
          Add assignee
        </div>
      }
      backgroundColor="bg-background-dark-800 dark:bg-accent-dark-400"
      buttonClassName="flex items-center justify-center bg-accent-light-300 text-text-light-900 rounded-lg px-4 py-1"
      className="bg-background-light dark:bg-accent-dark-500 w-80 border dark:border-accent-light-500"
    >
      <form>
        <TextInput
          autoFocus
          fullWidth
          outlineNone
          placeholder="Search people..."
          rounded="none"
          className="border-b dark:border-b-accent-light-500"
        />
      </form>
      <h1 className="p-4 font-semibold text-text-light-400 border-b dark:border-b-accent-light-500">
        Project contributors
      </h1>
      <ul className="cursor-pointer flex flex-col gap-5 p-4">
        {project?.users.map((assignee) => (
          <li
            onClick={() => handleAddAssignee(assignee)}
            className="flex items-center gap-5"
          >
            <Avatar size={40} />
            <span>{assignee.fullname}</span>
          </li>
        ))}
      </ul>
    </BaseDropDown>
  );
};

export default IssueAssigneePickerDropDown;

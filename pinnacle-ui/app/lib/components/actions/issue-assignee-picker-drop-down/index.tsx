import { FC } from "react";
import { LucidePlus, LucideUserPlus, LucideUserPlus2 } from "lucide-react";
import { Issue } from "@/app/lib/types/models";
import BaseDropDown from "../base-drop-down";
import TextInput from "../../data-input/text-input";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import { useParams } from "next/navigation";
import Avatar from "../../data-display/avatar";

const IssueAssigneePickerDropDown: FC<{ issue: Issue | undefined }> = ({
  issue,
}) => {
  const { key } = useParams<{ key: string }>();
  const { data: project } = useProjectDetail(key);
  return (
    <BaseDropDown
      icon={<LucidePlus size={20} />}
      backgroundColor="bg-background-dark-800 dark:bg-accent-dark-400"
      buttonClassName="flex items-center justify-center dark:bg-accent-dark-400 h-10 w-10 rounded-full"
      className="w-80"
    >
      <form>
        <TextInput
          autoFocus
          fullWidth
          outlineNone
          placeholder="Search people..."
          rounded="none"
          className="border-b dark:border-b-accent-dark-500"
        />
      </form>
      <h1 className="p-4 font-semibold text-text-dark-700 border-b dark:border-b-accent-dark-500">
        Project contributors
      </h1>
      <ul className="cursor-pointer flex flex-col gap-5 p-4">
        {project?.users.map((assignee) => (
          <li className="flex items-center gap-5">
            <Avatar size={40} />
            <span>{assignee.fullname}</span>
          </li>
        ))}
      </ul>
    </BaseDropDown>
  );
};

export default IssueAssigneePickerDropDown;

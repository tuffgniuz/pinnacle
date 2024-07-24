import { FC } from "react";
import { useParams } from "next/navigation";
import { LucideCheck } from "lucide-react";
import { Issue, User } from "@/app/lib/types/models";
import useAddAssignee from "@/app/lib/hooks/projects/useAddAssignee";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import BaseModal from "../../data-display/base-modal";
import Avatar from "../../data-display/avatar";

const IssueAssigneePickerModal: FC<{
  issue: Issue | undefined;
  showModal: boolean;
  onClose: () => void;
}> = ({ issue, showModal, onClose }) => {
  const { key } = useParams<{ key: string }>();
  const { mutation } = useAddAssignee(issue?.id);
  const { data: project } = useProjectDetail(key);

  const handleAddAssignee = (user: User) => {
    // Prevent sending request if user already is assigned
    if (!issue?.assignees.some((assignee) => assignee.id === user.id)) {
      mutation.mutate(user.id);
    }
  };

  return (
    <BaseModal show={showModal} onClose={onClose} className="w-1/5">
      <form>
        <input
          placeholder="Search user..."
          className="bg-transparent border-b border-b-accent-light-900 dark:border-b-accent-dark-400 outline-none w-full p-4"
        />
      </form>
      <ul>
        {project?.users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleAddAssignee(user)}
            className="
                flex items-center justify-between 
                border-b 
                border-b-accent-light-900 
                dark:border-b-accent-dark-400 
                last:border-b-0
                hover:bg-background-dark-500
                dark:hover:bg-accent-dark-400
                last:hover:rounded-b-lg
                p-4 cursor-pointer
              "
          >
            <div className="flex items-center gap-5">
              <Avatar />
              <span className="font-semibold">@{user.fullname}</span>
            </div>
            {/* show Checkmark if user already added to issue */}
            {issue?.assignees.some((assignee) => assignee.id === user.id) && (
              <LucideCheck size={20} />
            )}
          </li>
        ))}
      </ul>
    </BaseModal>
  );
};

export default IssueAssigneePickerModal;

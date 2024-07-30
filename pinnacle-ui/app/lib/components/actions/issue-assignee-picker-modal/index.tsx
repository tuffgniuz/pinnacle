import { FC } from "react";
import { useParams } from "next/navigation";
import { LucideCheck } from "lucide-react";
import { Issue, User } from "@/app/lib/types/models";
import useAddAssignee from "@/app/lib/hooks/projects/useAddAssignee";
import useCurrentUser from "@/app/lib/hooks/useCurrentUser";
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
  const { data: currentUser } = useCurrentUser();

  const handleAddAssignee = (user: User) => {
    // Prevent sending request if user already is assigned
    if (issue?.assignees!.some((assignee) => assignee.id === user.id)) {
      mutation.mutate(user.id);
    }
  };

  return (
    <BaseModal
      show={showModal}
      onClose={onClose}
      className="w-1/4 border dark:border-accent-dark-500"
    >
      <form>
        <input
          autoFocus
          placeholder="Search user..."
          className="bg-transparent border-b border-b-accent-light-900 dark:border-b-accent-dark-500 outline-none w-full p-4 transition-all duration-300 ease-in-out"
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
                dark:border-b-accent-dark-500 
                last:border-b-0
                hover:bg-background-dark-500
                dark:hover:bg-accent-dark-500
                last:hover:rounded-b-lg
                p-4 cursor-pointer
                transition-all duration-300 ease-in-out
              "
          >
            <div className="flex items-center gap-5">
              <Avatar />
              <h1 className="font-semibold flex gap-2">
                {user.fullname}
                {currentUser?.id === user.id && (
                  <span className="font-normal italic text-text-dark-600">
                    (Me)
                  </span>
                )}
              </h1>
            </div>
            {/* show Checkmark if user already added to issue */}
            {issue?.assignees!.some((assignee) => assignee.id === user.id) && (
              <LucideCheck size={20} />
            )}
          </li>
        ))}
      </ul>
    </BaseModal>
  );
};

export default IssueAssigneePickerModal;

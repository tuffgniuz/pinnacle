import { FC, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "@/app/lib/types/models";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import useAddAssignee from "@/app/lib/hooks/projects/useAddAssignee";
import BaseModal from "../../data-display/base-modal";
import Avatar from "../../data-display/avatar";

const IssueAssigneeForm: FC<{ issueId: string; assignees: User[] }> = ({
  issueId,
  assignees,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { key } = useParams<{ key: string }>();
  const { data: project } = useProjectDetail(key);
  const { mutation } = useAddAssignee(issueId);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleAddAssignee = (user: User) => {
    mutation.mutate(user.id);
  };

  return (
    <>
      {assignees.length < 1 ? (
        <button
          onClick={handleClick}
          className="hover:bg-accent-dark -m-1 p-1 text-text-light-300 italic transition-all duration-300 ease-in-out rounded-lg"
        >
          No assignees
        </button>
      ) : (
        <div>
          {assignees?.map((assignee) => (
            <div className="bg-sky_magenta-600 w-7 h-7 rounded-full flex justify-center items-center">
              <p className="font-bold">{assignee?.fullname[0].toUpperCase()}</p>
            </div>
          ))}
        </div>
      )}

      <BaseModal
        show={showForm}
        onClose={() => setShowForm(false)}
        className="w-1/5"
      >
        <form>
          <input
            placeholder="Search user..."
            className="bg-transparent border-b border-b-accent-light-900 dark:border-b-accent-dark-400 outline-none w-full p-4"
          />
        </form>
        <ul>
          {project?.users.map((user) => (
            <li
              onClick={() => handleAddAssignee(user)} // Clicking this should update the issue and add the assignee
              className="
                flex items-center gap-5
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
              <Avatar />
              <span className="font-semibold">@{user.fullname}</span>
            </li>
          ))}
        </ul>
      </BaseModal>
    </>
  );
};

export default IssueAssigneeForm;

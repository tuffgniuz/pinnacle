import { FC, useState } from "react";
import BaseModal from "../../data-display/base-modal";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import { useParams } from "next/navigation";
import Avatar from "../../data-display/avatar";

const IssueAssigneeForm: FC = () => {
  const { key } = useParams<{ key: string }>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const { data: project } = useProjectDetail(key);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="hover:bg-accent-dark -m-1 p-1 text-text-light-300 italic transition-all duration-300 ease-in-out rounded-lg"
      >
        No assignees
      </button>
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
            <li className="flex items-center border-b border-b-accent-light-900 dark:border-b-accent-dark-400 gap-5 p-4 cursor-pointer">
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

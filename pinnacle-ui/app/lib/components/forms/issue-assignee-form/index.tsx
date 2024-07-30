import { FC, useState } from "react";
import { Issue, User } from "@/app/lib/types/models";
import IssueAssigneePickerModal from "../../actions/issue-assignee-picker-modal";

const IssueAssigneeForm: FC<{
  issue: Issue | undefined;
  assignees: User[] | undefined;
}> = ({ issue, assignees }) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <>
      {assignees!.length < 1 ? (
        <button
          onClick={handleClick}
          className="
            hover:bg-neutral-light 
            hover:dark:bg-accent-dark-500
            p-2 -m-1
            text-text-dark-600 
            transition-all duration-300 ease-in-out 
            rounded-lg
          "
        >
          No assignees
        </button>
      ) : (
        <div>
          {assignees?.map((assignee) => (
            <div
              key={assignee.id}
              className="bg-sky_magenta-600 w-7 h-7 rounded-full flex justify-center items-center"
            >
              <p className="font-bold">
                {assignee!.fullname![0].toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      )}

      <IssueAssigneePickerModal
        issue={issue}
        showModal={showForm}
        onClose={() => setShowForm(false)}
      />
    </>
  );
};

export default IssueAssigneeForm;

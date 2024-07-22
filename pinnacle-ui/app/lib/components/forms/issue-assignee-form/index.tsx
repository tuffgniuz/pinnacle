import { FC, useState } from "react";
import { User } from "@/app/lib/types/models";
import IssueAssigneePickerModal from "../../actions/issue-assignee-picker-modal";

const IssueAssigneeForm: FC<{
  issueId: string;
  assignees: User[];
}> = ({ issueId, assignees }) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <>
      {assignees?.length < 1 ? (
        <button
          onClick={handleClick}
          className="hover:bg-neutral-light px-1 h-7 text-text-dark-600 italic transition-all duration-300 ease-in-out rounded-lg"
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

      <IssueAssigneePickerModal
        issueId={issueId}
        showModal={showForm}
        onClose={() => setShowForm(false)}
      />
    </>
  );
};

export default IssueAssigneeForm;

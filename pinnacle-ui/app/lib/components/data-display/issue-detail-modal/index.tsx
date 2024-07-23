import { FC } from "react";
import { LucideExpand, LucidePlus, LucideTrash, LucideX } from "lucide-react";
import { useParams } from "next/navigation";
import { useTheme } from "@/app/lib/context/theme-context";
import useIssueDetail from "@/app/lib/hooks/projects/useIssueDetail";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import BaseModal from "../base-modal";
import IssueTitleUpdateForm from "../../forms/issue-detail-modal/issue-title-update-form";
import IssueAssigneePickerDropDown from "../../actions/issue-assignee-picker-drop-down";
import StatePickerDropDown from "../../actions/state-picker-drop-down";

const IssueDetailModal: FC<{
  issueId: string;
  showModal: boolean;
  onClose: () => void;
}> = ({ issueId, showModal, onClose }) => {
  const { theme } = useTheme();
  const { key } = useParams<{ key: string }>();
  const { data: issue, isLoading, isError, error } = useIssueDetail(issueId);
  const { data: project } = useProjectDetail(key);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) console.log(error);

  return (
    <BaseModal
      show={showModal}
      onClose={onClose}
      position="side-r"
      className="w-1/2 p-10"
    >
      <header className="flex justify-between mb-10">
        <div>
          {issue?.assignees.length < 1 ? (
            <div className="flex items-center gap-3">
              <IssueAssigneePickerDropDown issue={issue} />
              <p className="dark:text-text-dark-700">Add assignees...</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {issue?.assignees.map((assignee) => (
                <h1
                  key={issue.id}
                  className="text-2xl flex items-center justify-center bg-sky_magenta-600 h-10 w-10 rounded-full"
                >
                  {assignee?.fullname[0].toUpperCase()}
                </h1>
              ))}
              <IssueAssigneePickerDropDown issue={issue} />
            </div>
          )}
        </div>
        <nav className="flex items-center gap-2">
          <button className="bg-accent-light-300 dark:bg-background-dark p-2 rounded-md">
            <LucideExpand
              size={18}
              color={theme === "dark" ? "#d4d8dc" : "#eff0f2"}
            />
          </button>
          <button
            onClick={onClose}
            className="bg-accent-light-300 dark:bg-background-dark p-2 rounded-md"
          >
            <LucideX
              size={18}
              color={theme === "dark" ? "#d4d8dc" : "#eff0f2"}
            />
          </button>
        </nav>
      </header>
      {/* Forms */}
      <IssueTitleUpdateForm projectId={project?.id} issue={issue} />
      <div className="mt-10">
        <div className="flex mb-5">
          <div className="w-2/12 text-text-light-400">Status</div>
          <div className="w-10/12">
            <StatePickerDropDown issue={issue} />
          </div>
        </div>
        <div className="flex mb-5 ">
          <div className="w-2/12 text-text-light-400">Effort</div>
          <div className="w-10/12">{issue?.effort}</div>
        </div>
        <div className="flex mb-5">
          <div className="w-2/12 text-text-light-400">Priority</div>
          <div className="w-10/12">{issue?.priority}</div>
        </div>
        <div className="flex mb-5">
          <div className="w-2/12 text-text-light-400">Labels</div>
          <div className="w-10/12"></div>
        </div>
      </div>
    </BaseModal>
  );
};

export default IssueDetailModal;

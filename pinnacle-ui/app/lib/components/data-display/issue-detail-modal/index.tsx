import { FC } from "react";
import { LucideBolt, LucideExpand, LucideX } from "lucide-react";
import { useParams } from "next/navigation";
import { useTheme } from "@/app/lib/context/theme-context";
import useIssueDetail from "@/app/lib/hooks/projects/useIssueDetail";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import BaseModal from "../base-modal";
import IssueTitleUpdateForm from "../../forms/issue-detail-modal/issue-title-update-form";
import IssueAssigneePickerDropDown from "../../actions/issue-assignee-picker-drop-down";
import StatePickerDropDown from "../../actions/state-picker-drop-down";
import IssueEffortUpdateForm from "../../forms/issue-detail-modal/issue-effort-update-form";
import LabelPickerDropDown from "../../actions/label-picker-drop-down";
import IssueLabels from "../issue-labels";

const IssueDetailModal: FC<{
  issueId: string | undefined;
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

      {/* TITLE */}
      <IssueTitleUpdateForm
        projectId={project?.id}
        issue={issue}
        className="mb-10"
      />

      {/* LABELS */}
      <LabelPickerDropDown issue={issue} />
      <div className="my-10" />
      <IssueLabels issue={issue} className="my-10" />

      <div className="flex flex-col">
        {/* STATUS */}
        <div className="flex mb-5 dark:hover:bg-accent-dark-500 p-1 -m-1 rounded-lg transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2 w-2/12 text-text-light-400">
            <LucideBolt size={18} />
            Status
          </div>
          <div className="w-10/12">
            {/* When the Label Picker DropDown component is active the button of the StatePickerDropdow is placed above th dropdown menu of the LabelPicker */}
            <StatePickerDropDown issue={issue} />
          </div>
        </div>
        {/* STATUS */}
        <div className="flex items-center mb-5 dark:hover:bg-accent-dark-500 p-1 -m-1 rounded-lg cursor-pointer transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2 w-2/12 text-text-light-400">
            <LucideBolt size={18} />
            Effort
          </div>
          <div className="w-10/12">
            <IssueEffortUpdateForm issue={issue} />
          </div>
        </div>
        <div className="flex mb-5">
          <div className="w-2/12 text-text-light-400">Priority</div>
          <div className="w-10/12">{issue?.priority}</div>
        </div>
      </div>
    </BaseModal>
  );
};

export default IssueDetailModal;

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
import Button from "../../actions/button";

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
          <button onClick={onClose} className="p-2 rounded-md">
            <LucideX size={18} />
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
      <div className="flex items-center gap-5">
        <StatePickerDropDown issue={issue} />
        <LabelPickerDropDown issue={issue} />
        <Button padding="sm" value="Add security controls" />
      </div>
      <div className="my-10" />
      <IssueLabels issue={issue} className="my-10" />
    </BaseModal>
  );
};

export default IssueDetailModal;

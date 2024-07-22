import { FC } from "react";
import { Issue } from "@/app/lib/types/models";
import { LucideX } from "lucide-react";
import BaseModal from "../../data-display/base-modal";
import useIssueDelete from "@/app/lib/hooks/projects/useIssueDelete";

const IssueConfirmDeleteModal: FC<{
  issue: Issue;
  showModal: boolean;
  onClose: () => void;
}> = ({ issue, showModal, onClose }) => {
  const { mutation } = useIssueDelete(issue.id);

  const handleConfirmDelete = () => {
    mutation.mutate();
    onClose();
  };

  return (
    <BaseModal show={showModal} onClose={onClose} className="w-1/4 p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold">
          Delete issue {issue.issue_key}?
        </h1>
        <button onClick={onClose}>
          <LucideX size={20} />
        </button>
      </div>
      <p className="mb-5 text-text-light-300 dark:text-text-light-700">
        Are you sure you want to delete this issue from this project?
      </p>
      <div className="flex justify-end">
        <button
          onClick={handleConfirmDelete}
          className="bg-accent-light-300 text-light_red-500 rounded-lg p-2"
        >
          Confirm delete
        </button>
      </div>
    </BaseModal>
  );
};

export default IssueConfirmDeleteModal;

import { FC } from "react";
import { LucideExpand, LucidePlus, LucideX } from "lucide-react";
import { useParams } from "next/navigation";
import { useTheme } from "@/app/lib/context/theme-context";
import useIssueDetail from "@/app/lib/hooks/projects/useIssueDetail";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import BaseModal from "../base-modal";
import IssueTitleUpdateForm from "../../forms/issue-detail-modal/issue-title-update-form";

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
      className="w-1/2 p-6"
    >
      <header className="flex justify-between mb-10">
        <div>
          <h1 className="text-xs font-semibold mb-2">Assignees</h1>
          {issue?.assignees.length < 1 ? (
            <button className="hover:bg-neutral-light dark:hover:bg-neutral-light-100 -m-1 p-1 rounded-lg transition-all duration-300 ease-in-out italic">
              No assignees
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {issue?.assignees.map((assignee) => (
                <h1 className="text-2xl flex items-center justify-center bg-sky_magenta-600 h-10 w-10 rounded-full">
                  {assignee?.fullname[0].toUpperCase()}
                </h1>
              ))}
              <button className="flex items-center justify-center bg-neutral-light dark:bg-neutral-light-100 h-10 w-10 rounded-full">
                <LucidePlus size={18} />
              </button>
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
    </BaseModal>
  );
};

export default IssueDetailModal;

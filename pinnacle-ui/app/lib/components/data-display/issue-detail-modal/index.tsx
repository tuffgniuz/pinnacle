import { FC } from "react";
import { LucideExpand, LucideX } from "lucide-react";
import { useTheme } from "@/app/lib/context/theme-context";
import { Issue } from "@/app/lib/types/models";
import BaseModal from "../base-modal";
import useIssueDetail from "@/app/lib/hooks/projects/useIssueDetail";

const IssueDetailModal: FC<{
  issueId: string;
  showModal: boolean;
  onClose: () => void;
}> = ({ issueId, showModal, onClose }) => {
  const { theme } = useTheme();
  const { data: issue } = useIssueDetail(issueId);
  return (
    <BaseModal
      show={showModal}
      onClose={onClose}
      position="side-r"
      className="w-1/2 p-6"
    >
      <header className="flex justify-between mb-10">
        <div>
          {issue?.assignees.length < 1 ? (
            <button className="hover:bg-neutral-light dark:hover:bg-neutral-light-100 -m-1 p-1 rounded-lg transition-all duration-300 ease-in-out italic">
              No assignees
            </button>
          ) : (
            <>
              <h1>Hello</h1>
            </>
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
      <div>
        <h1 className="cursor-pointer hover:bg-neutral-light dark:hover:bg-neutral-light-100 text-4xl -m-1 p-1 rounded-lg transition-all duration-300 ease-in-out">
          {issue?.title}
        </h1>
      </div>
    </BaseModal>
  );
};

export default IssueDetailModal;

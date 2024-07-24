import { FC, useEffect, useState } from "react";
import {
  LucideArrowLeftRight,
  LucideCheck,
  LucideCircleDot,
} from "lucide-react";
import { Issue, State } from "@/app/lib/types/models";
import useStatesForWorkflow from "@/app/lib/hooks/projects/useStatesForWorkflow";
import useIssueUpdate from "@/app/lib/hooks/projects/useIssueUpdate";
import BaseDropDown from "../base-drop-down";

/**
 * TODO: Fix closing modal when updating the state when clicking on the list item
 * Currently unknown why it closes on issue.state_id update
 */

const StatePickerDropDown: FC<{
  issue: Issue | undefined;
}> = ({ issue }) => {
  const [stateId, setIssueStateId] = useState<string | undefined>(
    issue?.state_id,
  );
  const { data: states } = useStatesForWorkflow(issue?.workflow_id);
  const { mutation, error: updateError } = useIssueUpdate(issue?.id);

  useEffect(() => {
    setIssueStateId(issue?.state_id);
  }, [issue]);

  const handleStateUpdate = (stateId: string) => {
    if (issue?.state_id !== stateId) {
      mutation.mutate({ state_id: stateId });
    }
  };

  return (
    <BaseDropDown
      icon={<LucideArrowLeftRight size={18} />}
      title={issue?.state?.name}
      buttonClassName="dark:bg-accent-dark-500 text-text-dark-900 px-4 py-1 -m-1 rounded-lg"
      className="w-80 border dark:border-accent-light-500"
    >
      <h1 className="p-4 font-semibold border-b dark:border-b-accent-light-500">
        Move to
      </h1>
      <ul>
        {states?.map((state: State) => (
          <li
            key={state.id}
            onClick={() => handleStateUpdate(state.id)}
            className="cursor-pointer flex items-center justify-between p-4 hover:bg-neutral-light dark:hover:bg-neutral-light-100"
          >
            <div className="flex items-center gap-4">
              <LucideCircleDot size={16} />
              <span>{state.name}</span>
            </div>
            {/* Check icon to indicate current issue state */}
            {stateId === state.id && <LucideCheck size={18} />}
          </li>
        ))}
      </ul>
    </BaseDropDown>
  );
};

export default StatePickerDropDown;

import { FC } from "react";
import { Issue, State } from "@/app/lib/types/models";
import useStatesForWorkflow from "@/app/lib/hooks/projects/useStatesForWorkflow";
import BaseDropDown from "../base-drop-down";
import { LucideCheck } from "lucide-react";

const StatePickerDropDown: FC<{ issue: Issue }> = ({ issue }) => {
  const {
    data: states,
    isError,
    isLoading,
    error,
  } = useStatesForWorkflow(issue?.workflow_id);

  if (isError) console.error(error);

  return (
    <BaseDropDown
      icon={issue?.state?.name}
      buttonClassName="bg-background-dark text-text-dark-900 px-4 py-1 -m-1 rounded-lg"
      className="w-80"
    >
      <h1 className="p-4 font-semibold">Move to</h1>
      <ul>
        {states?.map((state: State) => (
          <li className="flex items-center justify-between p-4">
            <span>{state.name}</span>
            {/* Check icon to indicate current issue state */}
            {issue?.state_id === state.id && <LucideCheck size={18} />}
          </li>
        ))}
      </ul>
    </BaseDropDown>
  );
};

export default StatePickerDropDown;

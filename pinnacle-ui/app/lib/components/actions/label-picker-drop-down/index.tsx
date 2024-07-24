import { FC, useState } from "react";
import {
  LucideCheckSquare,
  LucideEdit,
  LucideSquare,
  LucideTag,
} from "lucide-react";
import { Issue, Label } from "@/app/lib/types/models";
import useLabels from "@/app/lib/hooks/projects/useLabels";
import useAddLabelToIssue from "@/app/lib/hooks/projects/useAddLabelToIssue";
import useDeleteLabelFromIssue from "@/app/lib/hooks/projects/useDeleteLabelFromIssue";
import BaseDropDown from "../base-drop-down";
import Link from "next/link";

const LabelPickerDropDown: FC<{ issue?: Issue }> = ({ issue }) => {
  const [selectedLabel, setSelectedLabel] = useState<Label | undefined>(
    undefined,
  );
  const { data: labels } = useLabels();
  const { mutation: addMutation } = useAddLabelToIssue(
    selectedLabel?.id,
    issue?.id,
  );
  const { mutation: deleteMutation } = useDeleteLabelFromIssue(issue?.id);

  const handleAddLabel = (label: Label) => {
    setSelectedLabel(label);
    addMutation.mutate();
  };

  const handleDeleteLabel = (label: Label) => {
    deleteMutation.mutate({ label_id: label.id });
  };

  const availableLabels = labels?.filter(
    (label) => !issue?.labels?.some((issueLabel) => issueLabel.id === label.id),
  );

  return (
    <BaseDropDown
      icon={<LucideTag size={16} />}
      title="Add labels"
      buttonClassName="dark:bg-accent-dark-500 text-text-dark-900 px-4 py-1 -m-1 rounded-lg"
      className="w-3/4 border dark:border-accent-light-500"
    >
      <div className="flex items-center justify-between dark:border-b border-b-accent-light-500 px-6 py-4">
        <h1 className="font-semibold">Assign labels to this issue</h1>
        <Link
          href="/project/labels"
          className="
            hover:bg-neutral-light 
            dark:hover:bg-neutral-light-100 
            flex items-center gap-2
            -m-2 p-2 
            rounded-lg 
            transition-all duration-300 
            ease-in-out 
          "
        >
          <LucideEdit size={18} />
          <span>Edit labels</span>
        </Link>
      </div>
      {/* Issue Labels */}
      <div>
        <ul className="border-b dark:border-b-accent-light-500">
          {issue?.labels?.map((label) => (
            <li
              key={label.id}
              onClick={() => handleDeleteLabel(label)}
              className="cursor-pointer flex flex-col px-6 py-4 transition-all duration-300 ease-in-out hover:bg-neutral-light dark:hover:bg-neutral-light-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <LucideCheckSquare size={16} />
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ background: label.color }}
                />
                <span>{label.name}</span>
              </div>
              <span className="text-sm">{label.description}</span>
            </li>
          ))}
        </ul>
        {/* Labels - should exclude labels already mapped to issues */}
        <div className="border-b dark:border-b-accent-light-500 px-6 py-4">
          <h1 className="font-semibold">Suggestions</h1>
        </div>
        <ul>
          {availableLabels?.map((label) => (
            <li
              key={label.id}
              onClick={() => handleAddLabel(label)}
              className="cursor-pointer flex flex-col px-6 py-4 transition-all duration-300 ease-in-out hover:bg-neutral-light dark:hover:bg-neutral-light-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <LucideSquare size={16} />
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ background: label.color }}
                />
                <span>{label.name}</span>
              </div>
              <span className="text-sm text-text-dark-600">
                {label.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </BaseDropDown>
  );
};

export default LabelPickerDropDown;

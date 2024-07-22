import { FC } from "react";
import { Issue, State } from "@/app/lib/types/models";
import BaseDropDown from "../base-drop-down";

const StatePickerDropDown: FC<{ issue: Issue | undefined }> = ({ issue }) => {
  return (
    <BaseDropDown
      icon={issue?.state?.name}
      buttonClassName="bg-background-dark text-text-dark-900 px-4 py-1 -m-1 rounded-lg"
      className="w-80"
    >
      <h1 className="p-4 font-semibold">Select an item</h1>
      <ul></ul>
    </BaseDropDown>
  );
};

export default StatePickerDropDown;

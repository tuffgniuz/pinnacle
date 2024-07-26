import { FC } from "react";
import { SecuritySection } from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

const SecuritySectionPicker: FC<{
  sections: SecuritySection[] | undefined;
  onGoBack: () => void;
}> = ({ sections, onGoBack }) => {
  return (
    <>
      <div className="flex justify-end mb-5">
        <Button padding="sm" value="Go Back" onClick={onGoBack} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {sections?.map((section) => (
          <Card key={section.id} padding="lg">
            <h1 className="text-lg font-medium mb-2">{section.name}</h1>
            <p className="text-sm dark:text-text-dark-700">{section.summary}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SecuritySectionPicker;

import { FC } from "react";
import { SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

const SecuritySectionPicker: FC<{
  topics: SecurityTopic[] | undefined;
  onGoBack: () => void;
}> = ({ topics, onGoBack }) => {
  return (
    <>
      <div className="flex gap-2 justify-end mb-5">
        <Button padding="sm" value="Go Back" onClick={onGoBack} />
        <Button padding="sm" value="Next" />
      </div>
      {topics?.map((topic) => (
        <>
          <h1 className="text-xl mb-5">{topic.name}</h1>
          <div className="grid grid-cols-3 gap-4">
            {topic.sections.map((section) => (
              <Card key={section.id} padding="lg">
                <h1 className="text-lg font-medium mb-2">{section.name}</h1>
                <p className="text-sm dark:text-text-dark-700">
                  {section.summary}
                </p>
              </Card>
            ))}
          </div>
        </>
      ))}
    </>
  );
};

export default SecuritySectionPicker;

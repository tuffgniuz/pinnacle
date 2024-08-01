import { FC, useState } from "react";
import { LucideLightbulb } from "lucide-react";
import { SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

const SecurityTopicPicker: FC<{
  topics: SecurityTopic[] | undefined;
  onContinue: (selectedTopics: SecurityTopic[]) => void;
}> = ({ topics, onContinue }) => {
  const [selectedTopics, setSelectedTopics] = useState<SecurityTopic[]>([]);

  const handleAddTopic = (topic: SecurityTopic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t.id !== topic.id)
        : [...prevTopics, topic],
    );
  };

  const handleContinue = () => {
    onContinue(selectedTopics);
  };

  const handleSelectAll = () => {
    if (selectedTopics.length === (topics?.length || 0)) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(topics ?? []);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-2 mb-5">
        <Button onClick={handleSelectAll} padding="sm" value="Select all" />
        <Button onClick={handleContinue} padding="sm" value="Next" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {topics?.map((topic) => (
          <Card
            key={topic.id}
            onClick={() => handleAddTopic(topic)}
            padding="lg"
            className={`
              cursor-pointer 
              outline outline-1
              hover:outline-sky_magenta
              hover:bg-opacity-40
              dark:hover:outline-sky_magenta
              transition-all duration-300 ease-in-out ${
                selectedTopics.includes(topic)
                  ? "outline-sky_magenta dark:outline-sky_magenta bg-opacity-40"
                  : "outline-transparent"
              }`}
          >
            <h1 className="text-xl flex items-center gap-2 font-medium mb-2">
              {topic.name}
            </h1>
            <p className="dark:text-text-dark-700 mb-5">{topic.application}</p>
            <div className="flex justify-end">
              <Button
                padding="sm"
                icon={<LucideLightbulb size="18" />}
                value="Learn more"
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SecurityTopicPicker;

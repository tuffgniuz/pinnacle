import { FC, useState } from "react";
import { LucideShield } from "lucide-react";
import { SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

const SecurityTopicPicker: FC<{
  topics: SecurityTopic[] | undefined;
  onContinue: (selectedTopics: string[]) => void;
}> = ({ topics, onContinue }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleAddTopic = (topicId: string) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topicId)
        ? prevTopics.filter((id) => id !== topicId)
        : [...prevTopics, topicId],
    );
  };

  const handleContinue = () => {
    onContinue(selectedTopics);
  };

  return (
    <>
      <div className="flex justify-end gap-5 mb-5">
        <Button padding="sm" value="Select all" />
        <Button padding="sm" value="Continue" onClick={handleContinue} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {topics?.map((topic) => (
          <Card
            key={topic.id}
            onClick={() => handleAddTopic(topic.id)}
            padding="lg"
            className={`
                cursor-pointer 
                outline outline-1
                hover:outline-sky_magenta
                dark:hover:outline-sky_magenta
                transition-all duration-300 ease-in-out ${
                  selectedTopics.includes(topic.id)
                    ? "outline-sky_magenta dark:outline-sky_magenta"
                    : "outline-transparent"
                }`}
          >
            <h1 className="text-lg flex items-center gap-2 font-medium mb-2">
              {topic.name}
            </h1>
            <p className="text-sm dark:text-text-dark-700">{topic.summary}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SecurityTopicPicker;

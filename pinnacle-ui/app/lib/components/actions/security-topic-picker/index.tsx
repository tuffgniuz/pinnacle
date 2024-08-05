import { FC } from "react";
import { SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import SelectableCard from "../../data-display/SelectableCard";
import { LucideArrowRight, LucideMousePointer2 } from "lucide-react";

const SecurityTopicPicker: FC<{
  topics: SecurityTopic[] | undefined;
  selectedTopics: SecurityTopic[];
  setSelectedTopics: (topics: SecurityTopic[]) => void;
  onContinue: (selectedTopics: SecurityTopic[]) => void;
}> = ({ topics, selectedTopics, setSelectedTopics, onContinue }) => {
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
      <div className="flex justify-start gap-2 mb-5">
        <Button
          onClick={handleSelectAll}
          padding="sm"
          icon={<LucideMousePointer2 size={18} />}
          value="Select all"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {topics?.map((topic) => (
          <SelectableCard
            onClick={() => handleAddTopic(topic)}
            padding="lg"
            isSelected={selectedTopics.includes(topic)}
          >
            <h1 className="font-medium">{topic.name}</h1>
          </SelectableCard>
        ))}
      </div>
      <div className="flex justify-end gap-2 ">
        <Button
          onClick={handleContinue}
          padding="sm"
          icon={<LucideArrowRight size={18} />}
          value="Next"
        />
      </div>
    </>
  );
};

export default SecurityTopicPicker;

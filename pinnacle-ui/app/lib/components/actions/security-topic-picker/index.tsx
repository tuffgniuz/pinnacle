import { FC } from "react";
import { SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import SelectableCard from "../../data-display/SelectableCard";
import { LucideArrowRight, LucideMousePointer2 } from "lucide-react";
import TransitionWrapper from "../../wrappers/transition-wrapper";

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
      <div className="mb-10">
        <h2 className="text-text-light-400 mb-2">Step 1/3</h2>
        <h1 className="text-4xl font-medium">Security Topics</h1>
      </div>
      <div className="flex justify-between gap-2 mb-5">
        <Button
          onClick={handleSelectAll}
          padding="sm"
          icon={<LucideMousePointer2 size={18} />}
          value="Select all"
        />
        <div className="flex justify-end gap-2 ">
          <Button
            onClick={handleContinue}
            padding="sm"
            icon={<LucideArrowRight size={18} />}
            value="Next"
          />
        </div>
      </div>
      <TransitionWrapper key="1">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {topics?.map((topic) => (
            <SelectableCard
              key={topic.id}
              onClick={() => handleAddTopic(topic)}
              padding="lg"
              isSelected={selectedTopics.includes(topic)}
            >
              <h1 className="font-medium">{topic.name}</h1>
            </SelectableCard>
          ))}
        </div>
      </TransitionWrapper>
    </>
  );
};

export default SecurityTopicPicker;

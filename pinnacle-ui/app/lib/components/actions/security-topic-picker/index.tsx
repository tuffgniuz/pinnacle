import { FC, useState } from "react";
import {
  LucideGrid,
  LucideLightbulb,
  LucideTable,
  LucideTable2,
} from "lucide-react";
import { SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

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
      <div className="flex items-center justify-between mb-5">
        <div className="flex justify-start gap-2">
          <button className="">
            <LucideGrid size={20} />
          </button>
          <button>
            <LucideTable2 size={20} />
          </button>
        </div>
        <div className="flex justify-end gap-2 ">
          <Button onClick={handleSelectAll} padding="sm" value="Select all" />
          <Button onClick={handleContinue} padding="sm" value="Next" />
        </div>
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
              dark:hover:bg-opacity-70
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
            {/***
            <div className="flex justify-end">
              <Button
                padding="sm"
                icon={<LucideLightbulb size="18" />}
                value="Learn more"
              />
            </div>
            ***/}
          </Card>
        ))}
      </div>
    </>
  );
};

export default SecurityTopicPicker;

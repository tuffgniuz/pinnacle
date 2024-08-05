import { FC, useState, useEffect } from "react";
import {
  LucideChevronsDownUp,
  LucideChevronsUpDown,
  LucideTags,
} from "lucide-react";
import { motion } from "framer-motion";
import { SecuritySection, SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import SelectableCard from "../../data-display/SelectableCard";

const SecuritySectionPicker: FC<{
  topics: SecurityTopic[] | undefined;
  selectedSections: SecuritySection[] | undefined;
  setSelectedSections: (sections: SecuritySection[]) => void;
  onGoBack: () => void;
  onContinue: (selectedSections: SecuritySection[]) => void;
}> = ({
  topics,
  selectedSections = [],
  setSelectedSections,
  onGoBack,
  onContinue,
}) => {
  const [expandedTopics, setExpandedTopics] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandAll, setExpandAll] = useState<boolean>(false);

  useEffect(() => {
    if (topics && topics.length > 0) {
      const initialExpandedState = topics.reduce(
        (acc, topic, index) => {
          acc[topic.id] = index === 0; // Expand only the first topic
          return acc;
        },
        {} as { [key: string]: boolean },
      );
      setExpandedTopics(initialExpandedState);
    }
  }, [topics]);

  const toggleExpand = (topicId: string) => {
    if (expandAll) return;
    setExpandedTopics((prev) => {
      const newExpandedTopics = Object.keys(prev).reduce(
        (acc, id) => {
          acc[id] = false;
          return acc;
        },
        {} as { [key: string]: boolean },
      );
      return {
        ...newExpandedTopics,
        [topicId]: !prev[topicId],
      };
    });
  };

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev);
    setExpandedTopics((prev) =>
      Object.keys(prev).reduce(
        (acc, topicId) => {
          acc[topicId] = !expandAll;
          return acc;
        },
        {} as { [key: string]: boolean },
      ),
    );
  };

  const handleAddSection = (section: SecuritySection) => {
    setSelectedSections((prevSections = []) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s.id !== section.id)
        : [...prevSections, section],
    );
  };

  const handleContinue = () => {
    onContinue(selectedSections);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <Button
          padding="sm"
          icon={
            expandAll ? (
              <LucideChevronsDownUp size={18} />
            ) : (
              <LucideChevronsUpDown size={18} />
            )
          }
          value={expandAll ? "Collapse all" : "Expand all"}
          onClick={handleExpandAll}
        />
      </div>
      {topics?.map((topic) => (
        <div key={topic.id}>
          <div className="flex items-center justify-between border-b border-b-neutral-light-500 mb-5">
            <h1 className="flex items-center gap-2 text-2xl mb-5">
              <LucideTags size={18} />
              {topic.name}
              <span className="bg-accent-dark-900 h-5 w-5 text-sm rounded-full flex items-center justify-center">
                {
                  selectedSections.filter((section) =>
                    topic.sections.some(
                      (topicSection) => topicSection.id === section.id,
                    ),
                  ).length
                }
              </span>
            </h1>
            {/* Button to expand or collapse the section cards */}
            <button
              onClick={() => toggleExpand(topic.id)}
              className="hover:bg-neutral-light-500 transition-all duration-300 ease-in-out p-2 -m-2 rounded-full"
            >
              {expandedTopics[topic.id] ? (
                <LucideChevronsUpDown size={18} />
              ) : (
                <LucideChevronsDownUp size={18} />
              )}
            </button>
          </div>
          {/* Collapsible */}
          <motion.div
            initial={false}
            animate={{ height: expandedTopics[topic.id] ? "auto" : 0 }}
            style={{ overflow: "hidden" }}
            transition={{ duration: 0.5 }}
          >
            {/* Security Section Cards */}
            <div className="grid grid-cols-3 gap-4 mb-10 p-2">
              {topic.sections.map((section) => (
                <SelectableCard
                  key={section.id}
                  onClick={() => handleAddSection(section)}
                  padding="lg"
                  isSelected={selectedSections.includes(section)}
                >
                  <h1 className="font-medium mb-2">{section.name}</h1>
                  <p className="text-text-light-300">{section.summary}</p>
                </SelectableCard>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
      <div className="flex gap-2 justify-end">
        <Button padding="sm" value="Go Back" onClick={onGoBack} />
        <Button padding="sm" value="Next" onClick={handleContinue} />
      </div>
    </>
  );
};

export default SecuritySectionPicker;

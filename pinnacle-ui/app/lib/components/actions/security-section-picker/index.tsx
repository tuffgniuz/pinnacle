import { FC, useState, useEffect } from "react";
import {
  LucideChevronsDownUp,
  LucideChevronsUpDown,
  LucideTags,
} from "lucide-react";
import { motion } from "framer-motion";
import { SecuritySection, SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

const SecuritySectionPicker: FC<{
  topics: SecurityTopic[] | undefined;
  selectedSections: SecuritySection[];
  setSelectedSections: (sections: SecuritySection[]) => void;
  onGoBack: () => void;
}> = ({ topics, selectedSections, setSelectedSections, onGoBack }) => {
  const [expandedTopics, setExpandedTopics] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (topics) {
      const initialExpandedState = topics.reduce(
        (acc, topic) => {
          acc[topic.id] = true;
          return acc;
        },
        {} as { [key: string]: boolean },
      );
      setExpandedTopics(initialExpandedState);
    }
  }, [topics]);

  const toggleExpand = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleAddSection = (section: SecuritySection) => {
    setSelectedSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s.id !== section.id)
        : [...prevSections, section],
    );
  };

  return (
    <>
      <div className="flex gap-2 justify-end mb-5">
        <Button padding="sm" value="Go Back" onClick={onGoBack} />
        <Button padding="sm" value="Next" />
      </div>
      {topics?.map((topic) => (
        <div key={topic.id}>
          <div className="flex items-center justify-between border-b border-b-neutral-light-500 mb-5">
            <h1 className="flex items-center gap-2 text-2xl mb-5">
              <LucideTags size={18} />
              {topic.name}
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
            <div className="grid grid-cols-3 gap-4 mb-10">
              {topic.sections.map((section) => (
                <Card key={section.id} padding="lg">
                  <h1 className="text-lg font-medium mb-2">{section.name}</h1>
                  <p className="text-sm dark:text-text-dark-700">
                    {section.summary}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default SecuritySectionPicker;

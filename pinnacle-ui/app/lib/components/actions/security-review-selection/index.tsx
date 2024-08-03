import { FC, useState, useEffect } from "react";
import {
  LucideChevronsDownUp,
  LucideChevronsUpDown,
  LucideTags,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  SecurityControl,
  SecuritySection,
  SecurityTopic,
} from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

interface ReviewSelectionProps {
  topics: SecurityTopic[] | undefined;
  sections: SecuritySection[] | undefined;
  onGoBack: () => void;
  onConfirm: () => void;
}

const SecurityReviewSelection: FC<ReviewSelectionProps> = ({
  topics,
  sections,
  onGoBack,
  onConfirm,
}) => {
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

  const uniqueControls = new Map<string, SecurityControl>();

  topics?.forEach((topic) => {
    topic.sections.forEach((section) => {
      section.controls.forEach((control) => {
        uniqueControls.set(control.id, control);
      });
    });
  });

  sections?.forEach((section) => {
    section.controls.forEach((control) => {
      uniqueControls.set(control.id, control);
    });
  });

  return (
    <>
      <div className="flex gap-2 justify-end mb-5">
        <Button padding="sm" value="Go Back" onClick={onGoBack} />
        <Button padding="sm" value="Confirm" onClick={onConfirm} />
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-medium mb-3">Selected Security Topics</h2>
        {topics?.map((topic) => (
          <div key={topic.id} className="mb-2">
            <h3 className="text-lg font-semibold">{topic.name}</h3>
            <p className="text-sm dark:text-text-dark-700">
              {topic.application}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-medium mb-3">Selected Security Sections</h2>
        {sections?.map((section) => (
          <div key={section.id} className="mb-2">
            <h3 className="text-lg font-semibold">{section.name}</h3>
            <p className="text-sm dark:text-text-dark-700">{section.summary}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-medium mb-3">Selected Security Controls</h2>
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
              {topic.sections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-lg font-semibold mb-3">{section.name}</h2>
                  {section.controls.map((control) => (
                    <Card key={control.id} padding="lg">
                      <h1 className="text-lg font-medium mb-2">
                        {control.control_id}
                      </h1>
                      <p className="text-sm dark:text-text-dark-700">
                        {control.description}
                      </p>
                    </Card>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SecurityReviewSelection;

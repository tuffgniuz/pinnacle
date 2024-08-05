import { FC, useEffect, useState } from "react";
import {
  LucideChevronsDownUp,
  LucideChevronsUpDown,
  LucideTags,
} from "lucide-react";
import { motion } from "framer-motion";
import { SecuritySection, SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import Card from "../../data-display/card";

const SecurityReviewSelection: FC<{
  topics: SecurityTopic[] | undefined;
  sections: SecuritySection[] | undefined;
  onGoBack: () => void;
  onConfirm: () => void;
}> = ({ topics, sections, onGoBack, onConfirm }) => {
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

  return (
    <>
      <div className="flex gap-2 justify-end mb-5">
        <Button padding="sm" value="Go Back" onClick={onGoBack} />
        <Button padding="sm" value="Confirm" onClick={onConfirm} />
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
            {topic.sections
              .filter((section) =>
                sections?.some(
                  (selectedSection) => selectedSection.id === section.id,
                ),
              )
              .map((section) => (
                <div key={section.id}>
                  <h1 className="text-lg font-medium mb-2">{section.name}</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.controls.map((control) => (
                        <tr>
                          <td>{control.control_id}</td>
                          <td>{control.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </motion.div>
        </div>
      ))}
    </>
  );
};

export default SecurityReviewSelection;

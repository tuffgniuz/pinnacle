import { FC, useEffect, useState } from "react";
import {
  LucideChevronsDownUp,
  LucideChevronsUpDown,
  LucideChevronUp,
  LucideTags,
} from "lucide-react";
import { motion } from "framer-motion";
import { SecuritySection, SecurityTopic } from "@/app/lib/types/models";
import Button from "../button";
import TransitionWrapper from "../../wrappers/transition-wrapper";

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
      <div className="mb-10">
        <h2 className="text-text-light-400 mb-2">Step 3/3</h2>
        <h1 className="text-4xl font-medium">Review Selections</h1>
      </div>

      <div className="flex gap-2 justify-end mb-5">
        <Button padding="sm" value="Go Back" onClick={onGoBack} />
        <Button padding="sm" value="Confirm" onClick={onConfirm} />
      </div>
      <TransitionWrapper key="3">
        {topics?.map((topic) => (
          <div key={topic.id}>
            <div className="border-b border-b-neutral-light-500 mb-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl mb-5">{topic.name}</h1>
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
              <p className="mb-5 text-text-light-300">{topic.summary}</p>
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
                  <div className="border rounded-lg mb-5">
                    <div className="flex justify-between border-b p-4">
                      <h1
                        key={section.id}
                        className="flex items-center gap-5 text-xl"
                      >
                        <LucideTags size={18} />
                        {section.name}
                      </h1>
                      <button>
                        <LucideChevronUp size={18} />
                      </button>
                    </div>
                    <table className="w-full">
                      <thead className="text-left">
                        <tr className="border-b">
                          <th className="p-4">ID</th>
                          <th className="p-4">Description</th>
                          <th className="p-4">L1</th>
                          <th className="p-4">L2</th>
                          <th className="p-4">L3</th>
                        </tr>
                      </thead>
                      {section.controls.map((control) => (
                        <tr className="border-b last:border-none transition-all duration-300 ease-in-out hover:bg-background-dark-600 cursor-pointer">
                          <td className="p-4 font-light">
                            {control.control_id}
                          </td>
                          <td className="p-4">{control.description}</td>
                          <td className="p-4"></td>
                          <td className="p-4"></td>
                          <td className="p-4"></td>
                        </tr>
                      ))}
                    </table>
                  </div>
                ))}
            </motion.div>
          </div>
        ))}
      </TransitionWrapper>
    </>
  );
};

export default SecurityReviewSelection;

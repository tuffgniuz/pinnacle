"use client";
import { NextPage } from "next";
import { LucideEdit2, LucideTrash } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import withAuth from "@/app/lib/hocs/withAuth";
import useLabels from "@/app/lib/hooks/projects/useLabels";
import LabelCreateForm from "@/app/lib/components/forms/label-create-form";
import FormPageHeader from "@/app/lib/components/navigation/form-page-header";
import Button from "@/app/lib/components/actions/button";

const Labels: NextPage = () => {
  const { data: labels } = useLabels();

  return (
    <>
      <FormPageHeader title="Labels" />
      <div className="w-4/6 mx-auto">
        <AnimatePresence>
          <LabelCreateForm />
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key="labels-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border border-accent-dark-500 rounded-lg mt-5"
          >
            <div className="border-b border-accent-dark-500 p-6">
              <h1 className="font-medium">{labels?.length} Labels</h1>
            </div>
            {labels?.map((label) => (
              <div key={label.id} className="flex flex-col">
                <div className="flex items-center border-b border-b-accent-dark-500 p-6">
                  <div className="w-2/12">{label.name}</div>
                  <div className="w-8/12">{label.description}</div>
                  <div className="w-2/12 flex items-center gap-2">
                    <Button padding="sm" icon={<LucideEdit2 size={16} />} />
                    <Button padding="sm" icon={<LucideTrash size={16} />} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default withAuth(Labels);

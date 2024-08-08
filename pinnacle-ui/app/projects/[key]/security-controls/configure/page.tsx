"use client";
import { useState } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { SecuritySection, SecurityTopic } from "@/app/lib/types/models";
import withAuth from "@/app/lib/hocs/withAuth";
import useSecurityTopics from "@/app/lib/hooks/security-controls/use-security-topics";
import useProjectAddSecurityControls from "@/app/lib/hooks/projects/useProjectAddSecurityControls";
import useProjectDetail from "@/app/lib/hooks/projects/useProjectDetail";
import FormPageHeader from "@/app/lib/components/navigation/form-page-header";
import Container from "@/app/lib/components/layout/container";
import SecurityTopicPicker from "@/app/lib/components/actions/security-topic-picker";
import SecuritySectionPicker from "@/app/lib/components/actions/security-section-picker";
import SecurityReviewSelection from "@/app/lib/components/actions/security-review-selection";
import StepTracker from "@/app/lib/components/actions/step-tracker";

const ProjectSecurityControlsConfigure: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project } = useProjectDetail(key);
  const { data: topics } = useSecurityTopics();
  const {
    topics: selectedTopics,
    setTopics: setSelectedTopics,
    sections: selectedSections,
    setSections: setSelectedSections,
    handleMutation,
  } = useProjectAddSecurityControls(project?.id);
  const [step, setStep] = useState(1);

  const handleSelectTopics = (selectedTopics: SecurityTopic[]) => {
    setSelectedTopics(selectedTopics);
    setStep(2);
  };

  const handleSelectSections = (selectedSections: SecuritySection[]) => {
    setSelectedSections(selectedSections);
    setStep(3);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const steps = [
    {
      stepCount: 1,
      isCurrentStep: step === 1,
      completed: step > 1,
      label: "Security Topics",
    },
    {
      stepCount: 2,
      isCurrentStep: step === 2,
      completed: step > 2,
      label: "Security Sections",
    },
    {
      stepCount: 3,
      isCurrentStep: step === 3,
      completed: false,
      label: "Review and Confirm",
    },
  ];

  return (
    <>
      <FormPageHeader
        height="md"
        title="Create Your Project's Security Checklist"
      />

      <Container width="w-4/6">
        {/* Step indication */}
        <div className="mb-10">
          <StepTracker steps={steps} />
        </div>
        {/* End step indication */}
        {step === 1 && (
          <SecurityTopicPicker
            topics={topics}
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
            onContinue={handleSelectTopics}
          />
        )}
        {step === 2 && (
          <SecuritySectionPicker
            topics={selectedTopics}
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
            onGoBack={handleGoBack}
            onContinue={handleSelectSections}
          />
        )}
        {step === 3 && (
          <SecurityReviewSelection
            topics={selectedTopics}
            sections={selectedSections}
            onGoBack={handleGoBack}
            onConfirm={() => console.log("clicked")}
          />
        )}
      </Container>
    </>
  );
};

export default withAuth(ProjectSecurityControlsConfigure);

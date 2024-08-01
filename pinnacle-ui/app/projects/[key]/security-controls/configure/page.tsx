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
import Footer from "@/app/lib/components/layout/footer";
import SecurityTopicPicker from "@/app/lib/components/actions/security-topic-picker";
import SecuritySectionPicker from "@/app/lib/components/actions/security-section-picker";

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

  // const handleSelectSections = (selectedSections: string[]) => {
  //   setSelectedSections(selectedSections);
  //   setStep(3);
  // };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  return (
    <>
      <FormPageHeader
        height="md"
        title={`Configure Project Security Checklist`}
      />

      <Container width="w-4/6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-medium mb-5">
            Security Controls Configuration
          </h1>
          <p className="dark:text-text-dark-600">
            Choose what applies to your project.
          </p>
        </div>
        {step === 1 && (
          <SecurityTopicPicker
            topics={topics}
            onContinue={handleSelectTopics}
          />
        )}
        {step === 2 && (
          <SecuritySectionPicker
            topics={selectedTopics}
            onGoBack={handleGoBack}
          />
        )}
        <Footer />
      </Container>
    </>
  );
};

export default withAuth(ProjectSecurityControlsConfigure);

"use client";
import { useState } from "react";
import { NextPage } from "next";
import withAuth from "@/app/lib/hocs/withAuth";
import useSecurityTopics from "@/app/lib/hooks/security-controls/use-security-topics";
import FormPageHeader from "@/app/lib/components/navigation/form-page-header";
import Container from "@/app/lib/components/layout/container";
import Footer from "@/app/lib/components/layout/footer";
import SecurityTopicPicker from "@/app/lib/components/actions/security-topic-picker";
import SecuritySectionPicker from "@/app/lib/components/actions/security-section-picker"; // Import the new component

const ProjectSecurityControlsConfigure: NextPage = () => {
  const { data: topics, isLoading, isError, error } = useSecurityTopics();
  const [filteredSections, setFilteredSections] = useState([]);
  const [showSections, setShowSections] = useState(false);

  const handleSelectTopics = (selectedTopics: string[]) => {
    const sections = topics
      ?.filter((topic) => selectedTopics.includes(topic.id))
      .flatMap((topic) => topic.sections);
    setFilteredSections(sections || []);
    setShowSections(true);
  };

  const handleGoBack = () => {
    setShowSections(false);
  };

  return (
    <>
      <FormPageHeader
        height="md"
        title={`Configure Project Security Checklist`}
      />

      <Container width="w-3/6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-medium mb-5">Security Topics</h1>
          <p className="dark:text-text-dark-600">
            Choose which security topics apply to your project.
          </p>
        </div>
        {!showSections && (
          <SecurityTopicPicker
            topics={topics}
            onContinue={handleSelectTopics}
          />
        )}
        {showSections && (
          <SecuritySectionPicker
            sections={filteredSections}
            onGoBack={handleGoBack}
          />
        )}
        <Footer />
      </Container>
    </>
  );
};

export default withAuth(ProjectSecurityControlsConfigure);

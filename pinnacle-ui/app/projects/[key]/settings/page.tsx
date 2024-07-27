"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import useProjectWithActiveWorkfow from "@/app/lib/hooks/projects/useProjectWithActiveWorkflow";
import ProjectGeneralSettings from "@/app/lib/components/data-display/project-general-settings";
import ProjectSettingsContainer from "@/app/lib/components/layout/project-settings-container";

const ProjectSettings: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project, isLoading } = useProjectWithActiveWorkfow(key);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ProjectSettingsContainer
      project={project}
      pathname={`/projects/${project?.name_key}/settings`}
    >
      <ProjectGeneralSettings project={project} />
    </ProjectSettingsContainer>
  );
};

export default ProjectSettings;

"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import useProjectWithActiveWorkfow from "@/app/lib/hooks/projects/useProjectWithActiveWorkflow";
import ProjectSettingsContainer from "@/app/lib/components/layout/project-settings-container";

const ProjectSetingsContributors: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project, isLoading } = useProjectWithActiveWorkfow(key);

  return (
    <ProjectSettingsContainer
      project={project}
      pathname={`/projects/${project?.name_key}/settings/contributors`}
    >
      <h1>Contributors</h1>
    </ProjectSettingsContainer>
  );
};

export default ProjectSetingsContributors;

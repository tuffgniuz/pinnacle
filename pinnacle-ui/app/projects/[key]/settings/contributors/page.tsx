"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import useProjectWithBoard from "@/app/lib/hooks/projects/useProjectWithBoard";
import ProjectSettingsContainer from "@/app/lib/components/layout/project-settings-container";

const ProjectSetingsContributors: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project, isLoading } = useProjectWithBoard(key);

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

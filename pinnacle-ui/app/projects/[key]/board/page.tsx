"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";

import Navbar from "@/app/lib/components/navigation/navbar";
import Container from "@/app/lib/components/layout/container";
import StateLanes from "@/app/lib/components/data-display/state-lanes";

import withAuth from "@/app/lib/hocs/withAuth";
import useProjectWithActiveWorkfow from "@/app/lib/hooks/projects/useProjectWithActiveWorkflow";

const ProjectBoard: NextPage = () => {
  const params = useParams<{ key: string }>();
  const { data: project, isLoading } = useProjectWithActiveWorkfow(
    params.key as string,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar title={project?.name} project={project} showProjectLinks />
      <Container className="h-full px-5">
        <StateLanes project={project} states={project?.workflows[0].states} />
      </Container>
    </>
  );
};

export default withAuth(ProjectBoard);

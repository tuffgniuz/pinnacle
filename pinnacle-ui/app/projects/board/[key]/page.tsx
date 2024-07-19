"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import useActiveWorkfow from "@/app/lib/hooks/projects/useActiveWorkflow";
import Navbar from "@/app/lib/components/navigation/navbar";
import Container from "@/app/lib/components/layout/container";
import withAuth from "@/app/lib/hocs/withAuth";
import StateLanes from "@/app/lib/components/data-display/state-lanes";

const ProjectBoard: NextPage = () => {
  const params = useParams<{ key: string }>();
  const { data: projectWorkflow, isLoading } = useActiveWorkfow(
    params.key as string,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar
        title={projectWorkflow?.name}
        project={projectWorkflow}
        showProjectLinks
      />
      <Container className="px-5">
        <StateLanes
          project={projectWorkflow}
          states={projectWorkflow?.workflows[0].states}
        />
      </Container>
    </>
  );
};

export default withAuth(ProjectBoard);

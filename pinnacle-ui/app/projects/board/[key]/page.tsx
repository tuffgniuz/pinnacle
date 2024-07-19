"use client";

import { NextPage } from "next";
import withAuth from "@/app/lib/hocs/withAuth";
import Navbar from "@/app/lib/components/navigation/navbar";
import Container from "@/app/lib/components/layout/container";
import useActiveWorkfow from "@/app/lib/hooks/projects/useActiveWorkflow";
import { useParams } from "next/navigation";

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
      <Navbar title={projectWorkflow?.name} showProjectLinks />
      <Container className="px-5">
        <h1>States</h1>
      </Container>
    </>
  );
};

export default withAuth(ProjectBoard);

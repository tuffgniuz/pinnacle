"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import Navbar from "@/app/lib/components/navigation/navbar";
import withAuth from "@/app/lib/hocs/withAuth";
import useProjectWithActiveWorkfow from "@/app/lib/hooks/projects/useProjectWithActiveWorkflow";

const ProjectOverview: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useProjectWithActiveWorkfow(key);

  return (
    <>
      <Navbar project={project} showProjectLinks />
    </>
  );
};

export default withAuth(ProjectOverview);

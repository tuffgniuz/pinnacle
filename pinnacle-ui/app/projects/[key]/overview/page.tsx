"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import Navbar from "@/app/lib/components/navigation/navbar";
import withAuth from "@/app/lib/hocs/withAuth";
import Container from "@/app/lib/components/layout/container";
import useProjectWithBoard from "@/app/lib/hooks/projects/useProjectWithBoard";

const ProjectOverview: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project, isLoading, isError, error } = useProjectWithBoard(key);

  return (
    <>
      <Navbar project={project} showProjectLinks title={project?.name} />
      <Container className="w-full md:w-8/12">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="border dark:border-neutral-dark-200 rounded-lg p-4 md:w-3/4">
            <h1 className="text-2xl">{project?.name}</h1>
            <hr className="border-t border-t-neutral-dark-200 my-5" />
            <p>{project?.description}</p>
          </div>
          <div className="md:w-1/4">
            <h1 className="text-xl font-semibold">Contributors</h1>
          </div>
        </div>
      </Container>
    </>
  );
};

export default withAuth(ProjectOverview);

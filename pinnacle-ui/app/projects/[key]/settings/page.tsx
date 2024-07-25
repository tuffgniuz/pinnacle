"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import useProjectWithActiveWorkfow from "@/app/lib/hooks/projects/useProjectWithActiveWorkflow";
import Card from "@/app/lib/components/data-display/card";
import Container from "@/app/lib/components/layout/container";
import Navbar from "@/app/lib/components/navigation/navbar";
import ProjectUpdateForm from "@/app/lib/components/forms/project-update-form";

const ProjectSettings: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project, isLoading } = useProjectWithActiveWorkfow(key);

  return (
    <>
      <Navbar project={project} showProjectLinks title={project?.name} />
      <Container width="w-2/6">
        <h1 className="text-4xl mb-10">Settings</h1>

        <ProjectUpdateForm project={project} />

        <h2 className="text-2xl mb-5">Project Termination</h2>
        <Card className="outline outline-1 outline-light_red">
          <div className="mb-5">
            <h3 className="font-semibold mb-3">Delete this project</h3>
            <p>
              Once you hit delete, your project will be gone forever, like a
              bug-free codebase in the wild. 🐞
            </p>
          </div>
          <div className="flex justify-end">
            <button className="w-32 p-2 rounded-md text-light_red bg-accent-dark-300">
              Delete
            </button>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default ProjectSettings;

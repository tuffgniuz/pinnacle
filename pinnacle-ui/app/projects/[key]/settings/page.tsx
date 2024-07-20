"use client";
import { NextPage } from "next";

import Card from "@/app/lib/components/data-display/card";
import Container from "@/app/lib/components/layout/container";
import Navbar from "@/app/lib/components/navigation/navbar";
import { useParams } from "next/navigation";
import useProjectWithActiveWorkfow from "@/app/lib/hooks/projects/useProjectWithActiveWorkflow";
import TextInput from "@/app/lib/components/data-input/text-input";
import Button from "@/app/lib/components/actions/button";
import TextArea from "@/app/lib/components/data-input/text-area";

const ProjectSettings: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project, isLoading } = useProjectWithActiveWorkfow(key);

  return (
    <>
      <Navbar project={project} showProjectLinks title={project?.name} />
      <Container width="w-2/6">
        <h1 className="text-4xl mb-10">Settings</h1>

        <h2 className="text-2xl mb-5">Project name</h2>
        <form action="" className="flex items-center gap-2 mb-10">
          <TextInput fullWidth padding="sm" value={project?.name} />
          <Button padding="sm" value="Rename" />
        </form>

        <h2 className="text-2xl mb-5">Project description</h2>
        <form action="" className="mb-10">
          <TextArea
            value={project?.description}
            placeholder="Your project description..."
            className="w-full mb-2"
          />
          <div className="flex justify-end">
            <Button padding="sm" value="Update" />
          </div>
        </form>

        <h2 className="text-2xl mb-5">Enable backlog</h2>
        <form className="mb-10"></form>

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

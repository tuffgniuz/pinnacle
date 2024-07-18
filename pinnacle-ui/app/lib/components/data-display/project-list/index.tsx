"use client";
import useProjects from "@/app/lib/hooks/projects/useProjects";
import { FC } from "react";

const ProjectList: FC = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  return projects ? (
    <div className="mt-10">
      <table className="w-full text-left">
        <thead className="bg-neutral-light dark:bg-background-dark transition-all duration-300 ease-in-out">
          <tr>
            <th className="p-4">Key</th>
            <th className="p-4">Name</th>
            <th className="p-4">Methodology</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="cursor-pointer">
              <td className="p-4">{project.name_key}</td>
              <td className="p-4">{project.name}</td>
              <td className="p-4">{project.methodology}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No projects</p>
  );
};

export default ProjectList;

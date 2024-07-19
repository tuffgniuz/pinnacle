"use client";
import useProjects from "@/app/lib/hooks/projects/useProjects";
import Link from "next/link";
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
            <th className="p-4 w-32">Key</th>
            <th className="p-4">Name</th>
            <th className="p-4">Methodology</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-b-neutral-light dark:border-b-background-dark transition-all duration-300 ease-in-out"
            >
              <td className="p-4 text-text-light-300">{project.name_key}</td>
              <td className="p-4 cursor-pointer">
                <Link href={`/projects/board/${project.name_key}`}>
                  {project.name}
                </Link>
              </td>
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

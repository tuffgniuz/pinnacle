"use client";
import { FC } from "react";
import useProjects from "@/app/lib/hooks/projects/useProjects";
import Link from "next/link";
import { LucideSettings } from "lucide-react";

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
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-b-neutral-light dark:border-b-background-dark transition-all duration-300 ease-in-out"
            >
              <td className="p-4 text-text-light-300">{project?.name_key}</td>
              <td className="p-4 cursor-pointer">
                <Link
                  href={`/projects/${project?.name_key}/board`}
                  className="hover:bg-neutral-light dark:hover:bg-neutral-light-100 -ml-2 rounded-md p-2 transition-all duration-300 ease-in-out"
                >
                  {project.name}
                </Link>
              </td>
              <td className="p-4 flex justify-end">
                <Link
                  href={`/projects/${project?.name_key}/settings`}
                  className="
                    hover:bg-neutral-light-700 dark:hover:bg-neutral-light-100 
                    transition-all duration-300 ease-in-out
                    p-2 -m-2 
                    rounded-full
                  "
                >
                  <LucideSettings size={18} />
                </Link>
              </td>
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

"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { LucideFrown } from "lucide-react";
import withAuth from "@/app/lib/hocs/withAuth";
import useProjectWithBoard from "@/app/lib/hooks/projects/useProjectWithBoard";
import Navbar from "@/app/lib/components/navigation/navbar";
import Link from "next/link";

const SecurityControls: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project } = useProjectWithBoard(key);

  const EmptySecurityControls = () => (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-medium mb-5 flex items-center gap-3">
        Wow! Such empty... <LucideFrown size={35} />
      </h1>
      <p className="dark:text-text-dark-700">
        Ready to boost your project's security?{" "}
        <Link
          href={`/projects/${project?.name_key}/security-controls/configure`}
          className="hover:text-sky_magenta hover:underline hover:underline-offset-1"
        >
          Set up the security checklist for{" "}
          <span className="font-medium">{project?.name}</span> here!
        </Link>{" "}
      </p>
    </div>
  );

  return (
    <>
      <Navbar project={project} showProjectLinks title={project?.name} />
      {project?.security_topics === undefined ? (
        <EmptySecurityControls />
      ) : (
        <p>Not empty</p>
      )}
    </>
  );
};

export default withAuth(SecurityControls);

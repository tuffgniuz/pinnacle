"use client";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import useProjectWithActiveWorkfow from "@/app/lib/hooks/projects/useProjectWithActiveWorkflow";
import withAuth from "@/app/lib/hocs/withAuth";
import Navbar from "@/app/lib/components/navigation/navbar";

const SecurityControls: NextPage = () => {
  const { key } = useParams<{ key: string }>();
  const { data: project } = useProjectWithActiveWorkfow(key);
  return (
    <>
      <Navbar project={project} showProjectLinks />
      <div className="mt-10 flex flex-col justify-center items-center">
        <p>You haven't configured a security checklist for your project.</p>
      </div>
    </>
  );
};

export default withAuth(SecurityControls);

"use client";
import { NextPage } from "next";
import Link from "next/link";
import { LucideRocket } from "lucide-react";

import Navbar from "../lib/components/navigation/navbar";

import withAuth from "../lib/hocs/withAuth";
import ProjectList from "../lib/components/data-display/project-list";

const Projects: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="px-5">
        <Link
          href="/projects/new"
          className="transition-all duration-300 ease-in-out inline-flex items-center gap-2 bg-accent-light-300 dark:bg-accent-dark-300 text-text-light-900 dark:text-accent-dark-900 p-4 rounded-lg"
        >
          <LucideRocket size={18} />
          Create project
        </Link>
      </div>
      <ProjectList />
    </>
  );
};

export default withAuth(Projects);

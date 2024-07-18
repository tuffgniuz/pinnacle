"use client";
import { NextPage } from "next";
import Container from "../lib/components/layout/container";
import Navbar from "../lib/components/navigation/navbar";
import withAuth from "../lib/hocs/withAuth";
import Link from "next/link";
import { LucideRocket } from "lucide-react";

const Projects: NextPage = () => {
  return (
    <>
      <Navbar />
      <Container className="px-5">
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 bg-accent-light-300 dark:bg-background-dark text-text-light-900 dark:text-accent-dark-900 p-4 rounded-lg"
        >
          <LucideRocket size={18} />
          Create project
        </Link>
      </Container>
    </>
  );
};

export default withAuth(Projects);

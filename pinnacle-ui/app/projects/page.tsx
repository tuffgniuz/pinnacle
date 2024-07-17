"use client";
import { NextPage } from "next";
import Container from "../lib/components/layout/container";
import Navbar from "../lib/components/navigation/navbar";
import withAuth from "../lib/hocs/withAuth";

const Projects: NextPage = () => {
  return (
    <>
      <Navbar />
      <Container className="px-5">
        <h1>Projects</h1>
      </Container>
    </>
  );
};

export default withAuth(Projects);

"use client";
import { NextPage } from "next";
import Navbar from "../lib/components/navigation/navbar";
import Container from "../lib/components/layout/container";
import withAuth from "../lib/hocs/withAuth";

const Me: NextPage = () => {
  return (
    <>
      <Navbar />
      <Container className="px-5">
        <h1>Me</h1>
      </Container>
    </>
  );
};

export default withAuth(Me);

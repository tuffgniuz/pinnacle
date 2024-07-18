"use client";
import { NextPage } from "next";
import FormPageHeader from "@/app/lib/components/navigation/form-page-header";
import Container from "@/app/lib/components/layout/container";
import ProjectCreateForm from "@/app/lib/components/forms/project-create-form";
import withAuth from "@/app/lib/hocs/withAuth";

const NewProject: NextPage = () => {
  return (
    <>
      <FormPageHeader title="New project" />
      <Container width="w-2/6">
        <ProjectCreateForm />
      </Container>
    </>
  );
};

export default withAuth(NewProject);

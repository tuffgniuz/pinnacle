import { NextPage } from "next";
import FormPageHeader from "@/app/lib/components/navigation/form-page-header";
import Container from "@/app/lib/components/layout/container";
import ProjectCreateForm from "@/app/lib/components/forms/project-create-form";

const NewProject: NextPage = () => {
  return (
    <>
      <FormPageHeader />
      <Container width="w-2/6">
        <ProjectCreateForm />
      </Container>
    </>
  );
};

export default NewProject;

"use client";
import { FC } from "react";

import FormGroup from "../form-group";
import Label from "../label";
import TextInput from "../../data-input/text-input";

import withAuth from "@/app/lib/hocs/withAuth";
import Button from "../../actions/button";

const ProjectCreateForm: FC = () => {
  return (
    <form action="">
      <FormGroup>
        <Label value="Project name" />
        <TextInput />
      </FormGroup>
      <Button value="Create project" fullWidth />
    </form>
  );
};

export default withAuth(ProjectCreateForm);

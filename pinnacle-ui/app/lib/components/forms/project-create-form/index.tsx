"use client";
import { FC } from "react";
import { LucideRocket } from "lucide-react";

import Button from "../../actions/button";
import FormGroup from "../form-group";
import Label from "../label";
import TextInput from "../../data-input/text-input";
import TextArea from "../../data-input/text-area";
import ProjectMethodologyRadioCard from "../../data-input/project-methodology-radio-card";

const ProjectCreateForm: FC = () => {
  return (
    <form action="">
      <FormGroup>
        <Label value="Project name" />
        <TextInput />
      </FormGroup>
      <FormGroup>
        <Label value="Description" />
        <TextArea />
      </FormGroup>
      <FormGroup>
        <Label value="Methodology" />
        <ProjectMethodologyRadioCard />
      </FormGroup>
      <Button
        type="submit"
        icon={<LucideRocket size={18} />}
        value="Create project"
        fullWidth
      />
    </form>
  );
};

export default ProjectCreateForm;

"use client";
import { FC } from "react";
import { LucideRocket } from "lucide-react";

import Button from "../../actions/button";
import FormGroup from "../form-group";
import Label from "../label";
import TextInput from "../../data-input/text-input";
import TextArea from "../../data-input/text-area";
import ProjectMethodologyRadioCard from "../../data-input/project-methodology-radio-card";
import useProjectCreate from "@/app/lib/hooks/projects/useProjectCreate";

const ProjectCreateForm: FC = () => {
  const {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    methodology,
    setMethodology,
    handleSubmit,
  } = useProjectCreate();

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label value="Project name" />
        <TextInput
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label value="Description" />
        <TextArea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label value="Methodology" />
        <ProjectMethodologyRadioCard
          value={methodology}
          onChange={setMethodology}
        />
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

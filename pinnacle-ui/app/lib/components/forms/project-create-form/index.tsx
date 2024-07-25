"use client";
import { FC } from "react";
import { LucideRocket } from "lucide-react";
import useProjectCreate from "@/app/lib/hooks/projects/useProjectCreate";
import Button from "../../actions/button";
import FormGroup from "../form-group";
import Label from "../label";
import TextInput from "../../data-input/text-input";
import TextArea from "../../data-input/text-area";
import Toggle from "../../data-input/toggle";

const ProjectCreateForm: FC = () => {
  const {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    hasBacklog,
    setHasBacklog,
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
        <Label value="Enable backlog" />
        <div className="flex justify-start">
          <Toggle
            checked={hasBacklog}
            onChange={(e) => setHasBacklog(e.target.checked)}
          />
        </div>
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

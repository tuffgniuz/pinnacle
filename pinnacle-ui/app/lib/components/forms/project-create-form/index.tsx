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
    hasProjectDefaults,
    setHasProjectDefaults,
    handleSubmit,
  } = useProjectCreate();

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label value="Project name" />
        <TextInput
          autoFocus
          placeholder="Your project name..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label value="Description (optional)" />
        <TextArea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label value="Enable project backlog (dedicated backlog page)" />
        <div className="flex justify-start">
          <Toggle
            id="has-backlog"
            checked={hasBacklog}
            onChange={(e) => setHasBacklog(e.target.checked)}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <Label value="Default project workflow and states" />
        <p className="text-text-light-300 text-sm">
          Creates a default workflow with states such as "To Do", "In Progress",
          "In Review", and done "Done" for your board to get.
        </p>
        <Toggle
          id="project-defaults"
          checked={hasProjectDefaults}
          onChange={(e) => setHasProjectDefaults(e.target.checked)}
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

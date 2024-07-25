import { FC } from "react";
import { Project } from "@/app/lib/types/models";
import Button from "../../actions/button";
import TextArea from "../../data-input/text-area";
import TextInput from "../../data-input/text-input";
import Toggle from "../../data-input/toggle";
import useProjectUpdate from "@/app/lib/hooks/projects/useProjectUpdate";

const ProjectUpdateForm: FC<{ project: Project }> = ({ project }) => {
  const {
    errorMsg,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    hasBacklog,
    setHasBacklog,
    handleSubmit,
  } = useProjectUpdate(project);

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <h2 className="text-xl dark:text-text-dark-700 mb-5">Project name</h2>
      <div className="flex items-center gap-2 mb-10">
        <TextInput
          fullWidth
          padding="sm"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <h2 className="text-xl dark:text-text-dark-700 mb-5">
        Project description
      </h2>
      <div className="mb-10">
        <TextArea
          placeholder="Your project description..."
          className="w-full mb-2"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>

      <h2 className="text-xl dark:text-text-dark-700 mb-5">Enable backlog</h2>
      <div className="flex justify-start mb-5">
        <Toggle
          checked={hasBacklog}
          onChange={(e) => setHasBacklog(e.target.checked)}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" padding="sm" value="Update" />
      </div>
    </form>
  );
};

export default ProjectUpdateForm;

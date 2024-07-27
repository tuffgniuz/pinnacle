import { FC, FormEvent, useEffect } from "react";
import { LucidePlus } from "lucide-react";
import { Project, State } from "@/app/lib/types/models";
import useToggleElement from "@/app/lib/hooks/useToggleElement";
import useIssueCreate from "@/app/lib/hooks/projects/useIssueCreate";
import TextInput from "../../data-input/text-input";
import Button from "../../actions/button";

const IssueCreateForm: FC<{
  project: Project | undefined;
  state: State | undefined;
}> = ({ project, state }) => {
  const {
    title,
    setTitle,
    setProjectId,
    setStateId,
    setWorkflowId,
    handleMutation,
  } = useIssueCreate();
  const { isVisible, setIsVisible, ref, handleBlur } =
    useToggleElement<HTMLInputElement>();

  useEffect(() => {
    setProjectId(project?.id);
    setStateId(state?.id);
    setWorkflowId(project?.workflows[0].id);
  }, [project, state]);

  const handleSubmit = (e: FormEvent) => {
    handleMutation(e);
    setIsVisible(false);
    setTitle(undefined);
  };

  return isVisible ? (
    <form onSubmit={handleSubmit} className="mb-10">
      <TextInput
        ref={ref}
        placeholder="What do I need to work on..."
        fullWidth
        autoFocus
        style={{ outlineWidth: 1, outlineColor: state?.color }}
        padding="sm"
        onBlur={handleBlur}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  ) : (
    <Button
      icon={<LucidePlus />}
      onClick={() => setIsVisible(true)}
      padding="sm"
      className="mb-10"
    />
  );
};

export default IssueCreateForm;

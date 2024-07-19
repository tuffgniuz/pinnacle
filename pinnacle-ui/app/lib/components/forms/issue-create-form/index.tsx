import { FC, FormEvent } from "react";
import { LucidePlus } from "lucide-react";
import { Project } from "@/app/lib/types/models";
import TextInput from "../../data-input/text-input";
import Button from "../../actions/button";
import useToggleElement from "@/app/lib/hooks/useToggleElement";
import useIssueCreate from "@/app/lib/hooks/projects/useIssueCreate";

const IssueCreateForm: FC<{ project: Project; stateId?: string }> = ({
  project,
  stateId,
}) => {
  const { title, setTitle, mutation } = useIssueCreate(
    project.id,
    project.workflows[0].id,
    stateId,
  );
  const { isVisible, setIsVisible, ref, handleBlur } =
    useToggleElement<HTMLInputElement>();

  const handleButtonClick = () => {
    setIsVisible(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
    setIsVisible(false);
  };

  return isVisible ? (
    <form onSubmit={handleSubmit} className="mb-10">
      <TextInput
        ref={ref}
        placeholder="What do I need to work on..."
        fullWidth
        autoFocus
        padding="sm"
        onBlur={handleBlur}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  ) : (
    <Button
      icon={<LucidePlus />}
      onClick={handleButtonClick}
      padding="sm"
      className="mb-10"
    />
  );
};

export default IssueCreateForm;

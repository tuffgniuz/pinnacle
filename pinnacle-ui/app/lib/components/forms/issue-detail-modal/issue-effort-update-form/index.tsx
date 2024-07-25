import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import TextInput from "../../../data-input/text-input";
import useToggleElement from "@/app/lib/hooks/useToggleElement";
import useIssueUpdate from "@/app/lib/hooks/projects/useIssueUpdate";
import { Issue } from "@/app/lib/types/models";

const IssueEffortUpdateForm: FC<{ issue: Issue | undefined }> = ({ issue }) => {
  const [effort, setEffort] = useState<number | undefined>(
    issue?.effort || undefined,
  );
  const { isVisible, setIsVisible, ref, handleBlur } =
    useToggleElement<HTMLFormElement>();
  const { mutation } = useIssueUpdate(issue?.id);

  useEffect(() => {
    setEffort(issue?.effort || undefined);
  }, [issue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ effort });
  };

  const handleEffortChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEffort(value ? parseInt(value, 10) : undefined);
  };

  return isVisible ? (
    <form ref={ref} onBlur={handleBlur} onSubmit={handleSubmit}>
      <TextInput
        autoFocus
        fullWidth
        type="number"
        outlineNone
        padding="none"
        value={effort}
        onChange={handleEffortChange}
      />
    </form>
  ) : (
    <p onClick={() => setIsVisible(true)}>{effort} pt</p>
  );
};

export default IssueEffortUpdateForm;

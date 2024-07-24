"use client";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Issue } from "@/app/lib/types/models";
import useToggleElement from "@/app/lib/hooks/useToggleElement";
import useIssueUpdate from "@/app/lib/hooks/projects/useIssueUpdate";
import TextInput from "../../../data-input/text-input";

/**
 * TODO: Fix slight pixel movement when toggling on/off the form with textinput
 */

const IssueTitleUpdateForm: FC<{
  projectId: string | undefined;
  issue: Issue | undefined;
  className?: string | undefined;
}> = ({ projectId, issue, className }) => {
  const [title, setTitle] = useState<string | undefined>(
    issue?.title || undefined,
  );
  const { mutation } = useIssueUpdate(issue?.id);
  const { isVisible, setIsVisible, ref, handleBlur } =
    useToggleElement<HTMLInputElement>();

  const handleShowFormOnClick = () => {
    setIsVisible(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ project_id: projectId, title });
  };

  useEffect(() => {
    setTitle(issue?.title || undefined);
  }, [issue]);

  return (
    <div className={className}>
      {isVisible ? (
        <form onSubmit={handleSubmit} className="outline-none border-none">
          <TextInput
            fullWidth
            outlineNone
            autoFocus
            padding="sm"
            className="text-4xl -m-2"
            placeholder="Issue title..."
            value={title}
            ref={ref}
            onBlur={handleBlur}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </form>
      ) : (
        <h1
          onClick={handleShowFormOnClick}
          className="
          outline-none
          border-none
          cursor-pointer 
          hover:bg-neutral-light 
          dark:hover:bg-neutral-light-100 
          text-4xl 
          -m-2 p-2 
          rounded-lg 
          w-full
          transition-all duration-300 ease-in-out
        "
        >
          {title} <span className="text-text-dark-700">{issue?.issue_key}</span>
        </h1>
      )}
    </div>
  );
};

export default IssueTitleUpdateForm;

import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../stores/store";
import { createIssue } from "../../actions";
import { IssueCreateRequest } from "../../types/requests";

const useIssueCreate = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [workflowId, setWorkflowId] = useState<string | undefined>(undefined);
  const [stateId, setStateId] = useState<string | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: async (requestBody: IssueCreateRequest) => {
      return await createIssue(token, requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
  });

  const handleMutation = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title: title,
      project_id: projectId,
      workflow_id: workflowId,
      state_id: stateId,
    });
  };

  return {
    title,
    setTitle,
    projectId,
    setProjectId,
    workflowId,
    setWorkflowId,
    stateId,
    setStateId,
    mutation,
    handleMutation,
  };
};

export default useIssueCreate;

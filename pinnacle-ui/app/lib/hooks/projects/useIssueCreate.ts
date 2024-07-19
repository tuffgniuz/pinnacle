import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIssue } from "../../actions";
import { FormEvent, useState } from "react";

const useIssueCreate = (
  projectId: string,
  workflowId: string,
  stateId: string,
) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: async () => {
      return await createIssue(token, title, projectId, workflowId, stateId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
  });

  return { title, setTitle, mutation };
};

export default useIssueCreate;

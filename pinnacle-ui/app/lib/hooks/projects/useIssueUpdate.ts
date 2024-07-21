import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { updateIssue } from "../../actions";
import { IssuePriority } from "../../types/enums";
import { useState } from "react";

const useIssueUpdate = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [error, setError] = useState<Error | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: async (
      data: Partial<{
        project_id: string;
        title: string;
        workflow_id: string;
        state_id: string;
        description: string;
        effort: number;
        priority: IssuePriority;
        ready_for_development: boolean;
      }>,
    ) => {
      return await updateIssue(token, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issue", id] });
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
    onError: (error) => {
      console.error("Failed to update issue:", error);
      setError(error);
      throw error;
    },
  });

  return { mutation, error };
};

export default useIssueUpdate;

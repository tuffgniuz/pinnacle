import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { updateIssue } from "../../actions";
import { Label, User } from "../../types/models";
import { IssuePriority } from "../../types/enums";

interface IssueUpdateParams {
  id: string;
  title?: string;
  workflowId?: string;
  stateId?: string;
  description?: string;
  effort?: number;
  priority?: IssuePriority;
  readyForDevelopment?: boolean;
  labels?: Label[];
  assignees?: { id: string }[];
}

const useIssueUpdate = (id: string) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);

  const mutation = useMutation({
    mutationFn: async (updateData: any) => {
      return await updateIssue(token, id, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
    onError: (error) => {
      console.error("Failed to update issue:", error);
      throw error;
    },
  });

  return { mutation };
};

export default useIssueUpdate;

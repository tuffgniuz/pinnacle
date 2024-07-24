import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { addAssigneeToIssue } from "../../actions";

const useAddAssignee = (issueId: string | undefined) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const mutation = useMutation({
    mutationFn: async (userId: string) => {
      console.log(issueId);
      return await addAssigneeToIssue(token, userId, issueId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
    },
  });

  return { mutation };
};

export default useAddAssignee;

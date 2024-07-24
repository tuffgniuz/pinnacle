import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLabelToIssue } from "../../actions";

const useAddLabelToIssue = (
  labelId: string | undefined,
  issueId: string | undefined,
) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);

  const mutation = useMutation({
    mutationFn: async () => {
      return await addLabelToIssue(token, labelId, issueId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
    },
  });

  return { mutation };
};

export default useAddLabelToIssue;

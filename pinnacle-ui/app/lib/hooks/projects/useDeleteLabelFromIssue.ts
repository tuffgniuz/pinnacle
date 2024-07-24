import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../stores/store";
import { deleteLabelFromIssue } from "../../actions";
import { IssueLabelRemovalRequest } from "../../types/requests";

const useDeleteLabelFromIssue = (issueId: string | undefined) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);

  const mutation = useMutation({
    mutationFn: async (requestBody: IssueLabelRemovalRequest) => {
      return await deleteLabelFromIssue(token, issueId, requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
    },
  });

  return { mutation };
};

export default useDeleteLabelFromIssue;

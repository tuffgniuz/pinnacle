import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteIssue } from "../../actions";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

const useIssueDelete = (issueId: string | undefined) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [errorMsg, setErrorMsg] = useState<Error | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      return await deleteIssue(token, issueId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
      queryClient.invalidateQueries({ queryKey: ["issue", issueId] });
    },
    onError: (error) => {
      setErrorMsg(error);
      throw error;
    },
  });

  return { mutation, errorMsg };
};

export default useIssueDelete;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { updateIssue } from "../../actions";
import { useState } from "react";
import { PartialIssueUpdate } from "../../types/requests";

const useIssueUpdate = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [error, setError] = useState<Error | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: async (data: PartialIssueUpdate) => {
      return await updateIssue(token, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
      queryClient.invalidateQueries({ queryKey: ["issue", id] });
      // queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error) => {
      setError(error);
      throw error;
    },
  });

  return { mutation, error };
};

export default useIssueUpdate;

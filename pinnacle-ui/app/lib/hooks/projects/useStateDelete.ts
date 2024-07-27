import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../stores/store";
import { deleteState } from "../../actions";

const useStateDelete = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [errorMsg, setErrorMsg] = useState<Error | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: async () => {
      return await deleteState(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
    onError: (error) => {
      setErrorMsg(error);
      throw error;
    },
  });

  return { mutation, errorMsg };
};

export default useStateDelete;

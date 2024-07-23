import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../stores/store";
import { updateState } from "../../actions";

const useStateUpdate = (id: string) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [error, setError] = useState<Error | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: async (
      data: Partial<{
        name: string;
        description: string;
        limit: number;
        color_id: string;
      }>,
    ) => {
      return await updateState(token, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error) => {
      setError(error);
      throw error;
    },
  });

  return { mutation, error };
};

export default useStateUpdate;

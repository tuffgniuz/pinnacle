import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../stores/store";
import { createState } from "../../actions";

const useStateCreate = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [error, setError] = useState<Error | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: async (
      createData: Partial<{
        name: string;
        description: string;
        limit: number;
        color_id: string;
        workflow_id: string;
        is_final_state: boolean;
      }>,
    ) => {
      return await createState(token, createData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
    onError: (error) => {
      setError(error);
      throw error;
    },
  });

  return { mutation, error };
};

export default useStateCreate;

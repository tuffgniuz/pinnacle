import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useQuery } from "@tanstack/react-query";
import { State } from "../../types/models";
import { getStatesForWorkflow } from "../../actions";

const useStatesForWorkflow = (workflowId: string) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<State[] | Error>({
    queryKey: ["states"],
    queryFn: async () => {
      return await getStatesForWorkflow(token, workflowId);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useStatesForWorkflow;

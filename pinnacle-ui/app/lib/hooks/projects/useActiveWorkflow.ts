import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useQuery } from "@tanstack/react-query";

import { getActiveWorkflow } from "../../actions";
import { Project } from "../../types/models";

const useActiveWorkfow = (projectNameKey: string) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<Project, Error>({
    queryKey: ["workflow"],
    queryFn: async () => {
      return await getActiveWorkflow(token, projectNameKey);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useActiveWorkfow;

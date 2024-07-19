import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useQuery } from "@tanstack/react-query";

import { getProjectWithActiveWorkflow } from "../../actions";
import { Project } from "../../types/models";

const useProjectWithActiveWorkfow = (projectNameKey: string) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<Project, Error>({
    queryKey: ["workflow"],
    queryFn: async () => {
      return await getProjectWithActiveWorkflow(token, projectNameKey);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useProjectWithActiveWorkfow;

import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useQuery } from "@tanstack/react-query";
import { Project } from "../../types/models";
import { getProjectByNameKey } from "../../actions";

const useProjectDetail = (nameKey: string) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<Project, Error>({
    queryKey: ["project", nameKey],
    queryFn: async () => {
      return await getProjectByNameKey(token, nameKey);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useProjectDetail;

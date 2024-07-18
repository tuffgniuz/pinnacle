import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useQuery } from "@tanstack/react-query";
import { Project } from "../../types/models";
import { getProjects } from "../../actions";

const useProjects = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: async () => {
      return await getProjects(token);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useProjects;

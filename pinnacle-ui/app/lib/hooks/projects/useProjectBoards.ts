import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "../../stores/store";
import { getProjectBoards } from "../../services/board";
import { Board } from "../../types/models";

const useProjectBoards = (projectId: string | undefined) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<Board[], Error>({
    queryKey: ["boards", projectId],
    queryFn: async () => {
      return await getProjectBoards(token, projectId);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useProjectBoards;

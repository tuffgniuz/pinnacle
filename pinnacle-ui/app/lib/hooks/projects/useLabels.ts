import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Label } from "../../types/models";
import { getLabels } from "../../actions";
import { RootState } from "../../stores/store";

const useLabels = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError } = useQuery<Label[], Error>({
    queryKey: ["labels"],
    queryFn: async () => {
      return await getLabels(token);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError };
};

export default useLabels;

import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useQuery } from "@tanstack/react-query";
import { Color } from "../../types/models";
import { getColors } from "../../actions";

const useColors = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<Color[], Error>({
    queryKey: ["colors"],
    queryFn: async () => {
      return await getColors(token);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useColors;

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../actions";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { User } from "../types/models";

const useCurrentUser = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<User, Error>({
    queryKey: ["currentUser", token],
    queryFn: async () => {
      if (!token) throw new Error("No token found");
      return await getCurrentUser(token);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useCurrentUser;

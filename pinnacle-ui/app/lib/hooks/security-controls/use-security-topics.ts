import { useQuery } from "@tanstack/react-query";
import { SecurityTopic } from "../../types/models";
import { getSecurityTopics } from "../../services/asvs";
import useToken from "../auth/useToken";

const useSecurityTopics = () => {
  const { token } = useToken();

  const { data, isLoading, isError, error } = useQuery<SecurityTopic[], Error>({
    queryKey: ["security-topics"],
    queryFn: async () => {
      return await getSecurityTopics(token);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useSecurityTopics;

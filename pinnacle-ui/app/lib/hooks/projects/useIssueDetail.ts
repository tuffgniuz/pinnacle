import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "../../types/models";
import { getIssue } from "../../actions";

const useIssueDetail = (id: string | undefined) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isLoading, isError, error } = useQuery<Issue, Error>({
    queryKey: ["issue", id],
    queryFn: async () => {
      return await getIssue(token, id);
    },
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
};

export default useIssueDetail;

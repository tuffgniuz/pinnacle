import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "../../types/models";
import useToken from "../auth/useToken";
import { deleteProject } from "../../services/project";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useProjectDelete = (project: Project) => {
  const { token } = useToken();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<Error | string | undefined>(
    undefined,
  );

  const mutation = useMutation({
    mutationFn: async () => {
      return await deleteProject(token, project.id);
    },
    onSuccess: () => {
      router.push("/projects");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Project delete mutation error:", error);
      setErrorMsg(error);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return { handleDelete, errorMsg };
};

export default useProjectDelete;

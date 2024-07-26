import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectCreateRequest } from "../../types/requests";
import { createProject } from "../../services/project";
import useToken from "../auth/useToken";

const useProjectCreate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [hasBacklog, setHasBacklog] = useState<boolean>(false);
  const [hasProjectDefaults, setHasProjectDefaults] = useState<boolean>(false);
  const { token } = useToken();

  const mutation = useMutation({
    mutationFn: async (requestBody: ProjectCreateRequest) => {
      return await createProject(token, requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/projects");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: projectName,
      has_backlog: hasBacklog,
      description: projectDescription,
      enable_default_workflow_and_states: hasProjectDefaults,
    });
  };

  return {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    hasBacklog,
    setHasBacklog,
    hasProjectDefaults,
    setHasProjectDefaults,
    handleSubmit,
  };
};

export default useProjectCreate;

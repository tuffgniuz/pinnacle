import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { Project } from "../../types/models";
import { ProjectPartialUpdateRequest } from "../../types/requests";
import { updateProject } from "../../services/project";
import useToken from "../auth/useToken";

const useProjectUpdate = (project: Project) => {
  const { token } = useToken();
  const queryClient = useQueryClient();
  const [projectName, setProjectName] = useState<string | undefined>(
    project.name || undefined,
  );
  const [projectDescription, setProjectDescription] = useState<
    string | undefined
  >(project.description || undefined);
  const [hasBacklog, setHasBacklog] = useState<boolean>(project.has_backlog);
  const [errorMsg, setErrorMsg] = useState<Error | string | undefined>(
    undefined,
  );

  useEffect(() => {
    setProjectName(project?.name || undefined);
    setProjectDescription(project?.description || undefined);
    setHasBacklog(project.has_backlog);
  }, [project]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: projectName,
      description: projectDescription,
      has_backlog: hasBacklog,
    });
  };

  const mutation = useMutation({
    mutationFn: async (requestBody: ProjectPartialUpdateRequest) => {
      return await updateProject(token, project.id, requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", project.name_key],
      });
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
    },
    onError: (error) => {
      setErrorMsg(error);
    },
  });

  return {
    errorMsg,
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    hasBacklog,
    setHasBacklog,
    handleSubmit,
  };
};

export default useProjectUpdate;

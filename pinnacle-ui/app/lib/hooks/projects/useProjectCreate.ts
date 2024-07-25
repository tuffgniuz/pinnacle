import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../actions";
import { RootState } from "../../stores/store";
import { ProjectCreateRequest } from "../../types/requests";

const useProjectCreate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [hasBacklog, setHasBacklog] = useState<boolean>(false);

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
    console.log(e);
    mutation.mutate({
      name: projectName,
      has_backlog: hasBacklog,
      description: projectDescription,
    });
  };

  return {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    hasBacklog,
    setHasBacklog,
    handleSubmit,
  };
};

export default useProjectCreate;

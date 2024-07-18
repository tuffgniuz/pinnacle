import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { createProject } from "../../actions";
import { RootState } from "../../stores/store";
import { ProjectMethodology } from "../../types/enums";

const useProjectCreate = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [methodology, setMethodology] = useState<ProjectMethodology>(
    ProjectMethodology.KANBAN,
  );

  const mutation = useMutation({
    mutationFn: async () => {
      return await createProject(
        token,
        projectName,
        methodology,
        projectDescription,
      );
    },
    onSuccess: () => {
      router.push("/projects");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    methodology,
    setMethodology,
    handleSubmit,
  };
};

export default useProjectCreate;

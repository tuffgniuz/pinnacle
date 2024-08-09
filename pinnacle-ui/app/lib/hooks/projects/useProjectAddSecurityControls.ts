import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectAddSecurityControlsRequest } from "../../types/requests";
import { RootState } from "../../stores/store";
import { addProjectSecurityControls } from "../../services/project";
import { Project, SecuritySection, SecurityTopic } from "../../types/models";

const useProjectAddSecurityControls = (project: Project | undefined) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.token);
  const [errorMsg, setErrorMsg] = useState<Error | string | undefined>(
    undefined,
  );
  const [topics, setTopics] = useState<SecurityTopic[]>([]);
  const [sections, setSections] = useState<SecuritySection[] | undefined>(
    undefined,
  );

  const mutation = useMutation({
    mutationFn: async (requestBody: ProjectAddSecurityControlsRequest) => {
      return await addProjectSecurityControls(token, project?.id, requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow"] });
      router.push(`/projects/${project?.name_key}/security-controls`);
    },
    onError: (error) => {
      setErrorMsg(error);
    },
  });

  const handleMutation = () => {
    mutation.mutate({ security_topics: topics, security_sections: sections });
  };

  return { topics, setTopics, sections, setSections, errorMsg, handleMutation };
};

export default useProjectAddSecurityControls;
